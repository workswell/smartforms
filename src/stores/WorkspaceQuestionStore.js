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
    label: 'SELECT-QUESTION'
  }
}


let QUESTION_CHANGE_EVENT = 'question-change',
  SIDEBAR_CHANGE_EVENT = 'sidebar-change',
  qid = 1,
  _workspaceQuestions = [];

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
 * Update a TODO item.
 * @param  {string} id
 * @param {object} updates An object literal containing only the data to be
 *     updated.
 */
function update(data) {
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
 * Update all of the TODO items with the same object.
 * @param  {object} updates An object literal containing only the data to be
 *     updated.
 */
function updateAll(updates) {
  for (var id in _todos) {
    update(id, updates);
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

}

var WorkspaceQuestionStore = Object.assign({}, EventEmitter.prototype, {
  /**
   * Get the entire collection of TODOs.
   * @return {object}
   */
  getAll: function() {
    return _workspaceQuestions;
  },

  /**
   * @param {function} callback
   */
  addChangeListener: function(callback) {
    this.on(QUESTION_CHANGE_EVENT, callback);
  },

  /**
   * @param {function} callback
   */
  removeChangeListener: function(callback) {
    this.removeListener(QUESTION_CHANGE_EVENT, callback);
  }
});

// Register callback to handle all updates
Dispatcher.register(function(action) {
  var text;

  switch(action.actionType) {
    case ActionTypes.CREATE_QUESTION:
        if (action.data) {
          create(action.data);
          WorkspaceQuestionStore.emit(QUESTION_CHANGE_EVENT);
        }
      break;
    case ActionTypes.DELETE_QUESTION:
      if (action.qid) {
        destroy(action.qid);
        WorkspaceQuestionStore.emit(QUESTION_CHANGE_EVENT);
      }
    case ActionTypes.UPDATE_QUESTION:
      if (action.data) {
        update(action.data);
        WorkspaceQuestionStore.emit(QUESTION_CHANGE_EVENT);
      }
    case ActionTypes.SELECTED_QUESTION:
      if (action.props) {
        updateSidebar(action.props);
        WorkspaceQuestionStore.emit(SIDEBAR_CHANGE_EVENT);
      }
    default:
      // no op
  }
});

module.exports = WorkspaceQuestionStore;
