import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";

export default (BestScoreRow = props => (
    <View style={styles.row}>
        <Text style={styles.position} >{props.position}</Text>
        <View>
            <Text style={styles.primaryText}>
                {props.name}
            </Text>
            <Text style={styles.secondaryText}>Level {props.level}</Text>
        </View>
        <Text style={styles.points} >{props.points} points</Text>
    </View>
));



const styles = StyleSheet.create({
    row: {
        flexDirection: "row",
        alignItems: "center",
        padding: 12,
    },
    position: {
        backgroundColor: 'black',
        color: 'white',
        width: 50,
        height: 50,
        borderRadius: 25,
        borderStyle: 'solid',
        borderColor: '#00d8ff',
        borderWidth: 2,
        marginRight: 18,
        paddingLeft: 20,
        paddingTop: 10,
        fontWeight: 'bold',
        fontSize: 18,
    },
    primaryText: {
        fontWeight: "bold",
        fontSize: 16,
        color: "black",
        marginBottom: 4
    },
    secondaryText: {
        color: "grey"
    },
    points: {
        position: 'absolute',
        right: 12,
        fontSize: 18,
        color: "black",
        fontWeight: "bold",
    },
});