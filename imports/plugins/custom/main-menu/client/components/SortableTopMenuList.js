import React from 'react';
import PropTypes from 'prop-types';
import { SortableContainer } from 'react-sortable-hoc';
import Loadable from 'react-loadable';
const SortableTopMenuItem = Loadable({
  loader: async () => {
    const component = await import ('./SortableTopMenuItem');
    return component.default;
  },
  loading: () => null
});

const SortableTopMenuList = SortableContainer(({
  items,
  onItemRemove,
  onChildSortEnd,
  onChildItemRemove
}) => {
  return (
    <ul className="list-group sortable-menu">
      {items.map((item, index) => {
        return (
          <SortableTopMenuItem
            key={`top-menu-item-${index}`}
            item={item}
            index={index}
            onItemRemove={onItemRemove}
            onChildSortEnd={onChildSortEnd}
            onChildItemRemove={onChildItemRemove}
          />
        )
      })}
    </ul>
  );
});

export default SortableTopMenuList;
