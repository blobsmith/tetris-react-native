import React  from 'react';
import { wfSetStateAction } from '../actions';
import { connect } from 'react-redux';

import NavigationComponent from "../components/Navigation";
import {STATE_BEST_SCORE, STATE_INSTRUCTION} from '../reducers/workflow';

class Navigation extends React.Component  {

  instructionOnClick = () => {
    this.props.wfSetState(STATE_INSTRUCTION);
  };

  bestScoresOnClick = () => {
    this.props.wfSetState(STATE_BEST_SCORE);
  };

  render() {
    return (
      <NavigationComponent
        playOnClick={this.props.playOnClick}
        instructionOnClick={this.instructionOnClick}
        bestScoresOnClick={this.bestScoresOnClick}
        wfState={this.props.wfState}
      />
    );
  }
}

const mapStatesToProps = (state) => {
  return {
    wfState: state.wfState,
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    wfSetState: (stateName) => {
      dispatch(wfSetStateAction(stateName));
    },
  }
};

export default connect(mapStatesToProps, mapDispatchToProps)(Navigation);
