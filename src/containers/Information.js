import React  from 'react';
import { wfSetStateAction } from '../actions';
import { connect } from 'react-redux';
import InformationComponent from "../components/Information";

class Information extends React.Component  {

  bestScoresOnClick = () => {
    this.props.wfSetState('bestScores');
  };

  render() {
    return (
      <InformationComponent playOnClick={this.props.playOnClick} bestScoresOnClick={this.bestScoresOnClick} />
    );
  }
}


const mapDispatchToProps = (dispatch) => {
  return {
    wfSetState: (stateName) => {
      dispatch(wfSetStateAction(stateName));
    },
  }
};

export default connect(null, mapDispatchToProps)(Information);
