/**
 * @license Copyright (c) 2003-2022, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

/**
 * @module list/documentlistproperties/converters
 */

import ListWalker from '../documentlist/utils/listwalker';
import { findMappedViewElement } from '../documentlist/converters';
import { createListElement } from '../documentlist/utils/view';

/**
 * Returns a converter that consumes the `style`, `reversed`, and `start` attributes.
 * In `style`, it searches for the `list-style-type` definition.
 * If not found, the `"default"` value will be used.
 *
 * @protected
 * @param {module:list/documentlistproperties/documentlistpropertiesediting~AttributeStrategy} strategy
 * @returns {Function}
 */
export function listPropertiesUpcastConverter( strategy ) {
	return ( evt, data, conversionApi ) => {
		const { writer, schema, consumable } = conversionApi;

		// If there is no view consumable to consume, set the default attribute value to be able to reconvert nested lists on parent change.
		// So abort converting if attribute was directly consumed.
		if ( consumable.test( data.viewItem, strategy.viewConsumables ) === false ) {
			return;
		}

		if ( !data.modelRange ) {
			Object.assign( data, conversionApi.convertChildren( data.viewItem, data.modelCursor ) );
		}

		let applied = false;

		for ( const item of data.modelRange.getItems( { shallow: true } ) ) {
			if ( !schema.checkAttribute( item, strategy.attributeName ) ) {
				continue;
			}

			if ( !strategy.appliesToListItem( item ) ) {
				continue;
			}

			// Set list attributes only on same level items, those nested deeper are already handled by the recursive conversion.
			if ( item.hasAttribute( strategy.attributeName ) ) {
				continue;
			}

			writer.setAttribute( strategy.attributeName, strategy.getAttributeOnUpcast( data.viewItem ), item );
			applied = true;
		}

		if ( applied ) {
			consumable.consume( data.viewItem, strategy.viewConsumables );
		}
	};
}

/**
 * Returns a converter that adds `reversed`, `start` attributes and adds `list-style-type` definition as a value for the `style` attribute.
 * The `"default"` values are removed and not present in the view/data.
 *
 * @protected
 * @param {module:list/documentlistproperties/documentlistpropertiesediting~AttributeStrategy} strategy
 * @param {module:engine/model/model~Model} model The model.
 * @returns {Function}
 */
export function listPropertiesDowncastConverter( strategy, model ) {
	return ( evt, data, conversionApi ) => {
		const { writer, mapper, consumable } = conversionApi;
		const listItem = data.item;

		if ( !consumable.consume( listItem, evt.name ) ) {
			return;
		}

		// Use positions mapping instead of mapper.toViewElement( listItem ) to find outermost view element.
		// This is for cases when mapping is using inner view element like in the code blocks (pre > code).
		const viewElement = findMappedViewElement( listItem, mapper, model );

		// Then wrap them with the new list wrappers.
		wrapListItemBlock( listItem, writer.createRangeOn( viewElement ), strategy, writer );
	};
}

// Wraps the given list item with appropriate attribute elements for ul, ol, and li.
function wrapListItemBlock( listItem, viewRange, strategy, writer ) {
	if ( !listItem.hasAttribute( 'listIndent' ) ) {
		return;
	}

	const listItemIndent = listItem.getAttribute( 'listIndent' );
	let listType = listItem.getAttribute( 'listType' );
	let listProperty = listItem.getAttribute( strategy.attributeName );

	let currentListItem = listItem;

	for ( let indent = listItemIndent; indent >= 0; indent-- ) {
		if ( strategy.appliesToListItem( currentListItem ) ) {
			const listViewElement = createListElement( writer, indent, listType );

			strategy.setAttributeOnDowncast( writer, listProperty, listViewElement );
			viewRange = writer.wrap( viewRange, listViewElement );
		}

		if ( indent == 0 ) {
			break;
		}

		currentListItem = ListWalker.first( currentListItem, { lowerIndent: true } );

		// There is no list item with lower indent, this means this is a document fragment containing
		// only a part of nested list (like copy to clipboard) so we don't need to try to wrap it further.
		if ( !currentListItem ) {
			break;
		}

		listType = currentListItem.getAttribute( 'listType' );
		listProperty = currentListItem.getAttribute( strategy.attributeName );
	}
}
