/*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */

import React, { PropTypes } from 'react';
import { findDOMNode } from 'react-dom';
import styles from './Workspace.css';
import withStyles from '../../decorators/withStyles';
import Dispatcher from '../../core/Dispatcher';
import ActionTypes from '../../constants/ActionTypes';
import WorkspaceQuestionList from '../WorkspaceQuestionList';
import WorkspaceQuestionStore from '../../stores/WorkspaceQuestionStore';

function dropable(nodes) {
  Array.from(nodes).forEach((node) => {    
    node.addEventListener('dragover', function(e) {
      if (e.preventDefault) e.preventDefault();
      e.dataTransfer.dropEffect = 'copy';
      return false;
    });

    node.addEventListener('dragenter', function(e) {
      this.classList.add('over');
      console.log('dragenter ' +  this.dataset.reactid);
    });

    node.addEventListener('dragleave', function(e) {
      this.classList.remove('over');
      console.log('dragleave ' + this.dataset.reactid);
    });

    node.addEventListener('drop', function(e) {
      if (e.preventDefault) e.preventDefault();
      if (e.stopPropagation) e.stopPropagation();

      this.classList.remove('over');

      // let emptyBlock = document.createElement('div');
      // emptyBlock.innerHTML = '<div class="empty-block-question">This paragraph replaced the original div.</div>';

      // this.parentNode.insertBefore(emptyBlock.firstChild, this);
      Dispatcher.dispatch({
        actionType: ActionTypes.CREATE_QUESTION,
        data: {
          qtype: e.dataTransfer.getData('questionType'),
          qid: this.dataset.qid
        }
      });

      return false;
    });
  })
}

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
    dropable(findDOMNode(this).querySelectorAll('[class$="-question"]'));
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
