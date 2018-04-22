import React  from 'react';
import { goDownAction } from '../actions';
import { connect } from 'react-redux';

import { View, PanResponder, StyleSheet, Image, Text } from 'react-native';

import {STYLE_REACT_COLOR} from '../Style/globalStyle';
import I18n from '../services/i18n';

class GoDownButton extends React.Component  {

  componentWillMount () {
    this.pressed = false;
    this.panResponder = PanResponder.create({

      // Ask to be the responder:
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
      onMoveShouldSetPanResponder: (evt, gestureState) => true,
      onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,

      onPanResponderGrant: (evt, gestureState) => {
        this.pressed = true;
        this.props.goDown(this.props.gameArea, this.props.shapeCoordinate);
      },

      onPanResponderRelease: (evt, gestureState) => {
        this.pressed = false;
      },
      onPanResponderMove: (evt, gestureState) => {
        this.props.goDown(this.props.gameArea, this.props.shapeCoordinate);
      },
    });
  }

  render() {
    return (
    <View style={styles.goDownContainer} {...this.panResponder.panHandlers} >
      <Text style={styles.fallText} >{I18n.t('FALL')}</Text>
      <Text style={styles.downText} >{I18n.t('DOWN')}</Text>
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
    bottom: 20,
    right: 2,
  },
  image: {
    zIndex: 29,
  },
  goDownContainer: {
    backgroundColor: 'black',
    width: 80,
    height: 80,
    borderRadius: 40,
    borderStyle: 'solid',
    borderColor: STYLE_REACT_COLOR,
    borderWidth: 2,
    position: 'absolute',
    left: 2,
  },
  fallText: {
    position: 'absolute',
    top: 12,
    left: I18n.t('FALL_LEFT'),
    fontWeight: 'bold',
    fontSize: 18,
    color: 'white',
  },
  downText: {
    position: 'absolute',
    top: 32,
    left: I18n.t('DOWN_LEFT'),
    fontWeight: 'bold',
    fontSize: 18,
    color: 'white',
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
