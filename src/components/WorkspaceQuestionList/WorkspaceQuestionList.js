/*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */

import React, { PropTypes } from 'react';
import styles from './WorkspaceQuestionList.css';
import withStyles from '../../decorators/withStyles';
import QuestionTypes from '../../constants/QuestionTypes';
import TextBox from '../TextBox';
import SelectList from '../SelectList';
import Placeholder from '../Placeholder';

@withStyles(styles)
class WorkspaceQuestionList {
  static propTypes = {
    list: PropTypes.array.isRequired
  }

  render() {
    let list = this.props.list.map(function (question, index) {
      let control = <span>Unknown Question Type</span>;

      switch (question.type) {
        case QuestionTypes.TEXT_INPUT:
        control = <TextBox {...question.props}/>
        break;
        case QuestionTypes.SELECT_LIST:
        control = <SelectList {...question.props}/>
        case QuestionTypes.PLACEHOLDER:
        control = <Placeholder {...question.props}/>
        default:
        break;
      }

      return control;
    });

    return <div className="workspace-question-list">{list}</div>;
  }

}

export default WorkspaceQuestionList;
