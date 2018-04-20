import React from "react";
import { View, FlatList, Text, ScrollView, StyleSheet, Button } from 'react-native';
import Navigation from '../containers/Navigation';

import {globalStyle} from '../Style/globalStyle';

const BestScoreList = (props) => (
    <View style={[globalStyle.pageContainer, styles.highScores]} >
        <Navigation playOnClick={props.playOnClick} />
        <View style={styles.titleContainer} >
            <Text style={styles.title} >Your top 10 high scores</Text>
        </View>
      <ScrollView >
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
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
    },
    titleContainer: {
        height: 30,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 15,
        color: 'white',
    },
});

export default BestScoreList;