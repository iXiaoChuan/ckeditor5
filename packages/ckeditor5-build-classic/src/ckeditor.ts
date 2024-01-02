/**
 * @license Copyright (c) 2003-2023, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

// The editor creator to use.
import { ClassicEditor as ClassicEditorBase } from '@ckeditor/ckeditor5-editor-classic';
import { BalloonEditor as BalloonEditorBase } from '@ckeditor/ckeditor5-editor-balloon';

import { MediaEmbed } from '@ckeditor/ckeditor5-media-embed';
import { Essentials } from '@ckeditor/ckeditor5-essentials';
import { Autoformat } from '@ckeditor/ckeditor5-autoformat';
import {
	Bold,
	Italic
	// Strikethrough,
	// Underline,
} from '@ckeditor/ckeditor5-basic-styles';
import { Heading } from '@ckeditor/ckeditor5-heading';
import {
	AutoImage,
	Image,
	// ImageInsert,
	ImageResize,
	ImageStyle,
	ImageToolbar,
	ImageUpload
} from '@ckeditor/ckeditor5-image';
import { Indent, IndentBlock } from '@ckeditor/ckeditor5-indent';
import { Link } from '@ckeditor/ckeditor5-link';
import { List, TodoList } from '@ckeditor/ckeditor5-list';
import { Paragraph } from '@ckeditor/ckeditor5-paragraph';
import { TextTransformation } from '@ckeditor/ckeditor5-typing';
import { Alignment } from '@ckeditor/ckeditor5-alignment';
import {
	FontBackgroundColor,
	FontColor
	// FontSize
} from '@ckeditor/ckeditor5-font';
import { Highlight } from '@ckeditor/ckeditor5-highlight';
import { HorizontalLine } from '@ckeditor/ckeditor5-horizontal-line';
// import { SimpleUploadAdapter } from '@ckeditor/ckeditor5-upload';
import CustomUploadAdapter from '../custom-plugins/UploadAdapter/customuploadadapter';

const API_KEY = 'bb815c85c4fd535a377a15';
const IFRAME_SRC = '//cdn.iframe.ly/api/iframe';

// General plug-ins
const plugins = [
	Alignment,
	AutoImage,
	Autoformat,
	Bold,
	Essentials,
	FontBackgroundColor,
	FontColor,
	// FontSize,
	Heading,
	Highlight,
	HorizontalLine,
	Image,
	// ImageInsert,
	ImageResize,
	ImageStyle,
	ImageToolbar,
	ImageUpload,
	Indent,
	IndentBlock,
	Italic,
	Link,
	List,
	Paragraph,
	// Strikethrough,
	TextTransformation,
	TodoList,
	// Underline,
	// SimpleUploadAdapter,
	CustomUploadAdapter,
	MediaEmbed
];

// General configuration
const configs = {
	language: 'en',
	toolbar: {
		items: [
			'undo', // **撤销
			'redo', // **重做
			'|',
			'heading', // **标题
			'bold', // **加粗
			'italic', // **斜体
			// 'strikethrough', // **删除线
			// 'underline', // **下划线
			'fontColor', // **字体颜色
			'fontBackgroundColor', // **字体背景颜色
			// 'fontSize', // **字体大小
			// 'highlight', // **高亮
			'|',
			'alignment', //* *对齐方式
			'bulletedList', // **无序列表
			'numberedList', // **有序列表
			// 'outdent', // **减少缩进
			// 'indent', // **增加缩进
			'link', // 插入链接
			// 'insertImage', // 插入图片
			'uploadImage' // 上传图片
			// {
			// 	label: 'More basic styles',
			// 	icon: 'threeVerticalDots',
			// 	items: [
			// 		'imageInsert', // 插入图片
			// 		'link' // 插入链接
			// 	]
			// }
		],
		shouldNotGroupWhenFull: true
	},
	image: {
		inset: {
			integrations: [
				// 'insertImageViaUrl', // **使用链接插入图片
				'upload' // **上传图片
			]
		},
		toolbar: [
			'imageStyle:inline', // **图片选中样式  inline
			'imageStyle:block', // **图片选中样式  block
			'imageStyle:side' // **图片选中样式 side
		],
		upload: {
			types: [ 'jpg', 'jpeg', 'png', 'gif' ] // **默认支持 'jpeg', 'png', 'gif', 'bmp', 'webp', 'tiff' 需要后端支持新增的支持类型
		}
	},
	fontColor: {
		colors: [
			{
				color: '#2E2E2E',
				label: '#2E2E2E'
			},
			{
				color: '#454545',
				label: '#454545'
			},
			{
				color: '#7E7F80',
				label: '#7E7F80'
			},
			{
				color: '#B3B3B3',
				label: '#B3B3B3'
			},
			{
				color: '#FFFFFF',
				label: '#FFFFFF',
				hasBorder: true
			},
			{
				color: '#FC554F',
				label: '#FC554F'
			},
			{
				color: '#F9597C',
				label: '#F9597C'
			},
			{
				color: '#FFA31D',
				label: '#FFA31D'
			},
			{
				color: '#FFD762',
				label: '#FFD762'
			},
			{
				color: '#48F0BB',
				label: '#48F0BB'
			},
			{
				color: '#34CFDA',
				label: '#34CFDA'
			},
			{
				color: '#3583EF',
				label: '#3583EF'
			},
			{
				color: '#8034FA',
				label: '#8034FA'
			},
			{
				color: '#B54DE6',
				label: '#B54DE6'
			},
			{
				color: '#FA67D1',
				label: '#FA67D1'
			}
		],
		columns: 5,
		documentColors: 0
	},
	fontBackgroundColor: {
		colors: [
			{
				color: '#2E2E2E',
				label: '#2E2E2E'
			},
			{
				color: '#454545',
				label: '#454545'
			},
			{
				color: '#7E7F80',
				label: '#7E7F80'
			},
			{
				color: '#B3B3B3',
				label: '#B3B3B3'
			},
			{
				color: '#FFFFFF',
				label: '#FFFFFF',
				hasBorder: true
			},
			{
				color: '#FC8F8B',
				label: '#FC8F8B'
			},
			{
				color: '#F995AB',
				label: '#F995AB'
			},
			{
				color: '#FFCC82',
				label: '#FFCC82'
			},
			{
				color: '#FFDF83',
				label: '#FFDF83'
			},
			{
				color: '#90F0D2',
				label: '#90F0D2'
			},
			{
				color: '#78D3DA',
				label: '#78D3DA'
			},
			{
				color: '#83B1EF',
				label: '#83B1EF'
			},
			{
				color: '#B589FA',
				label: '#B589FA'
			},
			{
				color: '#D0A1E6',
				label: '#D0A1E6'
			},
			{
				color: '#FAAFF8',
				label: '#FAAFF8'
			}
		],
		columns: 5,
		documentColors: 0
	},
	fontFamily: {
		options: [
			'default'
		]
	},
	mediaEmbed: {
		previewsInData: true,
		providers: [
			{
				// hint: this is just for previews. Get actual HTML codes by making API calls from your CMS
				name: 'Bilibili',
				// Match all URLs or just the ones you need:
				url: /^https:\/\/www\.bilibili\.com.+/,
				html: ( match: any ): string => {
					const url = match[ 0 ];
					const iframeUrl = IFRAME_SRC + '?app=1&api_key=' + API_KEY + '&url=' + encodeURIComponent( url );
					return (
						'<div class="iframely-embed"' +
						' style="left: 0; width: 100%; height: 0; position: relative; padding-bottom: 56.25%;">' +
						'<div class="iframely-responsive">' +
						`<iframe src="${ iframeUrl }" ` +
						' allow="autoplay; encrypted-media"' +
						' allowfullscreen style="top: 0; left: 0; width: 100%; height: 100%; position: absolute; border: 0;">' +
						'</iframe>' +
						'</div>' +
						'</div>'
					);
				}
			}
		]
	}
	// // **这个配置项需要传参,放到业务层处理了
	// simpleUpload: {
	// 	uploadUrl: 'https://sm.ms/api/v2/upload', // https://sm.ms/api/v2/upload
	// 	withCredentials: false,
	// 	headers: {
	// 		'Authorization': '29AvJy6e3zOm7CwS51PENBfRLdlnXisa'
	// 	}
	// }
};

// 经典编辑器
class ClassicEditor extends ClassicEditorBase {
	public static override builtinPlugins = plugins;
	public static override defaultConfig = configs;
}

// 气泡编辑器
class BalloonEditor extends BalloonEditorBase {
	public static override builtinPlugins = plugins;
	public static override defaultConfig = configs;
}

export default { ClassicEditor, BalloonEditor };
