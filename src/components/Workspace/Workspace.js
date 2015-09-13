/*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */

import React, { PropTypes } from 'react';
import { findDOMNode } from 'react-dom';
import styles from './Workspace.css';
import withStyles from '../../decorators/withStyles';
import WorkspaceQuestionList from '../WorkspaceQuestionList';
import WorkspaceStore from '../../stores/WorkspaceStore';
import Dispatcher from '../../core/Dispatcher';
import ActionTypes from '../../constants/ActionTypes';

function getWorkspaceQuestionState () {
  return WorkspaceStore.getQuestions();
}

@withStyles(styles)
class Workspace extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      questions: getWorkspaceQuestionState(),
    };

    this._onQuestionChange = this._onQuestionChange.bind(this);
  }

  componentDidMount() {
    WorkspaceStore.addChangeListener(this._onQuestionChange);
  }

  componentWillUnmount() {
    WorkspaceStore.removeChangeListener(this._onQuestionChange);
  }

  _onQuestionChange() {
    this.setState({
      questions: getWorkspaceQuestionState()
    });
  }

  render() {
    return (
      <div id="workspace">
        <WorkspaceQuestionList list={this.state.questions} />
      </div>
    );
  }

}

export default Workspace;
