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
        this.xStart = evt.nativeEvent.locationX;
      },
      onPanResponderMove: (evt, gestureState) => {
        if (this.xStart != 0) {

          const diff = evt.nativeEvent.locationX - this.xStart;

          // Go right
          if (diff > 0) {
            if (this.action === 'RIGHT') {
              if ( diff > 14) {
                this.xStart = evt.nativeEvent.locationX;
                this.props.goRight(this.props.gameArea, this.props.shapeCoordinate);
              }
            }
            else {
              this.xStart = evt.nativeEvent.locationX;
            }
            this.action = 'RIGHT';
          }

          // Go left
          if (diff < 0) {
            if (this.action === 'LEFT') {
              if ( diff  < -14) {
                this.xStart = evt.nativeEvent.locationX;
                this.props.goLeft(this.props.gameArea, this.props.shapeCoordinate);
              }
            }
            else {
              this.xStart = evt.nativeEvent.locationX;
            }
            this.action = 'LEFT';
          }
        }

      },

      onPanResponderRelease: (evt, gestureState) => {
        this.xStart = 0;
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
