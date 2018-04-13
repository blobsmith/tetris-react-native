import React  from 'react';
import { loadScoresAction, newScoreAction, wfSetStateAction, wfNextStateAction } from '../actions';
import { connect } from 'react-redux';
import BestScoreRow from "../components/BestScoreRow";
import BestScoresListComponent from "../components/BestScoresList";
import scoreService from '../services/ScoreService';

class BestScoresList extends React.Component  {

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

    // Save user name if needed

  };

  _changeTextInputValue = (text) => {
    this.setState({
      textinput: text
    });
  };

  _renderItem = ({ item }) => (
    <BestScoreRow
        position={item.position}
        name={item.name}
        points={item.points}
        level={item.level}
    />
  );

  instructionOnClick = () => {
    this.props.wfSetState('instruction');
  };

  componentWillMount = () => {
    // Loading scoreList from disk
    scoreService.loadBestScoresFromDisk(this.props.loadScores);
  };

  render() {

    return (
      <BestScoresListComponent
        wfState={this.props.wfState}
        textInputValue={this.state.textinput}
        submitFunction={this._saveScore}
        changeTextInputValue={this._changeTextInputValue}
        sortedScores={scoreService.sortScores(this.props.bestScores)}
        rows={this._renderItem}
        playOnClick={this.props.playOnClick}
        instructionOnClick={this.instructionOnClick}
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
    loadScores: (scores) => {
      dispatch(loadScoresAction(scores));
    },
    addNewScore: (score) => {
      dispatch(newScoreAction(score));
    },
    wfSetState: (stateName) => {
      dispatch(wfSetStateAction(stateName));
    },
    wfSetNextState: () => {
      dispatch(wfNextStateAction());
    },
  }
};

export default connect(mapStatesToProps, mapDispatchToProps)(BestScoresList);
