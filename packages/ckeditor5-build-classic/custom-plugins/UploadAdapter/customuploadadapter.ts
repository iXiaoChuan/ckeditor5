/**
 * @license Copyright (c) 2003-2023, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

import { Plugin } from '@ckeditor/ckeditor5-core';
import { type FileLoader, FileRepository, type UploadAdapter, type UploadResponse } from '@ckeditor/ckeditor5-upload';

interface SimpleUploadConfig {
	uploadUrl: string;
	baseOrigin?: string;
	body?: Record<string, any>;
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
			console.warn( '=====ZJC=====上传url缺失.' );
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
		const options = this.options;
		const genericErrorText = `上传图片失败: ${ file.name }.`;

		xhr.addEventListener( 'error', () => reject( genericErrorText ) );
		xhr.addEventListener( 'abort', () => reject() );
		xhr.addEventListener( 'load', () => {
			const response = xhr.response;

			if ( !response || response?.return_code !== 0 ) {
				return reject( response && response.return_message ? response.error.message : genericErrorText );
			}

			const urls = {
				default: `${ options.baseOrigin }${ response.data.downloadPath }`
			};

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
		// Headers
		const headers = this.options.headers || {};
		for ( const headerName of Object.keys( headers ) ) {
			this.xhr!.setRequestHeader( headerName, headers[ headerName ] );
		}

		this.xhr!.withCredentials = this.options.withCredentials || false;

		// Bodys
		const data = new FormData();
		data.append( 'file', file );

		const body = this.options.body || {};
		for ( const bodyParameter of Object.keys( body ) ) {
			data.append( bodyParameter, body[ bodyParameter ] );
		}

		this.xhr!.send( data );
	}
}
