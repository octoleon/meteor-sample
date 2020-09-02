import React from 'react';
import { SortableHandle } from 'react-sortable-hoc';

const SortHandle = SortableHandle(() => (
  <button
    className="rui btn btn-default flat button"
    style={{ cursor: 'move', paddingLeft: 5, paddingRight: 5, marginLeft: -10, marginRight: 10 }}>
    <i className="rui font-icon fa fa-bars"></i>
  </button>
));

export default SortHandle;
