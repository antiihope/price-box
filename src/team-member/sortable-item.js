import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Icon } from '@wordpress/components';

export default function SortableItem( props ) {
	const {
		attributes,
		listeners,
		setNodeRef,
		transform,
		transition,
	} = useSortable( { id: props.id } );
	const style = {
		transform: CSS.Transform.toString( transform ),
		transition,
	};
	return (
		<li
			ref={ setNodeRef }
			{ ...attributes }
			{ ...listeners }
			style={ style }
			className={
				props.selectedLink === props.index ? 'is-selected' : null
			}
		>
			<button onClick={ () => props.setSelectedLink( props.index ) }>
				<Icon icon={ props.icon } />
			</button>
		</li>
	);
}
