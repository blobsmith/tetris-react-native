import React  from 'react';
import { rotateAction, goLeftAction, goRightAction, goDownAction } from '../actions';
import { connect } from 'react-redux';

import { View, PanResponder, StyleSheet } from 'react-native';

class Controller extends React.Component  {

  componentWillMount () {
    this.action = '';
    this.xStart = 0;
    this.lastTouch = 0;

    this.panResponder = PanResponder.create({

      // Ask to be the responder:
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
      onMoveShouldSetPanResponder: (evt, gestureState) => true,
      onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,

      onPanResponderGrant: (evt, gestureState) => {
        this.lastTouch = evt.nativeEvent.timestamp;
      },
      onPanResponderMove: (evt, gestureState) => {

        // Go right
        if (gestureState.vx > 0) {
          if (this.action === 'RIGHT') {
            if ( (gestureState.moveX - this.xStart) > 7) {
              this.xStart = gestureState.moveX;
              this.props.goRight(this.props.gameArea, this.props.shapeCoordinate);
            }
          }
          else {
            this.xStart = gestureState.moveX;
          }
          this.action = 'RIGHT';
        }

        // Go left
        if (gestureState.vx < 0) {
          if (this.action === 'LEFT') {
            if ( (this.xStart - gestureState.moveX)  > 7) {
              this.xStart = gestureState.moveX;
              this.props.goLeft(this.props.gameArea, this.props.shapeCoordinate);
            }
          }
          else {
            this.xStart = gestureState.moveX;
          }
          this.action = 'LEFT';
        }
      },

      onPanResponderRelease: (evt, gestureState) => {
        if ((evt.nativeEvent.timestamp - this.lastTouch) < 100) {
          this.props.rotate(this.props.gameArea, this.props.coordinates, this.props.shape);
        }
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
    zIndex: 10,
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
