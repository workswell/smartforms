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
import QuestionType from'../QuestionType';
import QuestionTypes from '../../constants/QuestionTypes';
import ActionTypes from '../../constants/ActionTypes';
import Dispatcher from '../../core/Dispatcher';

@withContext
@withStyles(styles)
class App {

  static propTypes = {
    children: PropTypes.element.isRequired,
    error: PropTypes.object
  };

  componentDidMount() {
    let data,
      drake = dragula({
      containers: [findDOMNode(this.refs.questionList), document.getElementsByClassName('workspace-question-list')[0]],
      copy: true
    });

    drake.on('shadow', (item, dropTarget, reference)=> {
      console.log('shadow');
      if (reference && reference.dataset.qid !== '-1') {
        Dispatcher.dispatch({
          actionType: ActionTypes.DELETE_QUESTION,
          qid: -1
        });

        console.log('Dispatcher.DELETE_QUESTION');

        data = {
          qid: -1,
          qtype: QuestionTypes[item.textContent],
          refQid: reference.dataset.qid
        }

        Dispatcher.dispatch({
          actionType: ActionTypes.CREATE_QUESTION,
          data
        });

        console.log('Dispatcher.CREATE_QUESTION');
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
  }

  render() {
    let questionTypes = Object.keys(QuestionTypes).map((questionType) => <QuestionType key={questionType} typeName={questionType} />);
    return !this.props.error ? (
      <div>
        <div className="pure-g">
          <div className="pure-u-1-5">
            <div class="pure-menu">
              <span className="pure-menu-heading">Question Type</span>
              <ul class="pure-menu-list" ref="questionList">
                {questionTypes}
              </ul>
            </div>
          </div>
          <div className="page-content">{this.props.children}</div>
        </div>
        <Footer/>        
      </div>
    ) : this.props.children;
  }

}

export default App;
