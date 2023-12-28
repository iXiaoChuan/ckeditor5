/**
 * @license Copyright (c) 2003-2023, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

/**
 * @module heading/headingui
 */

import { type Command, Plugin } from 'ckeditor5/src/core';
import {
	Model,
	createDropdown,
	addListToDropdown,
	type ButtonExecuteEvent,
	type ListDropdownItemDefinition
} from 'ckeditor5/src/ui';
import { Collection } from 'ckeditor5/src/utils';
import type { ParagraphCommand } from 'ckeditor5/src/paragraph';

import { getLocalizedOptions } from './utils';
import type HeadingCommand from './headingcommand';

import iconHeading1 from '../theme/icons/heading1.svg';
import iconHeading2 from '../theme/icons/heading2.svg';
import iconHeading3 from '../theme/icons/heading3.svg';
import iconHeading4 from '../theme/icons/heading4.svg';
import iconHeading5 from '../theme/icons/heading5.svg';
import iconHeading6 from '../theme/icons/heading6.svg';
import paragraph from '../theme/icons/paragraph.svg';

import '../theme/heading.css';

/**
 * The headings UI feature. It introduces the `headings` dropdown.
 */
export default class HeadingUI extends Plugin {
	/**
	 * @inheritDoc
	 */
	public static get pluginName() {
		return 'HeadingUI' as const;
	}

	/**
	 * @inheritDoc
	 */
	public init(): void {
		const editor = this.editor;
		const t = editor.t;
		const options = getLocalizedOptions( editor );
		// const defaultTitle = t( 'Choose heading' );
		const accessibleLabel = t( 'Heading' );

		// Register UI component.
		editor.ui.componentFactory.add( 'heading', locale => {
			const titles: Record<string, string> = {};
			const itemDefinitions: Collection<ListDropdownItemDefinition> = new Collection();

			const headingCommand: HeadingCommand = editor.commands.get( 'heading' )!;
			const paragraphCommand: ParagraphCommand = editor.commands.get( 'paragraph' )!;

			const commands: Array<Command> = [ headingCommand ];

			for ( const option of options ) {
				const def: ListDropdownItemDefinition = {
					type: 'button',
					model: new Model( {
						label: option.title,
						class: option.class,
						role: 'menuitemradio',
						withText: true
					} )
				};

				if ( option.model === 'paragraph' ) {
					def.model.bind( 'isOn' ).to( paragraphCommand, 'value' );
					def.model.set( 'commandName', 'paragraph' );
					commands.push( paragraphCommand );
				} else {
					def.model.bind( 'isOn' ).to( headingCommand, 'value', value => value === option.model );
					def.model.set( {
						commandName: 'heading',
						commandValue: option.model
					} );
				}

				// Add the option to the collection.
				itemDefinitions.add( def );

				titles[ option.model ] = option.title;
			}

			const dropdownView = createDropdown( locale );
			addListToDropdown( dropdownView, itemDefinitions, {
				ariaLabel: accessibleLabel,
				role: 'menu'
			} );

			dropdownView.buttonView.set( {
				ariaLabel: accessibleLabel,
				ariaLabelledBy: undefined,
				isOn: false,
				withText: false,
				tooltip: accessibleLabel
			} );

			dropdownView.extendTemplate( {
				attributes: {
					class: [
						'ck-heading-dropdown'
					]
				}
			} );

			dropdownView.bind( 'isEnabled' ).toMany( commands, 'isEnabled', ( ...areEnabled ) => {
				return areEnabled.some( isEnabled => isEnabled );
			} );

			// dropdownView.buttonView.bind( 'label' ).to( headingCommand, 'value', paragraphCommand, 'value', ( value, para ) => {
			// 	const whichModel = value || para && 'paragraph';
			//
			// 	if ( typeof whichModel === 'boolean' ) {
			// 		return defaultTitle;
			// 	}
			//
			// 	// If none of the commands is active, display default title.
			// 	if ( !titles[ whichModel ] ) {
			// 		return defaultTitle;
			// 	}
			//
			// 	return titles[ whichModel ];
			// } );

			dropdownView.buttonView.bind( 'icon' ).to( headingCommand, 'value', paragraphCommand, 'value', ( value, para ) => {
				const whichModel = value || para && 'paragraph';

				switch ( whichModel ) {
					case 'custom-heading1':
						return iconHeading1;
					case 'custom-heading2':
						return iconHeading2;
					case 'custom-heading3':
						return iconHeading3;
					case 'custom-heading4':
						return iconHeading4;
					case 'custom-heading5':
						return iconHeading5;
					case 'custom-heading6':
						return iconHeading6;
					case 'paragraph':
						return paragraph;
					default:
						return paragraph;
				}
			} );

			// Execute command when an item from the dropdown is selected.
			this.listenTo<ButtonExecuteEvent>( dropdownView, 'execute', evt => {
				const { commandName, commandValue } = evt.source as any;
				editor.execute( commandName, commandValue ? { value: commandValue } : undefined );
				editor.editing.view.focus();
			} );

			return dropdownView;
		} );
	}
}
