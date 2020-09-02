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

const SortableChildMenuItem = SortableElement(({
  item,
  onItemRemove,
  index
}) => {

  const handleChildSortEnd = ({oldIndex, newIndex}) => {
    onChildSortEnd(item, oldIndex, newIndex);
  };

  return (
    <li key={index} className="list-group-item" style={{ zIndex: '2147483647' }}>
      <SortHandle />
      {item.label} ({item.path})
      <a href="javascript:void(0)" style={{ float: 'right', marginTop: 8 }} onClick={() => onItemRemove(item)}>Remove</a>
    </li>
  )
});

SortableChildMenuItem.propTypes = {
  item: PropTypes.object.isRequired,
  onItemRemove: PropTypes.func.isRequired
};

export default SortableChildMenuItem;
