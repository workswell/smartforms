/*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */

import React, { PropTypes } from 'react';
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
      <a className="mdl-navigation__link question-list__type" href="">
        {this.props.typeName}
      </a>
    );
  }

}

export default QuestionType;
