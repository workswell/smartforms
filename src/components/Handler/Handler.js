/*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */

import React, { PropTypes } from 'react';
import withStyles from '../../decorators/withStyles';
import styles from './Handler.css';

@withStyles(styles)
class Handler{
  render() {
    return <div className="question-wrapper__handler"></div>;
  }
}

export default Handler;
