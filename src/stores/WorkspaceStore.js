/*
 * Copyright (c) 2014, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * TodoStore
 */

import { EventEmitter } from 'events';
import Dispatcher from '../core/Dispatcher';
import EventTypes from '../constants/EventTypes';
import ActionTypes from '../constants/ActionTypes';
import QuestionTypes from '../constants/QuestionTypes';

const DEFAULT_PROPS = {
  [QuestionTypes.TEXT_INPUT]: {
    label: 'TEXT-QUESTION',
    placeholder: 'TEXT-QUESTION'
  },
  [QuestionTypes.PLACEHOLDER]: {
    label: 'PLACEHOLDER-QUESTION'
  },
  [QuestionTypes.SELECT_LIST]: {
    label: 'SELECT-QUESTION',
    options: ['Option One', 'Option Two', 'Option Three']
  }
}


let qid = 1,
  _workspaceQuestions = [],
  _selectedQuestion;

//***********************************************************
//Bootstrap data (WILL BE MOVED OUT FROM STORE)             *
//***********************************************************
//Set three default questions
create({
  qtype: QuestionTypes.TEXT_INPUT,
  props: {
    label: 'username',
    placeholder: 'username'
  }
});

create({
  qtype: QuestionTypes.PLACEHOLDER
});

create({
  qtype: QuestionTypes.TEXT_INPUT,
  props: {
    label: 'password',
    placeholder: 'password',
    type: 'password'
  }
});

create({
  qtype: QuestionTypes.SELECT_LIST
});

_selectedQuestion = _workspaceQuestions[0];
//***********************************************************
//Bootstrap data (WILL BE MOVED OUT FROM STORE)             *
//***********************************************************

function __findIndex(qid) {
  return _workspaceQuestions.findIndex(item => item.props.qid == qid);
}

/**
 * Create a TODO item.
 * @param  {string} text The content of the TODO
 */
function create(data) {
  let index,
    newQuestion = {
      type: data.qtype,
      props: Object.assign({}, DEFAULT_PROPS[data.qtype], data.props)
    };

  if (!newQuestion.props.qid) newQuestion.props.qid = qid++;

  if (newQuestion.props.refQid) {
    index = __findIndex(newQuestion.props.refQid);
    if (index > -1) {
      _workspaceQuestions.splice(index, 0, newQuestion);
    }
  } else {
    _workspaceQuestions.push(newQuestion);
  }
}

/**
 * UpdatePosition a TODO item.
 * @param  {string} id
 * @param {object} updates An object literal containing only the data to be
 *     updated.
 */
function updatePosition(data) {
  if (data.qid === -1) {
    let index = __findIndex(-1);
    if (index > -1) _workspaceQuestions[index].props.qid = qid++;
  } else {
    let index = __findIndex(+data.qid);
    if (index > -1) {
      let item = _workspaceQuestions.splice(index, 1);
      if (item.length === 1) {
        if (data.refQid) {
          index = __findIndex(+data.refQid);
          if (index > -1) _workspaceQuestions.splice(index, 0, item[0]);
        } else {
          _workspaceQuestions.push(item[0]);
        }
      }
    }
  }
}

/**
 * Delete a TODO item.
 * @param  {string} id
 */
function destroy(qid) {
  let index = __findIndex(qid);
  if (index > -1) {
    _workspaceQuestions.splice(index, 1);
    //console.log('Store.destroy');
  }
}

function updateSidebar(props) {
  let index = __findIndex(+props.qid);
  if (index > -1) {
    _selectedQuestion = _workspaceQuestions[index];
  }
}

function updateSelectedQuestion (props) {
  Object.assign(_selectedQuestion.props, props);
}

var WorkspaceStore = Object.assign({}, EventEmitter.prototype, {
  /**
   * Get the entire collection of TODOs.
   * @return {object}
   */
  getQuestions: function() {
    return _workspaceQuestions;
  },

  getSidebarQuestion: function () {
    return _selectedQuestion;
  },

  /**
   * @param {function} callback
   */
  addChangeListener: function(callback) {
    this.on(EventTypes.QUESTION_CHANGE_EVENT, callback);
  },

  /**
   * @param {function} callback
   */
  removeChangeListener: function(callback) {
    this.removeListener(EventTypes.QUESTION_CHANGE_EVENT, callback);
  }
});

// Register callback to handle all updates
Dispatcher.register(function(action) {
  var text;

  switch(action.actionType) {
    case ActionTypes.CREATE_QUESTION:
        if (action.data) {
          create(action.data);
          WorkspaceStore.emit(EventTypes.QUESTION_CHANGE_EVENT);
        }
      break;
    case ActionTypes.DELETE_QUESTION:
      if (action.qid) {
        destroy(action.qid);
        WorkspaceStore.emit(EventTypes.QUESTION_CHANGE_EVENT);
      }
    case ActionTypes.UPDATE_QUESTION_POSITION:
      if (action.data) {
        updatePosition(action.data);
        WorkspaceStore.emit(EventTypes.QUESTION_CHANGE_EVENT);
      }
    case ActionTypes.CHANGE_SELECTED_QUESTION:
      if (action.props) {
        updateSidebar(action.props);
        WorkspaceStore.emit(EventTypes.SIDEBAR_CHANGE_EVENT);
      }
    case ActionTypes.UPDATE_SELECTED_QUESTION:
      if (action.props) {
        updateSelectedQuestion(action.props);
        WorkspaceStore.emit(EventTypes.QUESTION_CHANGE_EVENT);
      }
    default:
      // no op
  }
});

module.exports = WorkspaceStore;
