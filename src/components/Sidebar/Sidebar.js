/*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */

import React, { PropTypes } from 'react';
import withStyles from '../../decorators/withStyles';
import styles from './Sidebar.css';
import EventTypes from '../../constants/EventTypes';
import WorkspaceStore from '../../stores/WorkspaceStore';
import TextBox from '../TextBox';

function getSidebarQuestionState () {
  return WorkspaceStore.getSidebarQuestion();
}

const EXCLUDED_PROPS = ['refQid'];
const TEXTBOX_PROPS = ['label', 'placeholder'];

@withStyles(styles)
class Sidebar extends React.Component {
  constructor(props) {
    super(props);
    this.state = getSidebarQuestionState();

    this._onQuestionChange = this._onQuestionChange.bind(this);
    this._onTextboxChange = this._onTextboxChange.bind(this);
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

  _onTextboxChange() {

  }

  render() {
  	let item,
      items = Object.keys(this.state.props).filter((key)=> {
      return EXCLUDED_PROPS.indexOf(key) === -1;
    }).map((key)=>{
      if (TEXTBOX_PROPS.indexOf(key) > -1) {
        item = <TextBox qid="-1" label={key} value={this.state.props[key]} onChange={this._onTextboxChange}/>
      } else {
        item = `${key}(${this.state.props[key]})`;
      }
  		return <li>{item}</li>
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
