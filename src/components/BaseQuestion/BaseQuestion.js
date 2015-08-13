/*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */

import React, { PropTypes } from 'react';
import { findDOMNode } from 'react-dom';
import Dispatcher from '../../core/Dispatcher';
import ActionTypes from '../../constants/ActionTypes';

function dragover(e) {
  if (e.preventDefault) e.preventDefault();
  e.dataTransfer.dropEffect = 'copy';
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

  Dispatcher.dispatch({
    actionType: ActionTypes.CREATE_QUESTION,
    data: {
      qtype: e.dataTransfer.getData('questionType'),
      qid: this.dataset.qid
    }
  });

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

function dropable(node) {
  $(node)
  .on('dragover', dragover)
  .on('dragenter', dragenter)
  .on('dragleave', dragleave)
  .on('drop', drop);
}

function undropable (node) {
  $(node)
  .off('dragover', dragover)
  .off('dragenter', dragenter)
  .off('dragleave', dragleave)
  .off('drop', drop);
}

class BaseQuestion {
  static propTypes = {
    qid: PropTypes.number.isRequired,
    label: PropTypes.string.isRequired
  }

  componentDidMount() {
    dropable(findDOMNode(this));
  }

  componentWillUnmount() {
    undropable(findDOMNode(this));
  }

  _bind(...methods) {
    methods.forEach( (method) => this[method] = this[method].bind(this) );
  }
}

export default BaseQuestion;
