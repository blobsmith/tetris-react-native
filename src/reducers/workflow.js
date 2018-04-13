import scoreService from '../services/ScoreService';

export const STATE_PLAY = 'play';
export const STATE_INSTRUCTION = 'instruction';
export const STATE_BEST_SCORE = 'bestScores';
export const STATE_SET_SCORE = 'setScore';
export const STATE_APP_START = '';

const states = [
    STATE_APP_START,
    STATE_PLAY,
    STATE_INSTRUCTION,
    STATE_BEST_SCORE,
    STATE_SET_SCORE
];

export const workflowReducer = (state = '', action) => {
    let nextState = state;
    switch(action.type) {

        case 'WF_NEXT_STATE':
            switch(state) {
                case STATE_APP_START:
                    nextState = STATE_INSTRUCTION;
                    break;

                case STATE_PLAY:
                    nextState = STATE_BEST_SCORE;
                    if (action.bestScores !== false && action.points !== false) {
                        if (scoreService.canPutToScoreList(action.bestScores, action.points)) {
                            nextState = STATE_SET_SCORE;
                        }
                    }
                    break;

                case STATE_SET_SCORE:
                    nextState = STATE_BEST_SCORE;
                    break;
            }
            break;

        case 'WF_SET_STATE':
            if (states.indexOf(action.state) !== -1) {
                nextState = action.state;
            }
            break;
    }
    return nextState;
};