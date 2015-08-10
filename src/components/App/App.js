/*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */

import React, { PropTypes } from 'react';
import styles from './App.css';
import withContext from '../../decorators/withContext';
import withStyles from '../../decorators/withStyles';
import Header from '../Header';
import Feedback from '../Feedback';
import Footer from '../Footer';
import { canUseDOM } from 'fbjs/lib/ExecutionEnvironment';

@withContext
@withStyles(styles)
class App {

  static propTypes = {
    children: PropTypes.element.isRequired,
    error: PropTypes.object
  };

  componentDidMount() {
    if (canUseDOM) {
      import dragula from 'react-dragula';
      let container = React.findDOMNode(this.refs.questions);
      dragula([container]);
    }
  }

  render() {
    return !this.props.error ? (
      <div className="mdl-layout mdl-js-layout mdl-layout--fixed-drawer mdl-layout--overlay-drawer-button">
        <div className="mdl-layout__drawer">
          <span className="mdl-layout-title">Question Type</span>
          <nav className="mdl-navigation" ref="questions">
            <a className="mdl-navigation__link" href="">Text input</a>
            <a className="mdl-navigation__link" href="">Select list</a>
          </nav>
        </div>
        <main className="mdl-layout__content">
          <div className="page-content">{this.props.children}</div>
        </main>
        <Footer/>
      </div>
    ) : this.props.children;
  }

}

export default App;
