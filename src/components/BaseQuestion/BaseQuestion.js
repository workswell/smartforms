/*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */

import React, { PropTypes } from 'react';
import { findDOMNode } from 'react-dom';
import Dispatcher from '../../core/Dispatcher';
import ActionTypes from '../../constants/ActionTypes';

class BaseQuestion extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
  }

  componentWillUnmount() {
  }

  handleClick() {
    Dispatcher.dispatch({
      actionType: ActionTypes.SELECTED_QUESTION,
      props: this.props
    });
  }

  _bind(...methods) {
    methods.forEach( (method) => this[method] = this[method].bind(this) );
  }
}

BaseQuestion.propTypes = {
  qid: PropTypes.number.isRequired,
  label: PropTypes.string.isRequired
}

export default BaseQuestion;
