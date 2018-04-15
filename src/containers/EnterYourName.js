import React  from 'react';
import { newScoreAction, wfNextStateAction } from '../actions';
import { connect } from 'react-redux';
import scoreService from '../services/ScoreService';
import EnterYourNameComponent from '../components/EnterYourName';

class EnterYourName extends React.Component  {

  state = {
    textinput: '',
  };

  _saveScore = () => {
    if (this.state.textinput !== ''){
      // addNewScore

      const score = scoreService.createScore(this.state.textinput, this.props.points, this.props.level);
      this.props.addNewScore(score);
      this.props.wfSetNextState();
    }
  };

  _changeTextInputValue = (text) => {
    this.setState({
      textinput: text
    });
  };

  render() {
    return (
      <EnterYourNameComponent
        textInputValue={this.state.textinput}
        submitFunction={this._saveScore}
        changeTextInputValue={this._changeTextInputValue}
        points={this.props.points}
        level={this.props.level}
      />
    );
  }
}

const mapStatesToProps = (state) => {
  return {
    bestScores: state.bestScores,
    wfState: state.wfState,
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    addNewScore: (score) => {
      dispatch(newScoreAction(score));
    },
    wfSetNextState: () => {
      dispatch(wfNextStateAction());
    },
  }
};

export default connect(mapStatesToProps, mapDispatchToProps)(EnterYourName);
