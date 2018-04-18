import React  from 'react';
import { wfSetStateAction } from '../actions';
import { connect } from 'react-redux';
import InformationComponent from "../components/Information";

class Information extends React.Component  {

  render() {
    return (
      <InformationComponent playOnClick={this.props.playOnClick} />
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
