import React from 'react';
import GameComponent from '../components/Game';

import { newShapeAction, goDownAction, newGameAction, insertShapeInAreaAction, removingWholeLinesAction } from '../actions';
import { connect } from 'react-redux';
import blockManagement from '../services/BlockService';
import gameStat from '../services/GameStatService';

class Game extends React.Component {

    constructor(props) {
        super(props);

        // Game states
        this.PLAY = 'play';
        this.GAME_OVER = 'gameOver';
        this.INIT_POINTS = 0;

        this.state = {
            points: this.INIT_POINTS,
            gameState: this.GAME_OVER,
            started: false
        };

        // Set a new shape.
        this.props.newShape(blockManagement.getShapeRandomly());

        // Set a new game.
        this.props.newGame();
    }

    prepareNewShape() {
        // Save last shape coordinates to the map
        this.props.saveShapeInMap(this.props.shapeCoordinate, this.props.coordinate);

        // Check for removing whole lines
        gameStat.resetStats();
        this.props.removingWholeLines(this.props.gameArea, gameStat);
        gameStat.performStats();
        const points = gameStat.getPoints();

        // Update user points
        if (points > 0){
            this.setState({
                points: this.state.points + points
            });
        }

        // Create a new shape.
        this.props.newShape(blockManagement.getShapeRandomly());
    }

    componentDidMount() {
        var self = this;
        self.timerID = setInterval(function() {
            if (self.state.gameState === self.PLAY) {
                const coordinate = self.props.coordinate;
                self.props.goDown(self.props.gameArea, self.props.shapeCoordinate);

                // If the shape can't go down, it's time to next shape.
                if (coordinate.y === self.props.coordinate.y) {
                    self.prepareNewShape.apply(self);

                    // If last coordinates are the same than shape coordinate at the beginning, it's game over.
                    if (coordinate.y === self.props.coordinate.y) {
                        self.setState({gameState: self.GAME_OVER});
                    }
                }
            }
        }, 500);
    }

    playOnClick = () => {
        this.props.newGame();
        this.setState({
            points: this.INIT_POINTS,
            gameState: this.PLAY,
            started: true
        });
    };

    render() {
        return (
            <GameComponent
                gameState={this.state.gameState}
                points={this.state.points}
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
        shape: state.shape
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
