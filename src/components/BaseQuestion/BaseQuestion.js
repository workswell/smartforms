/*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */

import React, { PropTypes } from 'react';

class BaseQuestion extends React.Component {
  static propTypes = {
    qid: PropTypes.number.isRequired
  }
  _bind(...methods) {
    methods.forEach( (method) => this[method] = this[method].bind(this) );
  }
}

export default BaseQuestion;
