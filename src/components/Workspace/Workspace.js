/*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */

import React, { PropTypes } from 'react';
import { findDOMNode } from 'react-dom';
import styles from './Workspace.css';
import withStyles from '../../decorators/withStyles';
import Pointer from '../Pointer';
import WorkspaceQuestionList from '../WorkspaceQuestionList';
import WorkspaceQuestionStore from '../../stores/WorkspaceQuestionStore';
import WorkspacePointerStore from '../../stores/WorkspacePointerStore';
import Dispatcher from '../../core/Dispatcher';
import ActionTypes from '../../constants/ActionTypes';
import { dropable, undropable } from '../../core/utilities';

function getWorkspaceQuestionState () {
  return WorkspaceQuestionStore.getAll();
}

function getWorkspacePointerState () {
  return WorkspacePointerStore.getPos();
}

@withStyles(styles)
class Workspace extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      questions: getWorkspaceQuestionState(),
      pointer: getWorkspacePointerState()
    };

    this._onQuestionChange = this._onQuestionChange.bind(this);
    this._onPointerChange = this._onPointerChange.bind(this);
  }

  componentDidMount() {
    WorkspaceQuestionStore.addChangeListener(this._onQuestionChange);
    WorkspacePointerStore.addChangeListener(this._onPointerChange);
    dropable(findDOMNode(this));
  }

  componentWillUnmount() {
    WorkspaceQuestionStore.removeChangeListener(this._onQuestionChange);
    WorkspacePointerStore.removeChangeListener(this._onPointerChange);
    undropable(findDOMNode(this));
  }

  _onQuestionChange() {
    this.setState({
      questions: getWorkspaceQuestionState()
    });
  }

  _onPointerChange() {
    this.setState({
      pointer: getWorkspacePointerState()
    });
  }

  render() {
    return (
      <div id="workspace">
        <Pointer {...this.state.pointer}/>
        <WorkspaceQuestionList list={this.state.questions} />
      </div>
    );
  }

}

export default Workspace;
