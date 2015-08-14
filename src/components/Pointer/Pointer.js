/*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */

import React, { PropTypes } from 'react';
import withStyles from '../../decorators/withStyles';
import styles from './Pointer.css';

@withStyles(styles)
class Pointer{
  render() {
    let divStyle = {
      left: this.props.clientX,
      top: this.props.clientY
    }

    return <div id="workspace-pointer" style={divStyle}> left {divStyle.left} right {divStyle.top} </div>;
  }
}

export default Pointer;
