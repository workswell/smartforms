/*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */

import React, { PropTypes } from 'react';
import withStyles from '../../decorators/withStyles';
import styles from './Sidebar.css';
import EventTypes from '../../constants/EventTypes';
import WorkspaceStore from '../../stores/WorkspaceStore';
import TextBox from '../TextBox';
import SortableList from '../SortableList';
import ActionTypes from '../../constants/ActionTypes';
import Dispatcher from '../../core/Dispatcher';

function getSidebarQuestionState () {
  return WorkspaceStore.getSidebarQuestion();
}

const EXCLUDED_PROPS = ['refQid'];
const TEXTBOX_PROPS = ['label', 'placeholder'];
const SORTABLELIST_PROPS = ['options'];

@withStyles(styles)
class Sidebar extends React.Component {
  constructor(props) {
    super(props);
    this.state = getSidebarQuestionState();

    ['_onQuestionChange', '_onTextboxChange'].forEach((func)=>{
      this[func] = this[func].bind(this);
    });
  }

  componentDidMount() {
    WorkspaceStore.on(EventTypes.SIDEBAR_CHANGE_EVENT, this._onQuestionChange);
  }

  componentWillUnmount() {
    WorkspaceStore.removeListener(EventTypes.SIDEBAR_CHANGE_EVENT, this._onQuestionChange);
  }

  _onQuestionChange() {
    this.setState(getSidebarQuestionState());
  }

  _onTextboxChange(e) {
    let cloned = JSON.parse(JSON.stringify(this.state));
    cloned.props[e.target.name] = e.target.value;

    this.setState({
      props: cloned.props
    }, ()=>{
      Dispatcher.dispatch({
        actionType: ActionTypes.UPDATE_SELECTED_QUESTION,
        props: cloned.props
      });
    })
  }

  render() {
  	let item,
      items = Object.keys(this.state.props).filter((key)=> {
      return EXCLUDED_PROPS.indexOf(key) === -1;
    }).map((key)=>{
      if (TEXTBOX_PROPS.indexOf(key) > -1) {
        item = <TextBox qid={-1} label={key} value={this.state.props[key]} onChange={this._onTextboxChange}/>
      } else if (SORTABLELIST_PROPS.indexOf(key) > -1) {
        item = <SortableList list={this.state.props[key]}/>
      } else {
        item = `${key}(${this.state.props[key]})`;
      }
  		return <li key={key}>{item}</li>
  	});
    return (<div className="sidebar">
            <h4>{this.state.type}</h4>
            	<ul>
            		{items}
            	</ul>
        </div>);
  }
}

export default Sidebar;
