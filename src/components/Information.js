import React from 'react';
import { View, Text, StyleSheet, Image, Linking } from 'react-native';

const Information = ( props ) => (
    <View style={styles.information}  >
        <View style={styles.container} >

            <Text style={styles.text} >
                Hi, this is my Hello world application. It has been build with React Native.
            </Text>
            <Text style={styles.text} >
               The aim of this application is to verify that code of a React web application (and Redux) can be reused
                (with small changes in interface components) in a React Native mobile application.
            </Text>
            <Text style={styles.text} >
                Full code of this mobile application:
                <Text style={styles.link} onPress={() => Linking.openURL('https://github.com/blobsmith/tetris-react-native')} >
                    https://github.com/blobsmith/tetris-react-native
                </Text>
            </Text>
            <Text style={styles.text} >
                Full code of the React web application:
                <Text style={styles.link} onPress={() => Linking.openURL('https://github.com/blobsmith/tetris')} >
                    https://github.com/blobsmith/tetris
                </Text>
            </Text>
            <Text style={styles.text} >
                Demo of the React web app:
                <Text style={styles.link} onPress={() => Linking.openURL('https://blobsmith.github.io/tetris/')} >
                    https://blobsmith.github.io/tetris/
                </Text>
            </Text>
            <Text style={styles.text} >
                You can contact me on LinkedIn:
                <Text style={styles.link} onPress={() => Linking.openURL('https://www.linkedin.com/in/gilbertolivier/')} >
                    https://www.linkedin.com/in/gilbertolivier/
                </Text>
            </Text>
            <Text style={styles.link} onPress={props.playOnClick} >
                Play a New Game
            </Text>
        </View>
    </View>
);

const styles = StyleSheet.create({
    information: {
        margin: 20
    },
    container: {
    },
    text: {
        fontSize: 18,
        marginBottom: 20,
        fontWeight: '400',
    },
    link: {
        marginBottom: 5,
        marginTop: 5,
        color: 'blue'
    },
});

export default Information;
