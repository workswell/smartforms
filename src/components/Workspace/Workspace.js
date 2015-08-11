/*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */

import React, { PropTypes } from 'react';
import { findDOMNode } from 'react-dom';
import styles from './Workspace.css';
import withStyles from '../../decorators/withStyles';
import TextBox from '../TextBox/TextBox';

function dropable(nodes) {
  [].forEach.call(nodes, (node) => {
    node.addEventListener('dragover', function(e) {
      if (e.preventDefault) e.preventDefault();
      e.dataTransfer.dropEffect = 'copy';
      return false;
    });

    node.addEventListener('dragenter', function(e) {
      this.classList.add('over');
    });

    node.addEventListener('dragleave', function(e) {
      this.classList.remove('over');
    });

    node.addEventListener('drop', function(e) {
      if (e.preventDefault) e.preventDefault();
      if (e.stopPropagation) e.stopPropagation();

      this.classList.remove('over');

      this.parentNode.insertBefore(document.createElement('h3'), this);

      return false;
    });
  })
}

@withStyles(styles)
class Workspace {
  componentDidMount() {
    dropable(findDOMNode(this).querySelectorAll('[class$="-question"]'));
  }

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
