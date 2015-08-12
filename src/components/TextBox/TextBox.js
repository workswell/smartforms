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
    maxLines: 1,
    label: 'Textbox'
  };

  render() {
    return (
      <div className="textbox-question" data-qid={this.props.qid}>
        {this.props.maxLines > 1 ?
          <textarea {...this.props} className="textbox-question-textarea" ref="input" key="input" rows={this.props.maxLines} /> :
          <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label textfield-demo">
            <input {...this.props} className="textbox-question-input mdl-textfield__input" ref="input" key="input" name={this.props.label}/>
            <label className="mdl-textfield__label" htmlFor={this.props.label}>{this.props.label}</label>
          </div>
        }
      </div>
    );
  }

}

export default TextBox;
