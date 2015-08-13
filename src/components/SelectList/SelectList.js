/*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */

import React, { PropTypes } from 'react';
import BaseQuestion from '../BaseQuestion';
import withStyles from '../../decorators/withStyles';
import styles from './SelectList.css';

@withStyles(styles)
class SelectList extends BaseQuestion {

  static defaultProps = {
    label: 'SelectList',
    options: ['A', 'C', 'X']
  }

  render() {
    return (
      <div className="selectlist-question" data-qid={this.props.qid}>
        <select>{this.props.options.map( option => <option>{option}</option>)}</select>
      </div>
    );
  }
}

SelectList.propTypes = Object.assign({
  options: PropTypes.array
}, BaseQuestion.propTypes);

export default SelectList;
