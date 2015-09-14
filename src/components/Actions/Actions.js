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

  handleClick(e) {
    e.preventDefault();
    e.stopPropagation();
    this.props.handleClick(this.props.qid);
  }

  render() {
    return (<div className="question-wrapper__actions">
            <button onClick={this.handleClick} className="pure-button">
              delete
            </button>
          </div>);
  }
}

export default Actions;
