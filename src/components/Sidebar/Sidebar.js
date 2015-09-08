/*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */

import React, { PropTypes } from 'react';
import withStyles from '../../decorators/withStyles';
import styles from './Sidebar.css';
import EventTypes from '../../constants/EventTypes';
import WorkspaceStore from '../../stores/WorkspaceStore';

function getSidebarQuestionState () {
  return WorkspaceStore.getSidebarQuestion();
}

@withStyles(styles)
class Sidebar extends React.Component{
	 constructor(props) {
    super(props);
    this.state = {
      question: getSidebarQuestionState(),
    };

    this._onQuestionChange = this._onQuestionChange.bind(this);
  }

  componentDidMount() {
    WorkspaceStore.addChangeListener(this._onQuestionChange);
  }

  componentWillUnmount() {
    WorkspaceStore.removeListener(Eventypes.SIDEBAR_CHANGE_EVENT, this._onQuestionChange);
  }

  _onQuestionChange() {
    this.setState({
      question: getSidebarQuestionState()
    });
  }

  render() {
  	var items = Object.keys(this.state.props).forEach((item)=>{
  		return <li>{item}({ this.state.props[item]})</li>
  	});
    return (<div className="sidebar">
            <h4>{this.state.type}</h4>
            <p>
            	<ul>
            		{items}
            	</ul>
            </p>
        </div>);
  }
}

export default Sidebar;
