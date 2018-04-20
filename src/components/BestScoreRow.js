import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";

import {STYLE_REACT_COLOR} from '../Style/globalStyle';

export default (BestScoreRow = props => (
    <View style={styles.row}>
        <View style={styles.position} >
            { props.position > 9 && <Text style={[styles.positionText, styles.twoDigit]} >{props.position}</Text>}
            { props.position <= 9 && <Text style={[styles.positionText, styles.oneDigit]} >{props.position}</Text>}
        </View>
        <View>
            <Text style={styles.primaryText} color="white">
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
        width: 50,
        height: 50,
        borderRadius: 25,
        borderStyle: 'solid',
        borderColor: STYLE_REACT_COLOR,
        borderWidth: 2,
        marginRight: 18,
    },
    oneDigit: {
        right: 17,
    },
    twoDigit: {
        right: 12,
    },
    positionText: {
        position: 'absolute',
        top: 9,
        fontWeight: 'bold',
        fontSize: 18,
        color: 'white',
    },
    primaryText: {
        color: 'white',
        fontWeight: "bold",
        fontSize: 16,
        marginBottom: 4,
        zIndex: 300,
    },
    secondaryText: {
        color: "grey"
    },
    points: {
        position: 'absolute',
        right: 12,
        fontSize: 18,
        color: "white",
        fontWeight: "bold",
    },
});