import scoreService from '../services/ScoreService';

const bestScoresReducer = (state = [], action) => {
    let newBestScores = state;

    switch(action.type) {
        case 'NEW_SCORE':
            newBestScores = scoreService.addToScoreList(state, action.score);
            scoreService.saveBestScoresToDisk(newBestScores);
            break;

        case 'LOAD_SCORES':
            newBestScores = action.scores;
            break;
    }
    return newBestScores;
};

export default bestScoresReducer;