import { registerBlockType } from '@wordpress/blocks';
import { __ } from '@wordpress/i18n';
import Edit from './edit';
import Save from './save';

registerBlockType('price-box/single', {
  title: __('Team Member', 'team-members'),
  description: __('A team member item', 'team-members'),
  icon: 'admin-users',
  parent: ['price-box/group'],
  supports: {
    reusable: false,
    html: false,
  },
  usesContext: ['price-box/group-columns'],
  attributes: {},
  edit: Edit,
  save: Save,
});
