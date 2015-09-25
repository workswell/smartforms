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
      editMode: true
    };

    this._onQuestionChange = this._onQuestionChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    WorkspaceStore.addChangeListener(this._onQuestionChange);
  }

  componentWillUnmount() {
    WorkspaceStore.removeChangeListener(this._onQuestionChange);
  }

  handleClick(e) {
    e.preventDefault();
    e.stopPropagation();
    if (e.target.id === 'workspace') {
      Dispatcher.dispatch({
        actionType: ActionTypes.CLOSE_SIDEBAR
      });
    };

    if (e.target.tagName === 'BUTTON' && e.target.name === 'view') {
      Dispatcher.dispatch({
        actionType: ActionTypes.CLOSE_SIDEBAR
      });
      this.setState({
        editMode: !this.state.editMode
      });
    }
  }

  _onQuestionChange() {
    this.setState({
      questions: getWorkspaceQuestionState()
    });
  }

  render() {
    let main = this.state.editMode ? <WorkspaceQuestionList list={this.state.questions} /> : <div></div>;
    return (
      <div id="workspace" onClick={this.handleClick}>
        <ul className="workspace-nav">
          <li className="workspace-nav-item"><button type="button" name="view" className={'pure-button ' + (this.state.editMode?'pure-button-disabled':'')}>Editview</button></li>
          <li className="workspace-nav-item"><button type="button" name="view" className={'pure-button ' + (this.state.editMode?'':'pure-button-disabled')}>Preview</button></li>
        </ul>        
        {main}
      </div>
    );
  }

}

export default Workspace;
