/*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */

import React, { PropTypes } from 'react';
import BaseQuestion from '../BaseQuestion';
import withStyles from '../../decorators/withStyles';
import styles from './SelectList.css';

@withStyles(styles)
class SelectList extends BaseQuestion {
  render() {
    return (
      <div className="selectlist-question" onClick={this.handleClick}>
        <label>{this.props.label}</label>
        <select>{this.props.options.map( option => <option key={option}>{option}</option>)}</select>
      </div>
    );
  }
}

SelectList.defaultProps = {
  label: 'SelectList',
  options: ['A', 'C', 'X']
}

SelectList.propTypes = Object.assign({
  options: PropTypes.array
}, BaseQuestion.propTypes);

export default SelectList;
