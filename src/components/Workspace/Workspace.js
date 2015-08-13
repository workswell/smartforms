/*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */

import React, { PropTypes } from 'react';
import { findDOMNode } from 'react-dom';
import styles from './Workspace.css';
import withStyles from '../../decorators/withStyles';
import WorkspaceQuestionList from '../WorkspaceQuestionList';
import WorkspaceQuestionStore from '../../stores/WorkspaceQuestionStore';

function getWorkspaceQuestionState () {
  return {questions: WorkspaceQuestionStore.getAll()};
}

@withStyles(styles)
class Workspace extends React.Component{
  constructor(props) {
    super(props);
    this.state = getWorkspaceQuestionState();
    this._onChange = this._onChange.bind(this);
  }

  componentDidMount() {
    WorkspaceQuestionStore.addChangeListener(this._onChange);
  }

  componentWillUnmount() {
    WorkspaceQuestionStore.removeChangeListener(this._onChange);
  }

  _onChange() {
    this.setState(getWorkspaceQuestionState());
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
