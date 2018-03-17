import React  from 'react';
import { rotateAction, goLeftAction, goRightAction, goDownAction } from '../actions';
import { connect } from 'react-redux';

import { View, PanResponder, StyleSheet } from 'react-native';

class Controller extends React.Component  {

  componentWillMount () {
    this.lastXMove = 0;
    this.lastYMove = 0;
    this.lastTouch = 0;
    this.panResponder = PanResponder.create({

      // Ask to be the responder:
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
      onMoveShouldSetPanResponder: (evt, gestureState) => true,
      onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,

      onPanResponderGrant: (evt, gestureState) => {
        if ((evt.nativeEvent.timestamp - this.lastTouch) < 200) {
          this.props.rotate(this.props.gameArea, this.props.coordinates, this.props.shape);
        }
        this.lastTouch = evt.nativeEvent.timestamp;
      },
      onPanResponderMove: (evt, gestureState) => {
        const moveYDiff = gestureState.dy-this.lastYMove;
        const moveXDiff = gestureState.dx-this.lastXMove;

        // Go down
        if (moveYDiff > 2 && Math.abs(gestureState.dy) > 20) {
          this.props.goDown(this.props.gameArea, this.props.shapeCoordinate);
        }

        // Go right or left

        if (Math.abs(gestureState.moveX) > 10 && Math.abs(gestureState.dx) > 20) {
          // Go right
          if (moveXDiff > 6) {
            this.props.goRight(this.props.gameArea, this.props.shapeCoordinate);
          }

          // Go left
          if (moveXDiff < -6) {
            this.props.goLeft(this.props.gameArea, this.props.shapeCoordinate);
          }
        }
        this.lastXMove = gestureState.dx;
        this.lastYMove = gestureState.dy;
      },
    });
  }

  render() {
    return (
        <View
            style={styles.controller}
            {...this.panResponder.panHandlers}
        />
    );
  }
}

const styles = StyleSheet.create({
  controller: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    top: 0,
    left: 0,
    zIndex: 10
  },
});

const mapStatesToProps = (state) => {
  return {
    shapeCoordinate: state.shapeCoordinate,
    gameArea: state.area,
    coordinates: state.coordinate,
    shape: state.shape
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    rotate: (gameArea, coordinate, shape) => {
      dispatch(rotateAction(gameArea, coordinate, shape));
    },
    goLeft: (gameArea, shapeCoordinate) => {
      dispatch(goLeftAction(gameArea, shapeCoordinate));
    },
    goRight: (gameArea, shapeCoordinate) => {
      dispatch(goRightAction(gameArea, shapeCoordinate));
    },
    goDown: (gameArea, shapeCoordinate) => {
      dispatch(goDownAction(gameArea, shapeCoordinate));
    },
  }
};

export default connect(mapStatesToProps, mapDispatchToProps)(Controller);
