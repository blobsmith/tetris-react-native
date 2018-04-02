import React  from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';

class PanelLinesRemoved extends React.Component  {

  state = {
    fadeAnim: new Animated.Value(0),
  };
  lastLineNumber = 0;

  constructor(props) {
    super(props);
  }

  render = () => {
    let { fadeAnim } = this.state;
    if (this.lastLineNumber !== null && this.lastLineNumber !== this.props.lineNumberBeforeNextLevel) {
      Animated.sequence(
          [
            Animated.timing(
                this.state.fadeAnim,
                {
                  toValue: 1,
                  duration: 500,
                }
            ),
            Animated.timing(
                this.state.fadeAnim,
                {
                  toValue: 0,
                  duration: 500,
                  delay: 2000,
                }
            )
          ]
      ).start();
    }
    this.lastLineNumber = this.props.lineNumberBeforeNextLevel;

    return (
        <Animated.View style={{borderTopWidth: 2,
          borderBottomWidth: 1,
          zIndex: 200,
          position: 'absolute',
          width: '100%',
          backgroundColor: 'white', opacity: fadeAnim}} >
          <Text style={styles.message} >{this.props.lineNumberBeforeNextLevel} line{this.props.lineNumberBeforeNextLevel > 1?'s':''} before level {this.props.level+1}</Text>
        </Animated.View>
    );
  };
}

const styles = StyleSheet.create({
  panelLineRemoved: {
    borderTopWidth: 2,
    borderBottomWidth: 1,
    zIndex: 200,
    position: 'absolute',
    width: '100%',
    backgroundColor: 'white',
  },
  message: {
    marginLeft: 20,
    width: '100%',
    color: 'black',
    fontSize: 20,
    backgroundColor: 'white',
  },
});

export default PanelLinesRemoved;
