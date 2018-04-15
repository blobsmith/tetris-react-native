import React  from 'react';
import { loadScoresAction, wfSetStateAction, wfNextStateAction } from '../actions';
import { connect } from 'react-redux';

import BestScoreRow from "../components/BestScoreRow";
import BestScoresListComponent from "../components/BestScoresList";

import scoreService from '../services/ScoreService';

class BestScoresList extends React.Component  {

  componentWillMount = () => {
    // Loading scoreList from disk
    scoreService.loadBestScoresFromDisk(this.props.loadScores);
  };

  _renderItem = ({ item }) => (
    <BestScoreRow
        position={item.position}
        name={item.name}
        points={item.points}
        level={item.level}
    />
  );

  render() {
    return (
      <BestScoresListComponent
        sortedScores={scoreService.sortScores(this.props.bestScores)}
        rows={this._renderItem}
        playOnClick={this.props.playOnClick}
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
    wfSetState: (stateName) => {
      dispatch(wfSetStateAction(stateName));
    },
    wfSetNextState: () => {
      dispatch(wfNextStateAction());
    },
  }
};

export default connect(mapStatesToProps, mapDispatchToProps)(BestScoresList);
