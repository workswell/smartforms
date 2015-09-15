/*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */

import React, { PropTypes } from 'react';
import withStyles from '../../decorators/withStyles';
import styles from './SortableList.css';

@withStyles(styles)
class SortableList {
  render() {
    let headers = [];
    if (this.props.list.length > 0) {
      if (typeof this.props.list[0] !== 'object') {
        headers = ['KEY', 'VALUE'];
      }
    }
    return (
      <table className="sortable-list">
        <thead>
          <tr>
            {headers.map((header)=>{return <th>{header}</th>;})}
          </tr>
        </thead>
        <tbody>
          {this.props.list.map((item)=>{return <tr><td></td><td>{item}</td></tr>;})}
        </tbody>
      </table>
    );
  }
}

SortableList.defaultProps = {
  list: ['A', 'C', 'X']
}

SortableList.propTypes = {
  list: PropTypes.array
};

export default SortableList;
