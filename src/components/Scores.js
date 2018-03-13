import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Scores = ( props ) => (
    <View style={styles.container}>
        <View style={styles.panel}>
            <Text style={styles.label} >Your Score</Text>
            <Text style={styles.points} >{props.points}</Text>
        </View>
    </View>
);

const styles = StyleSheet.create({
    container: {
        height: 100,
        width: '100%',
        backgroundColor: '#222',
        paddingLeft: 20
    },
    panel: {
        flex: 1,
        flexDirection: 'row',
        height: 100,
    },
    points: {
        flex: 2,
        color: 'white',
        width: 100,
        fontSize: 20,
        fontWeight: 'bold',
    },
    label: {
        flex: 1,
        color: 'white',
        width: 100,
        fontSize: 20,
    },
});


export default Scores
