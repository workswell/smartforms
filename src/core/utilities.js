/*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */

import { canUseDOM } from 'fbjs/lib/ExecutionEnvironment';
import Dispatcher from '../core/Dispatcher';
import ActionTypes from '../constants/ActionTypes';

function dragover(e) {
  if (e.preventDefault) e.preventDefault();
  e.dataTransfer.dropEffect = 'copy';
  Dispatcher.dispatch({
    actionType: ActionTypes.UPDATE_POINTER,
    data: e
  });
  return false;
}

function dragenter(e) {
  this.classList.add('over');
  console.log('dragenter ' +  this.dataset.reactid);
}

function dragleave(e) {
  this.classList.remove('over');
  console.log('dragleave ' + this.dataset.reactid);
}

function drop(e) {
  if (e.preventDefault) e.preventDefault();
  if (e.stopPropagation) e.stopPropagation();

  this.classList.remove('over');
  return false;
}

function $(node) {
  return {
    on() {
      node.addEventListener.apply(node, arguments);
      return this;
    },
    off(){
      node.removeEventListener.apply(node, arguments);
      return this
    }
  }
}

export default {

  dropable(node) {
    $(node)
    .on('dragover', dragover)
    .on('dragenter', dragenter)
    .on('dragleave', dragleave)
    .on('drop', drop);
  },

  undropable (node) {
    $(node)
    .off('dragover', dragover)
    .off('dragenter', dragenter)
    .off('dragleave', dragleave)
    .off('drop', drop);
  }
};
