/*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */

import React, { PropTypes } from 'react';
import BaseQuestion from '../BaseQuestion';
import withStyles from '../../decorators/withStyles';
import styles from './Placeholder.css';

@withStyles(styles)
class Placeholder extends BaseQuestion {
  static defaultProps = {
    label: 'Placeholder'
  }

  render() {
    return <div className="placeholder-question">Placeholder</div>;
  }
}

export default Placeholder;
