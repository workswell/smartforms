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
import Pointer from '../Pointer';
import QuestionType from'../QuestionType';
import QuestionTypes from '../../constants/QuestionTypes';
import ActionTypes from '../../constants/ActionTypes';
import Dispatcher from '../../core/Dispatcher';

@withContext
@withStyles(styles)
class App extends React.Component {
  constructor() {
    super();
    this.state = {
      pointerType: null,
      pointerLeft: 0,
      pointerTop: 0
    };
  }

  static propTypes = {
    children: PropTypes.element.isRequired,
    error: PropTypes.object
  };

  componentDidMount() {
    let data,
      drake = dragula({
      containers: [findDOMNode(this.refs.questionList), document.getElementsByClassName('workspace-question-list')[0]],
      moves: function (el, source, handle) {
        if (source.className === 'workspace-question-list') {
          drake.copy = false;
          return handle.className === 'question-wrapper__handler';
        } else {
          drake.copy = true;
          return true;
        }
      }
    });

    drake.on('cloned', (left, top, type)=>{
      if (type === 'mirror') {
        this.setState({pointerType: top.textContent});
      } else if (type === 'position') {
        this.setState({
          pointerLeft: left,
          pointerTop: top
        });
      } else if (type === 'remove') {
        this.setState({
          pointerType: null,
          pointerLeft: 0,
          pointerTop: 0
        });
      }
    });

    drake.on('shadow', (item, dropTarget, reference)=> {
      if (!reference || reference && reference.dataset.qid !== '-1') {
        if (drake.copy) {
          Dispatcher.dispatch({
            actionType: ActionTypes.DELETE_QUESTION,
            qid: -1
          });

          data = {
            qid: -1,
            qtype: QuestionTypes[item.textContent],
            refQid: reference ? reference.dataset.qid : null
          }

          Dispatcher.dispatch({
            actionType: ActionTypes.CREATE_QUESTION,
            data
          });
        } else {
          Dispatcher.dispatch({
            actionType: ActionTypes.UPDATE_QUESTION,
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
        actionType: ActionTypes.UPDATE_QUESTION,
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

  render() {
    let questionTypes = Object.keys(QuestionTypes).map((questionType) => <QuestionType key={questionType} typeName={questionType} />);
    return !this.props.error ? (
      <div>
        <div className="pure-g">
          <div className="pure-u-1-5">
            <div className="pure-menu">
              <span className="pure-menu-heading">Question Type</span>
              <ul className="pure-menu-list" ref="questionList">
                {questionTypes}
              </ul>
            </div>
          </div>
          <div className="page-content pure-u-4-5">{this.props.children}</div>
        </div>
        <Footer/>
        <Pointer type={this.state.pointerType} left={this.state.pointerLeft} top={this.state.pointerTop}/>
      </div>
    ) : this.props.children;
  }

}

export default App;
