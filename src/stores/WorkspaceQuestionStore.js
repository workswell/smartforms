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


let CHANGE_EVENT = 'change';

let qid = 1;

let _workspaceQuestions = [];

//Set three default questions
_workspaceQuestions.push({
  type: QuestionTypes.TEXT_INPUT,
  props: {
    qid: qid++,
    label: 'username'
  }
});

_workspaceQuestions.push({
  type: QuestionTypes.PLACEHOLDER,
  props: {
    qid: qid++
  }
});

_workspaceQuestions.push({
  type: QuestionTypes.TEXT_INPUT,
  props: {
    qid: qid++,
    label: 'password',
    type: 'password'
  }
});

/**
 * Create a TODO item.
 * @param  {string} text The content of the TODO
 */
function create(data) {
  let index = _workspaceQuestions.findIndex(item => item.props.qid == data.refQid);

  //console.log('Store.willcreate', data);
  if (index > -1) {
    _workspaceQuestions.splice(index, 0, {
      type: data.qtype,
      props: {
        qid: data.qid || qid++
      }
    });

    //console.log('Store.created');
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
  let index = _workspaceQuestions.findIndex(item => item.props.qid == qid);
  if (index > -1) {
    _workspaceQuestions.splice(index, 1);
    //console.log('Store.destroy');
  }
}

/**
 * Delete all the completed TODO items.
 */
function destroyCompleted() {
  for (var id in _todos) {
    if (_todos[id].complete) {
      destroy(id);
    }
  }
}

var WorkspaceQuestionStore = Object.assign({}, EventEmitter.prototype, {
  /**
   * Get the entire collection of TODOs.
   * @return {object}
   */
  getAll: function() {
    return _workspaceQuestions;
  },

  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  /**
   * @param {function} callback
   */
  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  /**
   * @param {function} callback
   */
  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }
});

// Register callback to handle all updates
Dispatcher.register(function(action) {
  var text;

  switch(action.actionType) {
    case ActionTypes.CREATE_QUESTION:
        if (action.data) {
          create(action.data);
          WorkspaceQuestionStore.emitChange();
        }
      break;
    case ActionTypes.DELETE_QUESTION:
      if (action.qid) {
        destroy(action.qid);
        WorkspaceQuestionStore.emitChange();
      }
    case ActionTypes.UPDATE_QUESTION:
      if (action.data) {
        update(action.data);
        WorkspaceQuestionStore.emitChange();
      }
    default:
      // no op
  }
});

module.exports = WorkspaceQuestionStore;
