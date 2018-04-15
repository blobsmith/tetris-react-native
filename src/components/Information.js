import React from 'react';
import { View, Text, StyleSheet, Image, Linking, ScrollView, Button } from 'react-native';

import Navigation from '../containers/Navigation';

import {globalStyle} from '../Style/globalStyle';

const Information = ( props ) => (
    <View style={globalStyle.pageContainer}  >
        <Navigation playOnClick={props.playOnClick} />
        <ScrollView style={styles.contentContainer}>
            <Text style={styles.title} >
                Instructions
            </Text>
            <Text style={styles.list}  >
                - Move your finger right or left to move the piece.
            </Text>
            <Text style={styles.list}  >
                - Ride down on the "fall down" bar to go down the piece.
            </Text>
            <Text style={styles.list}  >
                - Simple tap on the game area to rotate the piece.
            </Text>
            <Text style={styles.list}  >
                - Click on play above to start.
            </Text>

            <Text style={styles.title} >
                Application details
            </Text>

            <Text style={styles.text} >
                This is my Hello world application. It has been build with React Native.
            </Text>
            <Text style={styles.text} >
               The aim of this application is to verify that code of a React web application (and Redux) can be reused
                (with small changes in interface components) in a React Native mobile application.
            </Text>
            <Text style={styles.link} onPress={() => Linking.openURL('https://github.com/blobsmith/tetris-react-native')} >
                Full code of this mobile application
            </Text>
            <Text style={styles.link} onPress={() => Linking.openURL('https://github.com/blobsmith/tetris')} >
                Full code of the React web application
            </Text>
            <Text style={styles.link} onPress={() => Linking.openURL('https://www.linkedin.com/in/gilbertolivier/')} >
                You can contact me on LinkedIn
            </Text>
        </ScrollView>
    </View>
);

const styles = StyleSheet.create({
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 15,
        marginTop: 10,
    },
    text: {
        fontSize: 14,
        fontWeight: '400',
        marginBottom: 10,
    },
    link: {
        fontSize: 14,
        marginBottom: 5,
        marginTop: 5,
        color: 'blue'
    },
    contentContainer: {
        height: '100%'
    },
    buttonsContainer: {
        height: 30,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        flex: 0.1,
        width: '100%',
    },
    buttonContainer: {
        width: '33%',
        padding: 1,
    },
    button: {
        width: '100%'
    },
    list: {
        fontSize: 14,
    }
});

export default Information;
