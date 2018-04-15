import React from "react";
import { View, Text, TextInput, StyleSheet } from 'react-native';

const EnterYourName = (props) => (
    <View style={styles.highScores} >
        <Text style={styles.title} >New high score</Text>
        <View style={styles.yourName}>
            <TextInput
                underlineColorAndroid='transparent'
                value={ props.textInputValue }
                style={styles.inputName}
                onChangeText={ (text) => props.changeTextInputValue(text) }
                onSubmitEditing={() => props.submitFunction() }
                placeholder="Enter your name"
                autoFocus={true}
            />
            <Text >Level {props.level}</Text>
            <Text style={styles.points} >{props.points} points</Text>
        </View>
    </View>
);

const styles = StyleSheet.create({
    highScores: {
        padding: 10
    },
    yourName: {
        zIndex: 10,
        paddingBottom: 10,
        borderStyle: 'solid',
        borderBottomWidth: 2,
        borderBottomColor: 'black',
    },
    inputName: {
        fontSize: 18,
    },
    points: {
        fontSize: 18,
        color: "black",
        fontWeight: "bold",
        position: 'absolute',
        right: 12,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 15,
    },
});

export default EnterYourName;