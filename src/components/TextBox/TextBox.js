/*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */

import React, { PropTypes } from 'react';
import withStyles from '../../decorators/withStyles';
import styles from './TextBox.css';

@withStyles(styles)
class TextBox {

  static propTypes = {
    maxLines: PropTypes.number,
    label: PropTypes.string.isRequired
  };

  static defaultProps = {
    maxLines: 1
  };

  render() {
    return (
      <div className="TextBox">
        {this.props.maxLines > 1 ?
          <textarea {...this.props} className="TextBox-input" ref="input" key="input" rows={this.props.maxLines} /> :
          <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label textfield-demo">
            <input {...this.props} className="TextBox-input mdl-textfield__input" ref="input" key="input" id="sample3"/>
            <label className="mdl-textfield__label" htmlFor="sample3">{this.props.label}</label>
          </div>
        }
      </div>
    );
  }

}

export default TextBox;
