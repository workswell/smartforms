/*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */

import React, { PropTypes } from 'react';
import { findDOMNode } from 'react-dom';
import BaseQuestion from '../BaseQuestion';
import withStyles from '../../decorators/withStyles';
import styles from './TextBox.css';

@withStyles(styles)
class TextBox extends BaseQuestion {

  static defaultProps = {
    maxLines: 1,
    label: 'Textbox'
  }

  componentDidMount() {
    super.componentDidMount();
    //componentHandler.upgradeElement(findDOMNode(this.refs.textbox));
  }

  componentWillUnmount() {
    //componentHandler.downgradeElements(findDOMNode(this.refs.textbox));
  }

  render() {
    return (
      <div className="textbox-question" onClick={this.handleClick}>
        <label>{this.props.label}</label>
        {this.props.maxLines > 1 ?
          <textarea {...this.props} className="textbox-question-textarea" ref="input" key="input" rows={this.props.maxLines} /> :
          <div ref="textbox">
            <input {...this.props} className="textbox-question-input" ref="input" key="input" name={this.props.label} placeholder={this.props.placeholder}/>
          </div>
        }
      </div>
    );
  }
}

TextBox.propTypes = Object.assign({
  maxLines: PropTypes.number
}, BaseQuestion.propTypes);

export default TextBox;
