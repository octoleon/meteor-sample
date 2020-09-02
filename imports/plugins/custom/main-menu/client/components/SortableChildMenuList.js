import React from 'react';
import PropTypes from 'prop-types';
import { SortableContainer } from 'react-sortable-hoc';
import Loadable from 'react-loadable';
const SortableChildMenuItem = Loadable({
  loader: async () => {
    const component = await import ('./SortableChildMenuItem');
    return component.default;
  },
  loading: () => null
});

const SortableChildMenuList = SortableContainer(({
  parent,
  items,
  onItemRemove,
  onChildSortEnd
}) => {
  return (
    <ul className="list-group sortable-child-menu">
      {items.map((item, index) => {
        return (
          <SortableChildMenuItem
            key={`top-menu-item-${index}`}
            item={item}
            index={index}
            onSortEnd={onChildSortEnd}
            onItemRemove={() => onItemRemove(parent, item)}
          />
        )
      })}
    </ul>
  );
});

export default SortableChildMenuList;
