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

const SortableColor = SortableElement(({ color, onColorRemove }) => {
  return (
    <li key={color._id} className="list-group-item" style={{ zIndex: '2147483647' }}>
      <SortHandle />
      {color.name}
      <a href="javascript:void(0)" style={{ float: 'right' }} onClick={() => onColorRemove(color)}>Remove</a>
    </li>
  )
});

SortableColor.propTypes = {
  color: PropTypes.object.isRequired,
  onColorRemove: PropTypes.func.isRequired
};

export default SortableColor;
