import React from "react";
import { View, Text, TextInput, StyleSheet } from 'react-native';
import I18n from '../services/i18n';

const EnterYourName = (props) => (
    <View style={styles.highScores} >
        <Text style={styles.title} >{I18n.t('New high score')}</Text>
        <View style={styles.yourName}>
            <TextInput
                underlineColorAndroid='transparent'
                value={ props.textInputValue }
                style={styles.inputName}
                onChangeText={ (text) => props.changeTextInputValue(text) }
                onSubmitEditing={() => props.submitFunction() }
                placeholder={I18n.t('Enter your name')}
                autoFocus={true}
            />
            <Text style={styles.level} >{I18n.t('Level')} {props.level}</Text>
            <Text style={styles.points} >{props.points} {I18n.t('points')}</Text>
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
        borderBottomColor: '#222',
    },
    inputName: {
        fontSize: 18,
        color:  'white',
    },
    points: {
        fontSize: 18,
        color: "white",
        fontWeight: "bold",
        position: 'absolute',
        right: 12,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 15,
        color: 'white',
    },
    level: {
        color: 'gray'
    }
});

export default EnterYourName;