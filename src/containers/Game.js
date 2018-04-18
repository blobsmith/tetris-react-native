import React from 'react';
import GameComponent from '../components/Game';
import { AppState } from 'react-native';
import {
    newShapeAction, nextShapeAction,
    goDownAction, newGameAction,
    insertShapeInAreaAction, removingWholeLinesAction,
    wfSetStateAction, wfNextStateAction
} from '../actions';
import { connect } from 'react-redux';
import blockManagement from '../services/BlockService';
import gameStat from '../services/GameStatService';

import {STATE_PLAY} from '../reducers/workflow'

class Game extends React.Component {

    // Game states
    INIT_POINTS = 0;
    INIT_DELAY = 500;
    INIT_LEVEL = 1;
    LINE_NUMBER_TO_CHANGE_LEVEL = 15;
    DELAI_IN_MS_TO_ACCELERATE = 20;

    state = {
        points: this.INIT_POINTS,
        appState: AppState.currentState,
        timer: false,
        level: this.INIT_LEVEL,
        lineNumberBeforeNextLevel: this.LINE_NUMBER_TO_CHANGE_LEVEL,
        totalLineRemoved: 0,
        delay: this.INIT_DELAY,
    };

    constructor(props) {
        super(props);

        this.props.wfSetState('instruction');

        // Set a new shape.
        this.props.newShape(blockManagement.getShapeRandomly());
        this.props.setNextShape(blockManagement.getShapeRandomly());

        this.props.newGame();
    }

    prepareNewShape = () => {
        // Save last shape coordinates to the map
        this.props.saveShapeInMap(this.props.shapeCoordinate, this.props.coordinate);

        // Check for removing whole lines
        gameStat.resetStats();
        this.props.removingWholeLines(this.props.gameArea, gameStat);
        gameStat.performStats();

        // Update level if needed.
        this.manageLevel(gameStat);

        // Update user points if needed.
        this.managePoints(gameStat);

        // Create a new shape. (use assign to copy the shape)
        this.props.newShape(Object.assign({}, this.props.nextShape));
        this.props.setNextShape(blockManagement.getShapeRandomly());
    };

    managePoints = (gameStat) => {
        const points = gameStat.getPoints();
        if (points > 0){
            this.setState({
                points: this.state.points + points
            });
        }
    };

    manageLevel = (gameStat) => {
        let lineNumberBeforeNextLevel = this.state.lineNumberBeforeNextLevel - gameStat.countRemoved;
        let level = this.state.level;
        const totalLineRemoved = this.state.totalLineRemoved + gameStat.countRemoved;
        if (lineNumberBeforeNextLevel <= 0) {
            lineNumberBeforeNextLevel = this.state.lineNumberBeforeNextLevel + this.LINE_NUMBER_TO_CHANGE_LEVEL - gameStat.countRemoved;
            level = level + 1;
        }
        const delay = this.INIT_DELAY - level * this.DELAI_IN_MS_TO_ACCELERATE;
        const changeDelay = delay !== this.state.delay;
        this.setState({
            lineNumberBeforeNextLevel: lineNumberBeforeNextLevel,
            level: level,
            delay: delay,
            totalLineRemoved: totalLineRemoved,
        });
        if (changeDelay) {
            this.setGameLooper(delay);
        }
    };

    componentWillUnmount = () => {
        AppState.removeEventListener('change', this._handleAppStateChange);
    };

    componentDidMount = () => {
        AppState.addEventListener('change', this._handleAppStateChange);
    };

    setGameLooper = (delay = null) => {
        let self = this;
        if (!delay) {
            delay = self.state.delay;
        }
        if (this.state.timer) {
            clearTimeout(this.state.timer);
        }
        const timerID = setInterval(function() {
            if (self.props.wfState === STATE_PLAY && self.state.appState === 'active') {
                const coordinate = self.props.coordinate;
                self.props.goDown(self.props.gameArea, self.props.shapeCoordinate);

                // If the shape can't go down, it's time to next shape.
                if (coordinate.y === self.props.coordinate.y) {
                    self.prepareNewShape();

                    // If last coordinates are the same than shape coordinate at the beginning, it's game over.
                    if (coordinate.y === self.props.coordinate.y) {
                        clearTimeout(self.state.timer);
                        self.props.wfSetNextState(self.props.bestScores, self.state.points);
                    }
                }
            }
        }, delay);
        this.setState({timer: timerID});
    };

    _handleAppStateChange = (nextAppState) => {
        if (nextAppState !== 'active' && this.state.timer) {
            clearTimeout(this.state.timer);
        }
        else {
            this.setGameLooper();
        }
        this.setState({
            appState: nextAppState
        });
    };

    playOnClick = () => {
        this.props.newGame();
        this.setState({
            points: this.INIT_POINTS,
            level: this.INIT_LEVEL,
            lineNumberBeforeNextLevel: this.LINE_NUMBER_TO_CHANGE_LEVEL,
            totalLineRemoved: 0,
            delay: this.INIT_DELAY,
        });
        this.props.wfSetState('play');
        this.setGameLooper(this.INIT_DELAY);
    };

    render() {
        return (
            <GameComponent
                points={this.state.points}
                level={this.state.level}
                lineNumberBeforeNextLevel={this.state.lineNumberBeforeNextLevel}
                wfState={this.props.wfState}
                playOnClick={this.playOnClick}
            />
        );
    }
}

const mapStatesToProps = (state) => {
    return {
        coordinate: state.coordinate,
        shapeCoordinate: state.shapeCoordinate,
        gameArea: state.area,
        shape: state.shape,
        nextShape: state.nextShape,
        bestScores: state.bestScores,
        wfState: state.wfState,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        newGame: () => {
            dispatch(newGameAction());
        },
        newShape: (shape) => {
            dispatch(newShapeAction(shape));
        },
        setNextShape: (shape) => {
            dispatch(nextShapeAction(shape));
        },
        goDown: (gameArea, shapeCoordinate) => {
            dispatch(goDownAction(gameArea, shapeCoordinate));
        },
        saveShapeInMap: (shapeCoordinate, coordinate) => {
            dispatch(insertShapeInAreaAction(shapeCoordinate, coordinate));
        },
        removingWholeLines: (gameArea, results) => {
            dispatch(removingWholeLinesAction(gameArea, results));
        },
        wfSetNextState: (bestScores = false, points = false) => {
            dispatch(wfNextStateAction(bestScores, points));
        },
        wfSetState: (stateName) => {
            dispatch(wfSetStateAction(stateName));
        },
    }
};

export default connect(mapStatesToProps, mapDispatchToProps)(Game);
