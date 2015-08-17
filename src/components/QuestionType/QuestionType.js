/*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */

import React, { PropTypes } from 'react';
import { findDOMNode } from 'react-dom';
import styles from './QuestionType.css';
import withStyles from '../../decorators/withStyles';
import $ from 'jquery';

@withStyles(styles)
class QuestionType {
  static propTypes = {
    typeName: PropTypes.string.isRequired
  }

  static defaultProps = {
    typeName: 'Unknown type'
  }

  componentDidMount() {
    $(findDOMNode(this)).draggable({
      connectToSortable: '.workspace-question-list',
      appendTo: 'body',
      helper: "clone"
    })
  }

  componentWillUnmount() {
    $(findDOMNode(this)).draggable('destroy')
  }

  render() {
    return (
      <a className="mdl-navigation__link question-list__type" href="" data->
        {this.props.typeName}
      </a>
    );
  }

}

export default QuestionType;
