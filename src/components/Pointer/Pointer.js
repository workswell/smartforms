/*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */

import React, { PropTypes } from 'react';
import withStyles from '../../decorators/withStyles';
import styles from './Pointer.css';
import TextBox from '../TextBox';
import SelectList from '../SelectList';
import Placeholder from '../Placeholder';
import QuestionTypes from '../../constants/QuestionTypes';

@withStyles(styles)
class Pointer{
  render() {
    let control,
      divStyle = {
        left: this.props.left,
        top: this.props.top
      };

    switch (this.props.type) {
      case QuestionTypes.TEXT_INPUT:
      control = <TextBox/>
    break;
      case QuestionTypes.SELECT_LIST:
      control = <SelectList/>
    break;
      case QuestionTypes.PLACEHOLDER:
      control = <Placeholder/>
    break;
      default:
      control = <span>Unknown control</span>
      break;
    }

    return <div id="workspace-pointer" className="gu-mirror" style={divStyle}>{control}</div>;
  }
}

export default Pointer;
