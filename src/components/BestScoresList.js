import React from "react";
import { View, FlatList, Text, ScrollView, TextInput, StyleSheet, Button } from 'react-native';

import {STATE_SET_SCORE} from '../reducers/workflow'

const BestScoreList = (props) => (
    <View style={styles.highScores} >
        { props.wfState !== STATE_SET_SCORE && <Text style={styles.title} >Your top 10 high scores</Text>}
        { props.wfState === STATE_SET_SCORE && <Text style={styles.title} >New high score</Text>}
        { props.wfState === STATE_SET_SCORE && <View style={styles.yourName}>
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
        </View>}
        <View >
            { props.wfState !== STATE_SET_SCORE &&
            <View>
                <View style={styles.buttonContainer}>
                    <Button
                        onPress={props.playOnClick}
                        title="play"
                        color="#00d8ff"
                    />
                </View>

                <View style={styles.buttonContainer}>
                    <Button
                        onPress={props.instructionOnClick}
                        title="instructions"
                        color="gray"
                    />
                </View>

            </View>
            }
        </View>
      <ScrollView>
        <FlatList
            data={props.sortedScores}
            renderItem={props.rows}
            keyExtractor={item => item.uuid}
        />
      </ScrollView>
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
    buttonContainer: {
        marginTop: 5,
        marginBottom: 5,
        backgroundColor: 'black',
        padding: 2
    },
});

export default BestScoreList;