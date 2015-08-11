/*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */

import React, { PropTypes } from 'react';
import { findDOMNode } from 'react-dom';
import styles from './QuestionType.css';
import withStyles from '../../decorators/withStyles';

function draggable(node) {
  node.addEventListener('dragstart', function(e) {
    e.dataTransfer.effectAllowed = 'copy';
    e.dataTransfer.setData('text', this.innerText);
  });
}

@withStyles(styles)
class QuestionType {
  static propTypes = {
    typeName: PropTypes.string.isRequired
  }

  static defaultProps = {
    typeName: 'Unknown type'
  }

  componentDidMount() {
    draggable(findDOMNode(this));
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
