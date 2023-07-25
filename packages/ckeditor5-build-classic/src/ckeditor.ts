/**
 * @license Copyright (c) 2003-2023, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

// The editor creator to use.
import { ClassicEditor as ClassicEditorBase } from '@ckeditor/ckeditor5-editor-classic';
import { BalloonEditor as BalloonEditorBase } from '@ckeditor/ckeditor5-editor-balloon';

import { Essentials } from '@ckeditor/ckeditor5-essentials';
import { Autoformat } from '@ckeditor/ckeditor5-autoformat';
import { Bold, Italic, Strikethrough, Underline } from '@ckeditor/ckeditor5-basic-styles';
import { Heading } from '@ckeditor/ckeditor5-heading';
import {
	AutoImage,
	Image,
	ImageInsert,
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
import { FontBackgroundColor, FontColor, FontSize } from '@ckeditor/ckeditor5-font';
import { Highlight } from '@ckeditor/ckeditor5-highlight';
import { HorizontalLine } from '@ckeditor/ckeditor5-horizontal-line';

// General plug-ins
const plugins = [
	Alignment,
	AutoImage,
	Autoformat,
	Bold,
	Essentials,
	FontBackgroundColor,
	FontColor,
	FontSize,
	Heading,
	Highlight,
	HorizontalLine,
	Image,
	ImageInsert,
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
	Strikethrough,
	TextTransformation,
	TodoList,
	Underline
];

// General configuration
const configs = {
	toolbar: {
		items: [
			'undo', // **撤销
			'redo', // **重做
			'|',
			'heading', // **标题
			'|',
			'bold', // **加粗
			'italic', // **斜体
			'strikethrough', // **删除线
			'underline', // **下划线
			'|',
			'fontColor', // **字体颜色
			'fontBackgroundColor', // **字体背景颜色
			// 'fontSize', // **字体大小
			// 'highlight', // **高亮
			'|',
			'bulletedList', // **无序列表
			'numberedList', // **有序列表
			'|',
			'outdent', // **减少缩进
			'indent', // **增加缩进
			'alignment', //* *对齐方式
			'|',
			{
				label: 'More basic styles',
				icon: 'threeVerticalDots',
				items: [
					'imageInsert', // 插入图片
					'link' // 插入链接
				]
			}
		],
		shouldNotGroupWhenFull: true
	},
	language: 'en',
	image: {
		inset: {
			integrations: [
				'insertImageViaUrl' // **使用链接插入图片
			]
		},
		toolbar: [
			'imageStyle:inline', // **图片选中样式  inline
			'imageStyle:block', // **图片选中样式  block
			'imageStyle:side' // **图片选中样式 side
		]
	}
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
