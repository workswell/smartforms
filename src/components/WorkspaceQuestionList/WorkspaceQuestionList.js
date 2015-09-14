/*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */

import React, { PropTypes } from 'react';
import Dispatcher from '../../core/Dispatcher';
import ActionTypes from '../../constants/ActionTypes';
import styles from './WorkspaceQuestionList.css';
import withStyles from '../../decorators/withStyles';
import QuestionTypes from '../../constants/QuestionTypes';
import TextBox from '../TextBox';
import SelectList from '../SelectList';
import Placeholder from '../Placeholder';
import Handler from '../Handler';
import Actions from '../Actions';

@withStyles(styles)
class WorkspaceQuestionList {
  static propTypes = {
    list: PropTypes.array.isRequired
  }

  handleClick(props) {
    Dispatcher.dispatch({
      actionType: ActionTypes.CHANGE_SELECTED_QUESTION,
      props: props
    });

    Dispatcher.dispatch({
      actionType: ActionTypes.OPEN_SIDEBAR
    });
  }

  handleActionClick(qid) {
    Dispatcher.dispatch({
      actionType: ActionTypes.DELETE_QUESTION,
      qid
    });
  }

  render() {
    let list = this.props.list.map((question, index) => {
      let control = <span>Unknown Question Type</span>;

      switch (question.type) {
        case QuestionTypes.TEXT_INPUT:
        control = <TextBox {...question.props}/>
        break;
        case QuestionTypes.SELECT_LIST:
        control = <SelectList {...question.props}/>
        break;
        case QuestionTypes.PLACEHOLDER:
        control = <Placeholder {...question.props}/>
        break;
        default:
        break;
      }

      return (<div className={'question-wrapper ' + (question.props.qid == -1 ? 'gu-transit' : '')} data-qid={question.props.qid} key={question.props.qid}>
                <Handler/>
                <div className="question-wrapper__question" onClick={this.handleClick.bind(this, question.props)}>{control}</div>
                <Actions handleClick={this.handleActionClick.bind(this, question.props.qid)}/>
              </div>);
    });

    return <div className="workspace-question-list">{list}</div>;
  }

}

export default WorkspaceQuestionList;
