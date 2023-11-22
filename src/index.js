import { registerBlockType, createBlock } from '@wordpress/blocks';
import './style.scss';
import Edit from './edit';
import save from './save';

registerBlockType('price-box/group', {
  edit: Edit,
  save,
});
