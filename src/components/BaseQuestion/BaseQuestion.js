/*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */

import React, { PropTypes } from 'react';
import { findDOMNode } from 'react-dom';
import Dispatcher from '../../core/Dispatcher';
import ActionTypes from '../../constants/ActionTypes';

class BaseQuestion {
  static propTypes = {
    qid: PropTypes.number.isRequired,
    label: PropTypes.string.isRequired
  }

  componentDidMount() {
  }

  componentWillUnmount() {

  }

  _bind(...methods) {
    methods.forEach( (method) => this[method] = this[method].bind(this) );
  }
}

export default BaseQuestion;
