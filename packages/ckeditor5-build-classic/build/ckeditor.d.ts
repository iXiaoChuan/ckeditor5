/**
 * @license Copyright (c) 2003-2023, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */
import { ClassicEditor as ClassicEditorBase } from '@ckeditor/ckeditor5-editor-classic';
import { BalloonEditor as BalloonEditorBase } from '@ckeditor/ckeditor5-editor-balloon';
import { MediaEmbed } from '@ckeditor/ckeditor5-media-embed';
import { Essentials } from '@ckeditor/ckeditor5-essentials';
import { Autoformat } from '@ckeditor/ckeditor5-autoformat';
import { Bold, Italic } from '@ckeditor/ckeditor5-basic-styles';
import { Heading } from '@ckeditor/ckeditor5-heading';
import { AutoImage, Image, ImageInsert, ImageResize, ImageStyle, ImageToolbar, ImageUpload } from '@ckeditor/ckeditor5-image';
import { Indent, IndentBlock } from '@ckeditor/ckeditor5-indent';
import { Link } from '@ckeditor/ckeditor5-link';
import { List, TodoList } from '@ckeditor/ckeditor5-list';
import { Paragraph } from '@ckeditor/ckeditor5-paragraph';
import { TextTransformation } from '@ckeditor/ckeditor5-typing';
import { Alignment } from '@ckeditor/ckeditor5-alignment';
import { FontBackgroundColor, FontColor } from '@ckeditor/ckeditor5-font';
import { Highlight } from '@ckeditor/ckeditor5-highlight';
import { HorizontalLine } from '@ckeditor/ckeditor5-horizontal-line';
import { SimpleUploadAdapter } from '@ckeditor/ckeditor5-upload';
declare class ClassicEditor extends ClassicEditorBase {
    static builtinPlugins: (typeof TextTransformation | typeof MediaEmbed | typeof Essentials | typeof Paragraph | typeof Heading | typeof Autoformat | typeof Bold | typeof Italic | typeof SimpleUploadAdapter | typeof AutoImage | typeof Image | typeof ImageInsert | typeof ImageResize | typeof ImageStyle | typeof ImageToolbar | typeof ImageUpload | typeof Indent | typeof IndentBlock | typeof Link | typeof List | typeof TodoList | typeof Alignment | typeof FontBackgroundColor | typeof FontColor | typeof Highlight | typeof HorizontalLine)[];
    static defaultConfig: {
        language: string;
        toolbar: {
            items: string[];
            shouldNotGroupWhenFull: boolean;
        };
        image: {
            inset: {
                integrations: string[];
            };
            toolbar: string[];
            upload: {
                types: string[];
            };
        };
        fontColor: {
            colors: ({
                color: string;
                label: string;
                hasBorder?: undefined;
            } | {
                color: string;
                label: string;
                hasBorder: boolean;
            })[];
            columns: number;
            documentColors: number;
        };
        fontBackgroundColor: {
            colors: ({
                color: string;
                label: string;
                hasBorder?: undefined;
            } | {
                color: string;
                label: string;
                hasBorder: boolean;
            })[];
            columns: number;
            documentColors: number;
        };
        simpleUpload: {
            uploadUrl: string;
            withCredentials: boolean;
            headers: {
                'X-CSRF-TOKEN': string;
                Authorization: string;
            };
        };
        mediaEmbed: {
            previewsInData: boolean;
            providers: {
                name: string;
                url: string;
                html: (data: any) => any;
            }[];
        };
    };
}
declare class BalloonEditor extends BalloonEditorBase {
    static builtinPlugins: (typeof TextTransformation | typeof MediaEmbed | typeof Essentials | typeof Paragraph | typeof Heading | typeof Autoformat | typeof Bold | typeof Italic | typeof SimpleUploadAdapter | typeof AutoImage | typeof Image | typeof ImageInsert | typeof ImageResize | typeof ImageStyle | typeof ImageToolbar | typeof ImageUpload | typeof Indent | typeof IndentBlock | typeof Link | typeof List | typeof TodoList | typeof Alignment | typeof FontBackgroundColor | typeof FontColor | typeof Highlight | typeof HorizontalLine)[];
    static defaultConfig: {
        language: string;
        toolbar: {
            items: string[];
            shouldNotGroupWhenFull: boolean;
        };
        image: {
            inset: {
                integrations: string[];
            };
            toolbar: string[];
            upload: {
                types: string[];
            };
        };
        fontColor: {
            colors: ({
                color: string;
                label: string;
                hasBorder?: undefined;
            } | {
                color: string;
                label: string;
                hasBorder: boolean;
            })[];
            columns: number;
            documentColors: number;
        };
        fontBackgroundColor: {
            colors: ({
                color: string;
                label: string;
                hasBorder?: undefined;
            } | {
                color: string;
                label: string;
                hasBorder: boolean;
            })[];
            columns: number;
            documentColors: number;
        };
        simpleUpload: {
            uploadUrl: string;
            withCredentials: boolean;
            headers: {
                'X-CSRF-TOKEN': string;
                Authorization: string;
            };
        };
        mediaEmbed: {
            previewsInData: boolean;
            providers: {
                name: string;
                url: string;
                html: (data: any) => any;
            }[];
        };
    };
}
declare const _default: {
    ClassicEditor: typeof ClassicEditor;
    BalloonEditor: typeof BalloonEditor;
};
export default _default;
