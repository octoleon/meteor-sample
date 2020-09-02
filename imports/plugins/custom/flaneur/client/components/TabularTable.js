/**
 * @file
 * React component for including a Tabular table in React
 */
import React from 'react';
import PropTypes from 'prop-types';
import Blaze from 'meteor/gadicc:blaze-react-component';

const TabularTable = function (props) {
  const selector = props.selector || {};
  const id = props.id;
  const table = props.table;

  return (
    <Blaze template="tabular"
      table={table}
      selector={selector}
      id={id}
      className="table table-striped table-condensed" />
  );
};

TabularTable.propTypes = {
  table: PropTypes.object,
  id: PropTypes.string,
  selector: PropTypes.object
};

export default TabularTable;
