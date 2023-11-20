import {
	useBlockProps,
	RichText,
	MediaPlaceholder,
	BlockControls,
	InspectorControls,
	store as blockEditorStore,
} from '@wordpress/block-editor';
import { isBlobURL, revokeBlobURL } from '@wordpress/blob';
import {
	Spinner,
	withNotices,
	ToolbarButton,
	PanelBody,
	TextareaControl,
	SelectControl,
	Icon,
	Tooltip,
	TextControl,
	Button,
} from '@wordpress/components';
import { useSelect } from '@wordpress/data';
import { useEffect, useState, useRef } from '@wordpress/element';

import {
	DndContext,
	useSensors,
	useSensor,
	PointerSensor,
} from '@dnd-kit/core';
import {
	SortableContext,
	horizontalListSortingStrategy,
	arrayMove,
} from '@dnd-kit/sortable';
import SortableItem from './sortable-item';

// https://source.unsplash.com/550x550/?portrait
function Edit( {
	attributes,
	setAttributes,
	context,
	noticeOperations,
	noticeUI,
	isSelected,
} ) {
	const { name, bio, url, alt, id, socialLinks } = attributes;
	const [ blobURL, setBlobURL ] = useState( '' );
	const [ selectedLink, setSelectedLink ] = useState( '' );
	const titleRef = useRef();
	const sensors = useSensors(
		useSensor( PointerSensor, {
			activationConstraint: {
				distance: 5,
			},
		} )
	);

	const imageObject = useSelect(
		( select ) => {
			return id ? select( 'core' ).getMedia( id ) : null;
		},
		[ id ]
	);
	const imageSizes = useSelect( ( select ) => {
		return select( blockEditorStore ).getSettings().imageSizes;
	}, [] );

	const getImageSizeOptions = () => {
		if ( ! imageSizes ) return [];
		const options = [];
		const sizes = imageObject?.media_details?.sizes;
		for ( const key in sizes ) {
			const size = sizes[ key ];
			const imageSize = imageSizes.find( ( item ) => item.slug === key );
			if ( ! imageSize ) {
				continue;
			}
			options.push( {
				label: imageSize.name,
				value: size.source_url,
				// width: size.width,
				// height: size.height,
			} );
		}
		return options;
	};

	const onChangeName = ( name ) => {
		setAttributes( { name } );
	};
	const onChangeBio = ( bio ) => {
		setAttributes( { bio } );
	};
	const onSelectImage = ( media ) => {
		if ( ! media || ! media.url ) {
			setAttributes( { url: undefined, id: undefined, alt: undefined } );
			return;
		}
		setAttributes( {
			id: media.id,
			url: media.url,
			alt: media.alt,
		} );
	};
	const onSelectUrl = ( url ) => {
		setAttributes( {
			id: undefined,
			url,
			alt: undefined,
		} );
	};
	const onChangeImageSize = ( url ) => {
		setAttributes( { url } );
	};

	const onUploadError = ( message ) => {
		noticeOperations.removeAllNotices();
		noticeOperations.createErrorNotice( message );
	};

	const removeImage = () => {
		setAttributes( { url: undefined, id: undefined, alt: undefined } );
	};

	const onChangeAlt = ( alt ) => {
		setAttributes( { alt } );
	};

	const addNewSocialLink = () => {
		const newSocialLinks = [ ...socialLinks ];
		newSocialLinks.push( {
			icon: 'wordpress',
			link: '#',
		} );

		setAttributes( { socialLinks: newSocialLinks } );
		setSelectedLink( socialLinks.length );
	};

	const updateSocialItem = ( type, value ) => {
		const newSocialLinks = [ ...socialLinks ];
		newSocialLinks[ selectedLink ][ type ] = value;
		setAttributes( { socialLinks: newSocialLinks } );
	};

	const removeSocialLink = () => {
		setAttributes( {
			socialLinks: socialLinks.filter(
				( item, index ) => index !== selectedLink
			),
		} );
		setSelectedLink( '' );
	};

	const handeDragEnd = ( event ) => {
		const { active, over } = event;
		if ( active.id === over.id ) {
			return;
		}
		if ( active && over ) {
			const oldIndex = socialLinks.findIndex(
				( item ) => `${ item.icon }-${ item.link }` === active.id
			);
			const newIndex = socialLinks.findIndex(
				( item ) => `${ item.icon }-${ item.link }` === over.id
			);
			const newSocialLinks = arrayMove( socialLinks, oldIndex, newIndex );
			setAttributes( { socialLinks: newSocialLinks } );
			setSelectedLink( newIndex );
		}
	};

	useEffect( () => {
		if ( ! id && isBlobURL( url ) ) {
			setAttributes( { url: undefined, alt: undefined } );
		}
	}, [] );

	useEffect( () => {
		if ( isBlobURL( url ) ) {
			setBlobURL( url );
		} else {
			revokeBlobURL( blobURL );
			setBlobURL( '' );
		}
	}, [ url ] );

	useEffect( () => {
		titleRef.current.focus();
	}, [ url ] );
	useEffect( () => {
		if ( ! isSelected ) {
			setSelectedLink( '' );
		}
	}, [ isSelected ] );
	return (
		<>
			<InspectorControls>
				<PanelBody title="Image Settings">
					{ id && (
						<SelectControl
							label="Image Size"
							options={ getImageSizeOptions() }
							value={ url }
							onChange={ onChangeImageSize }
						/>
					) }
					{ url && ! isBlobURL( url ) && (
						<TextareaControl
							label="Alt Text (Alternative Text)"
							value={ alt }
							onChange={ onChangeAlt }
						/>
					) }
				</PanelBody>
			</InspectorControls>
			{ url && (
				<BlockControls group="inline">
					<ToolbarButton onClick={ removeImage }>
						Remove Image
					</ToolbarButton>
				</BlockControls>
			) }

			<div { ...useBlockProps() }>
				{ url && (
					<div
						className={ `wp-block-block-course-team-member-img${
							isBlobURL( url ) ? ' is-loading' : ''
						}` }
					>
						<img src={ url } alt={ alt } />{ ' ' }
						{ isBlobURL( url ) && <Spinner /> }
					</div>
				) }
				<MediaPlaceholder
					icon="admin-users"
					onSelect={ onSelectImage }
					onSelectURL={ onSelectUrl }
					onError={ onUploadError }
					accept="image/*"
					allowedTypes={ [ 'image' ] }
					disableMediaButtons={ url }
					notices={ noticeUI }
				/>
				{ context[ 'block-course/team-members-columns' ] }
				<RichText
					placeholder="Name"
					tagName="h3"
					onChange={ onChangeName }
					value={ name }
					allowedFormats={ [] }
					ref={ titleRef }
				/>
				<RichText
					placeholder="Bio"
					tagName="p"
					onChange={ onChangeBio }
					value={ bio }
					allowedFormats={ [] }
				/>
				<div className="wp-block-block-course-team-member-social-links">
					<ul>
						<DndContext
							sensors={ sensors }
							onDragEnd={ handeDragEnd }
						>
							<SortableContext
								items={ socialLinks.map(
									( item ) => `${ item.icon }-${ item.link }`
								) }
								strategy={ horizontalListSortingStrategy }
							>
								{ socialLinks.map( ( item, index ) => {
									return (
										<SortableItem
											key={ `${ item.icon }-${ item.link }` }
											id={ `${ item.icon }-${ item.link }` }
											index={ index }
											selectedLink={ selectedLink }
											setSelectedLink={ setSelectedLink }
											icon={ item.icon }
										/>
									);
								} ) }
							</SortableContext>
						</DndContext>
						{ /* { socialLinks.map( ( item, index ) => {
							return (
								<li
									data-icon={ item.icon }
									key={ index }
									className={
										selectedLink === index
											? 'is-selected'
											: null
									}
								>
									<button
										onClick={ () =>
											setSelectedLink( index )
										}
									>
										<Icon icon={ item.icon } />
									</button>
								</li>
							);
						} ) } */ }
						{ isSelected && (
							<li className="wp-block-block-course-team-member-add-icon-li">
								<Tooltip text="Add Social Link">
									<button
										onClick={ addNewSocialLink }
										aria-label="Add Social link button"
									>
										<Icon icon="plus" />
									</button>
								</Tooltip>
							</li>
						) }
					</ul>
				</div>
				{ selectedLink !== '' && (
					<div className="wp-block-block-course-team-member-link-form">
						<TextControl
							label="Icon"
							value={ socialLinks[ selectedLink ].icon }
							onChange={ ( value ) =>
								updateSocialItem( 'icon', value )
							}
						/>
						<TextControl
							label="URL"
							value={ socialLinks[ selectedLink ].link }
							onChange={ ( value ) =>
								updateSocialItem( 'link', value )
							}
						/>
						<br />
						<Button isDestructive onClick={ removeSocialLink }>
							Remove Link
						</Button>
					</div>
				) }
			</div>
		</>
	);
}

export default withNotices( Edit );
