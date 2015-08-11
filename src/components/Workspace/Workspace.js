/*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */

import React, { PropTypes } from 'react';
import styles from './Workspace.css';
import withStyles from '../../decorators/withStyles';
import TextBox from '../TextBox/TextBox';

@withStyles(styles)
class Workspace {

  render() {
    return (
      <div id="workspace">
        <TextBox label="username"/>
        <TextBox label="password" type="password"/>
      </div>
    );
  }

}

export default Workspace;
