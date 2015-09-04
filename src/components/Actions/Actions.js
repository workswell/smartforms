/*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */

import React, {PropTypes} from 'react';
import withStyles from '../../decorators/withStyles';
import styles from './Actions.css';

@withStyles(styles)
class Actions{
  static propTypes = {
    handleClick: PropTypes.func.isRequired,
    qid: PropTypes.number.isRequired
  }

  constructor() {
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.props.handleClick(this.props.qid);
  }

  render() {
    return (<div className="question-wrapper__actions">
            <button onClick={this.handleClick} className="mdl-button mdl-js-button mdl-button--fab mdl-button--mini-fab mdl-button--colored">
              <i className="material-icons">delete</i>
            </button>
          </div>);
  }
}

export default Actions;
