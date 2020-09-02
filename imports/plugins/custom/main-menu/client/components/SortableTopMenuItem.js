import React from 'react';
import PropTypes from 'prop-types';
import { SortableElement } from 'react-sortable-hoc';
import Loadable from 'react-loadable';
const SortHandle = Loadable({
  loader: async () => {
    const component = await import('/imports/plugins/custom/flaneur/client/components/SortHandle');
    return component.default;
  },
  loading: () => null
});
const SortableChildMenuList = Loadable({
  loader: async () => {
    const component = await import('/imports/plugins/custom/main-menu/client/components/SortableChildMenuList');
    return component.default;
  },
  loading: () => null
});

const SortableTopMenuItem = SortableElement(({
  item,
  onItemRemove,
  index,
  onChildSortEnd,
  onChildItemRemove
}) => {

  const handleChildSortEnd = ({oldIndex, newIndex}) => {
    onChildSortEnd(item, oldIndex, newIndex);
  };

  return (
    <li key={index} className="list-group-item" style={{ zIndex: '2147483647' }}>
      <SortHandle />
      {item.label} ({item.path})
      <a href="javascript:void(0)" style={{ float: 'right', marginTop: 8 }} onClick={() => onItemRemove(item)}>Remove</a>
      {item.children && (
        <SortableChildMenuList
          parent={item}
          items={item.children}
          onSortEnd={handleChildSortEnd}
          onItemRemove={onChildItemRemove}
          useDragHandle={true}
        />
      )}
    </li>
  )
});

SortableTopMenuItem.propTypes = {
  item: PropTypes.object.isRequired,
  onItemRemove: PropTypes.func.isRequired
};

export default SortableTopMenuItem;
