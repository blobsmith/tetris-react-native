import React from 'react';
import { View, Text, StyleSheet, Image, Linking, ScrollView, Button } from 'react-native';

const Information = ( props ) => (
    <View style={styles.information}  >
        <ScrollView style={styles.contentContainer}>
            <Text style={styles.title} >
                Instructions
            </Text>
            <Text style={styles.list}  >
                - Move you finger right or left to move the piece.
            </Text>
            <Text style={styles.list}  >
                - Move down to make fall down the piece.
            </Text>
            <Text style={styles.list}  >
                - Double tap to rotate the piece.
            </Text>
            <Text style={styles.list}  >
                - Click on play below to start.
            </Text>

            <View style={styles.buttonContainer}>
                <Button
                    onPress={props.playOnClick}
                    title="play"
                    color="#00d8ff"
                />
            </View>

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
    information: {
        padding: 10
    },
    text: {
        fontSize: 14,
        fontWeight: '400',
        marginBottom: 10,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 15,
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
    buttonContainer: {
        marginTop: 20,
        marginBottom: 10,
        backgroundColor: 'black',
        padding: 2
    },
    list: {
        fontSize: 14,
    }
});

export default Information;
