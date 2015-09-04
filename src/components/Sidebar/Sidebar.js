/*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */

import React, { PropTypes } from 'react';
import withStyles from '../../decorators/withStyles';
import styles from './Sidebar.css';

@withStyles(styles)
class Sidebar{
  render() {
    return <div className="sidebar">Sidebar</div>;
  }
}

export default Sidebar;
