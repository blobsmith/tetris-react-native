import React from 'react';
import GameComponent from '../components/Game';
import { AppState } from 'react-native';
import { newShapeAction, nextShapeAction, goDownAction, newGameAction, insertShapeInAreaAction, removingWholeLinesAction } from '../actions';
import { connect } from 'react-redux';
import blockManagement from '../services/BlockService';
import gameStat from '../services/GameStatService';

class Game extends React.Component {

    // Game states
    PLAY = 'play';
    GAME_OVER = 'gameOver';
    INIT_POINTS = 0;
    INIT_DELAY = 500;
    LINE_NUMBER_TO_CHANGE_LEVEL = 15;
    DELAI_IN_MS_TO_ACCELERATE = 20;

    state = {
        points: this.INIT_POINTS,
        gameState: this.GAME_OVER,
        started: false,
        appState: AppState.currentState,
        timer: false,
        level: 1,
        lineCounter: 0,
        delay: this.INIT_DELAY,
        lastDelay: 0,
    };

    constructor(props) {
        super(props);

        // Set a new shape.
        this.props.newShape(blockManagement.getShapeRandomly());
        this.props.setNextShape(blockManagement.getShapeRandomly());

        // Set a new game.
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


        // Create a new shape.
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
        const totalLinesRemoved = gameStat.countRemoved + this.state.lineCounter;
        const level = Math.floor(totalLinesRemoved / this.LINE_NUMBER_TO_CHANGE_LEVEL);
        const delay = this.INIT_DELAY - level * this.DELAI_IN_MS_TO_ACCELERATE;
        this.setState({
            lineCounter: totalLinesRemoved,
            level: level + 1,
            delay: delay,
        });
        if (this.state.lastDelay !== this.state.delay) {
            this.state.lastDelay = this.state.delay;
            clearTimeout(this.state.timer);
            this.setGameLooper();
        }
    };

    componentWillUnmount = () => {
        AppState.removeEventListener('change', this._handleAppStateChange);
    };

    componentDidMount = () => {
        AppState.addEventListener('change', this._handleAppStateChange);
    };

    setGameLooper = () => {
        let self = this
        const timerID = setInterval(function() {
            if (self.state.gameState === self.PLAY && self.state.appState === 'active') {
                const coordinate = self.props.coordinate;
                self.props.goDown(self.props.gameArea, self.props.shapeCoordinate);

                // If the shape can't go down, it's time to next shape.
                if (coordinate.y === self.props.coordinate.y) {
                    self.prepareNewShape();

                    // If last coordinates are the same than shape coordinate at the beginning, it's game over.
                    if (coordinate.y === self.props.coordinate.y) {
                        self.setState({gameState: self.GAME_OVER});
                    }
                }
            }
        }, self.state.delay);
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
            gameState: this.PLAY,
            started: true,
            delay: this.INIT_DELAY,
            lastDelay: 0,
        });
    };

    render() {
        return (
            <GameComponent
                gameState={this.state.gameState}
                points={this.state.points}
                level={this.state.level}
                playOnClick={this.playOnClick}
                started={this.state.started}
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
        nextShape: state.nextShape
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
        }
    }
};

export default connect(mapStatesToProps, mapDispatchToProps)(Game);
