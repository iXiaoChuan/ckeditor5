/**
 * @license Copyright (c) 2003-2023, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

import { Plugin } from '@ckeditor/ckeditor5-core';
import { FileRepository, type UploadResponse, type FileLoader, type UploadAdapter } from '@ckeditor/ckeditor5-upload';
import { logWarning } from '@ckeditor/ckeditor5-utils';

interface SimpleUploadConfig {
	uploadUrl: string;
	headers?: Record<string, string>;
	withCredentials?: boolean;
}

export default class SimpleUploadAdapter extends Plugin {
	public static get requires() {
		return [ FileRepository ] as const;
	}

	public static get pluginName() {
		return 'SimpleUploadAdapter' as const;
	}

	public init(): void {
		const options = this.editor.config.get( 'simpleUpload' );

		if ( !options ) {
			return;
		}

		if ( !options.uploadUrl ) {
			logWarning( 'simple-upload-adapter-missing-uploadurl' );
			return;
		}

		this.editor.plugins.get( FileRepository ).createUploadAdapter = loader => {
			return new Adapter( loader, options );
		};
	}
}

class Adapter implements UploadAdapter {
	public loader: FileLoader;
	public options: SimpleUploadConfig;
	private xhr?: XMLHttpRequest;

	constructor( loader: FileLoader, options: SimpleUploadConfig ) {
		this.loader = loader;
		this.options = options;
	}

	public upload(): Promise<UploadResponse> {
		return this.loader.file
			.then( file => new Promise( ( resolve, reject ) => {
				this._initRequest();
				this._initListeners( resolve, reject, file! );
				this._sendRequest( file! );
			} ) );
	}

	public abort(): void {
		if ( this.xhr ) {
			this.xhr.abort();
		}
	}

	private _initRequest(): void {
		const xhr = this.xhr = new XMLHttpRequest();

		xhr.open( 'POST', this.options.uploadUrl, true );
		xhr.responseType = 'json';
	}

	private _initListeners(
		resolve: ( result: UploadResponse ) => void,
		reject: ( message?: string ) => void,
		file: File
	): void {
		const xhr = this.xhr!;
		const loader = this.loader;
		const genericErrorText = `Couldn't upload file: ${ file.name }.`;

		xhr.addEventListener( 'error', () => reject( genericErrorText ) );
		xhr.addEventListener( 'abort', () => reject() );
		xhr.addEventListener( 'load', () => {
			const response = xhr.response;

			if ( !response || response.error ) {
				return reject( response && response.error && response.error.message ? response.error.message : genericErrorText );
			}

			console.log( '=====ZJC=====response:', response );

			const urls = response.success ? { default: response.data.url } : { default: response.images };

			// Resolve with the normalized `urls` property and pass the rest of the response
			// to allow customizing the behavior of features relying on the upload adapters.
			resolve( {
				...response,
				urls
			} );
		} );

		if ( xhr.upload ) {
			xhr.upload.addEventListener( 'progress', evt => {
				if ( evt.lengthComputable ) {
					loader.uploadTotal = evt.total;
					loader.uploaded = evt.loaded;
				}
			} );
		}
	}

	private _sendRequest( file: File ): void {
		// Set headers if specified.
		const headers = this.options.headers || {};

		// Use the withCredentials flag if specified.
		const withCredentials = this.options.withCredentials || false;

		for ( const headerName of Object.keys( headers ) ) {
			this.xhr!.setRequestHeader( headerName, headers[ headerName ] );
		}

		this.xhr!.withCredentials = withCredentials;

		// Prepare the form data.
		const data = new FormData();

		// ZJC_2023/11/30: 修改上传参数相关,适配上传接口
		data.append( 'smfile', file );
		data.append( 'format', 'json' );

		// Send the request.
		this.xhr!.send( data );
	}
}
