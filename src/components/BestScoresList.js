import React from "react";
import { View, FlatList, Text, ScrollView, StyleSheet, Button } from 'react-native';

const BestScoreList = (props) => (
    <View style={styles.highScores} >
        <Text style={styles.title} >Your top 10 high scores</Text>
        <View >
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