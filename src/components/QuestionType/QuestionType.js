/*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */

import React, { PropTypes } from 'react';
import { findDOMNode } from 'react-dom';
import styles from './QuestionType.css';
import withStyles from '../../decorators/withStyles';

@withStyles(styles)
class QuestionType {
  static propTypes = {
    typeName: PropTypes.string.isRequired
  }

  static defaultProps = {
    typeName: 'Unknown type'
  }

  render() {
    return (
      <li className="pure-menu-item">
        <a href="" className="pure-menu-link">{this.props.typeName}</a>
      </li>
    );
  }

}

export default QuestionType;
