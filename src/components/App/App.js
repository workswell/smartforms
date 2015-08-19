/*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */

import React, { PropTypes } from 'react';
import { findDOMNode } from 'react-dom';
import dragula from 'dragula';
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

    drake.on('drop', (item) => {
      data = {
        qid: item.nextElementSibling.childNodes[1].dataset.qid,
        qtype: QuestionTypes[item.text]
      }
    })

    drake.on('dragend', () => {
      Dispatcher.dispatch({
        actionType: ActionTypes.CREATE_QUESTION,
        data
      });
    })
  }

  render() {
    let questionTypes = Object.keys(QuestionTypes).map((questionType) => <QuestionType key={questionType} typeName={questionType} />);
    return !this.props.error ? (
      <div className="mdl-layout mdl-js-layout mdl-layout--fixed-drawer mdl-layout--overlay-drawer-button">
        <div className="mdl-layout__drawer">
          <span className="mdl-layout-title">Question Type</span>
          <nav className="mdl-navigation question-list" ref="questionList">
            {questionTypes}
          </nav>
        </div>
        <main className="mdl-layout__content">
          <div className="page-content">{this.props.children}</div>
        </main>
        <Footer/>
      </div>
    ) : this.props.children;
  }

}

export default App;
