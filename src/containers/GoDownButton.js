import React  from 'react';
import { goDownAction } from '../actions';
import { connect } from 'react-redux';

import { View, PanResponder, StyleSheet, Image, Text } from 'react-native';

class GoDownButton extends React.Component  {

  componentWillMount () {
    this.pressed = false;
    this.panResponder = PanResponder.create({

      // Ask to be the responder:
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
      onMoveShouldSetPanResponder: (evt, gestureState) => true,
      onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,

      onPanResponderMove: (evt, gestureState) => {
        this.props.goDown(this.props.gameArea, this.props.shapeCoordinate);
      },
    });
  }

  render() {
    return (
      <View style={styles.button} {...this.panResponder.panHandlers} >
        <Text style={styles.text} >FALL DOWN</Text>
        <Image style={styles.image} source={require('../images/fall-down-bar.png')} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    position: 'absolute',
    width: 70,
    height: 350,
    zIndex: 31,
    bottom: 60,
    left: 20,
  },
  image: {
    zIndex: 29,
  },
  text: {
    zIndex: 40,
    top: 103,
    left: -103,
    position: 'absolute',
    transform: [{ rotate: '90deg'}],
    color: 'white',
    fontWeight: 'bold',
    fontSize: 30,
    height: 150,
    width: 170,
  },
});

const mapStatesToProps = (state) => {
  return {
    shapeCoordinate: state.shapeCoordinate,
    gameArea: state.area,
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    goDown: (gameArea, shapeCoordinate) => {
      dispatch(goDownAction(gameArea, shapeCoordinate));
    },
  }
};

export default connect(mapStatesToProps, mapDispatchToProps)(GoDownButton);
