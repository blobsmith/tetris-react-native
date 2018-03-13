import React from 'react';
import { Surface } from 'ReactNativeART';
import { View, StyleSheet, Image } from 'react-native';

import Blocks from '../containers/Blocks';
import Controller from '../containers/Controller';
import RemainingBlocks from '../containers/RemainingBlocks';

import Scores from '../components/Scores';
import Information from '../components/Information';

const Game = ( props ) => (
    <View style={styles.game} >
        <View style={styles.imageContainer} >
            <View>
                <Image
                    style={styles.image}
                    source={require('../images/background-image5.png')}
                />
                <Surface width={200} height={500}  >
                    <Blocks />
                    <RemainingBlocks />
                </Surface>
            </View>
            <Controller />
        </View>
        <Scores points={props.points} style={styles.score} />
    </View>
);

const styles = StyleSheet.create({
    game: {
        width: '100%',
        height: 500,
        flex: 1,
    },
    imageContainer: {
        flex: 1,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center'
    },
    image: {
        position: 'absolute'
    }
});

export default Game;
