/*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */

import React, { PropTypes } from 'react';
import { findDOMNode } from 'react-dom';
import dragula from 'react-dragula';
import styles from './App.css';
import withContext from '../../decorators/withContext';
import withStyles from '../../decorators/withStyles';
import Header from '../Header';
import Feedback from '../Feedback';
import Footer from '../Footer';
import Sidebar from '../Sidebar';
import QuestionType from'../QuestionType';
import QuestionTypes from '../../constants/QuestionTypes';
import EventTypes from '../../constants/EventTypes';
import ActionTypes from '../../constants/ActionTypes';
import Dispatcher from '../../core/Dispatcher';
import WorkspaceStore from '../../stores/WorkspaceStore';

function getAppState () {
  return WorkspaceStore.getAppState();
}

@withContext
@withStyles(styles)
class App extends React.Component{
  constructor(props) {
    super(props);
    this.state = getAppState();
    this._onStateChange = this._onStateChange.bind(this);
  }

  componentDidMount() {
    WorkspaceStore.on(EventTypes.APP_STATE_EVENT, this._onStateChange);

    let data,
      drake = dragula({
      containers: [findDOMNode(this.refs.questionList), document.getElementsByClassName('workspace-question-list')[0]],
      moves(el, source, handle) {
        if (source.className === 'workspace-question-list') {
          drake.copy = false;
          return handle.className === 'question-wrapper__handler';
        } else {
          drake.copy = true;
          return true;
        }
      }
    });

    drake.on('shadow', (item, dropTarget, reference)=> {
      if (!reference || reference && reference.dataset.qid !== '-1') {
        if (drake.copy) {
          Dispatcher.dispatch({
            actionType: ActionTypes.DELETE_QUESTION,
            qid: -1
          });

          Dispatcher.dispatch({
            actionType: ActionTypes.CREATE_QUESTION,
            data: {
              qtype: QuestionTypes[item.textContent],
              props: {
                qid: -1,
                refQid: reference ? reference.dataset.qid : null
              }
            }
          });
        } else {
          Dispatcher.dispatch({
            actionType: ActionTypes.UPDATE_QUESTION_POSITION,
            data: {
              qid: item.dataset.qid,
              refQid: reference ? reference.dataset.qid : null
            }
          });
        }
      }
    });

    drake.on('drop', ()=>{
      Dispatcher.dispatch({
        actionType: ActionTypes.UPDATE_QUESTION_POSITION,
        data: {
          qid: -1
        }
      });
    });

    drake.on('cancel', ()=>{
      Dispatcher.dispatch({
        actionType: ActionTypes.DELETE_QUESTION,
        qid: -1
      });
    });

    drake.on('remove', ()=>{
      Dispatcher.dispatch({
        actionType: ActionTypes.DELETE_QUESTION,
        qid: -1
      });
    });
  }

  componentWillUnmount() {
    WorkspaceStore.removeListener(EventTypes.APP_STATE_EVENT, this._onStateChange);
  }

  render() {
    let contentClassname = this.state.sideBarOpen ? 'pure-u-3-5' : 'pure-u-4-5',
      sideBarClassname = this.state.sideBarOpen ? 'pure-u-1-5' : 'hidden';

    return !this.props.error ? (
      <div>
        <div className="pure-g">
          <div className="pure-u-1-5">
            <div className="pure-menu">
              <span className="pure-menu-heading">Question Type</span>
              <ul className="pure-menu-list" ref="questionList">
                {this._getQuestionTypes()}
              </ul>
            </div>
          </div>
          <div className={"page-content " + contentClassname}>{this.props.children}</div>
          <div className={"page-sidebar " + sideBarClassname}>
            <Sidebar/>
          </div>
        </div>
        <Footer/>
      </div>
    ) : this.props.children;
  }

  _getQuestionTypes() {
    return Object.keys(QuestionTypes).map((questionType) => <QuestionType key={questionType} typeName={questionType} />);
  }

  _onStateChange() {
    this.setState(getAppState());
  }
}

App.propTypes = {
  children: PropTypes.element.isRequired,
  error: PropTypes.object
};

export default App;
