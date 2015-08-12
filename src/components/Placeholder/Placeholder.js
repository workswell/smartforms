/*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */

import React, { PropTypes } from 'react';
import BaseQuestion from '../BaseQuestion';
import withStyles from '../../decorators/withStyles';
import styles from './Placeholder.css';

@withStyles(styles)
class Placeholder extends BaseQuestion {
  render() {
    return <div className="placeholder-question" data-qid={this.props.qid}></div>;
  }
}

export default Placeholder;
