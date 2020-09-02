import React from 'react';
import PropTypes from 'prop-types';
import { SortableContainer } from 'react-sortable-hoc';
import Loadable from 'react-loadable';
const SortableColor = Loadable({
  loader: async () => {
    const component = await import ('./SortableColor');
    return component.default;
  },
  loading: () => null
});

const SortableColorList = SortableContainer(({ items, onColorRemove }) => {
  return (
    <ul className="list-group">
      {items.map((color, index) => {
        return (
          <SortableColor key={color._id} color={color} index={index} onColorRemove={onColorRemove} />
        )
      })}
    </ul>
  );
});

export default SortableColorList;
