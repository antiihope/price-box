import { registerBlockType } from '@wordpress/blocks';
import { __ } from '@wordpress/i18n';
import Edit from './edit';
import Save from './save';

registerBlockType( 'block-course/team-member', {
	title: __( 'Team Member', 'team-members' ),
	description: __( 'A team member item', 'team-members' ),
	icon: 'admin-users',
	parent: [ 'block-course/team-members' ],
	supports: {
		reusable: false,
		html: false,
	},
	usesContext: [ 'block-course/team-members-columns' ],
	attributes: {
		name: {
			type: 'string',
			source: 'html',
			selector: 'h3',
		},
		bio: {
			type: 'string',
			source: 'html',
			selector: 'p',
		},
		id: {
			type: 'number',
		},
		alt: {
			type: 'string',
			source: 'attribute',
			selector: 'img',
			attribute: 'alt',
			default: '',
		},
		url: {
			type: 'string',
			source: 'attribute',
			selector: 'img',
			attribute: 'src',
		},
		socialLinks: {
			type: 'array',
			default: [
				{
					social: 'facebook',
					icon: 'facebook',
					link: '#',
				},
				{
					social: 'twitter',
					icon: 'twitter',
					link: '#',
				},
				{
					social: 'instagram',
					icon: 'instagram',
					link: '#',
				},
			],
			source: 'query',
			selector: '.wp-block-block-course-team-member-social-links ul li',
			query: {
				icon: {
					source: 'attribute',
					attribute: 'data-icon',
				},
				link: {
					source: 'attribute',
					selector: 'a',
					attribute: 'href',
				},
			},
		},
	},
	edit: Edit,
	save: Save,
} );
