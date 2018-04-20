import React from 'react';
import { Surface } from 'ReactNativeART';
import { View, StyleSheet, Image } from 'react-native';

import Blocks from '../containers/Blocks';
import Controller from '../containers/Controller';
import GoDownButton from '../containers/GoDownButton';
import RemainingBlocks from '../containers/RemainingBlocks';
import NextShape from '../containers/NextShape';
import BestScoresList from '../containers/BestScoresList';
import EnterYourName from '../containers/EnterYourName';

import Scores from '../components/Scores';
import Information from '../containers/Information';

import { STATE_PLAY, STATE_INSTRUCTION, STATE_BEST_SCORE, STATE_SET_SCORE } from '../reducers/workflow'

const Game = ( props ) => (
    <View style={styles.game} >
        { props.wfState === STATE_PLAY && <NextShape /> }
        { props.wfState === STATE_PLAY &&
            <View style={styles.imageContainer} >
                <View>
                    <Image
                        style={styles.image}
                        source={require('../images/background-image5.png')}
                    />
                    <Surface width={200} height={500} >
                        <Blocks />
                        <RemainingBlocks />
                    </Surface>
                    <Controller />
                </View>
                <GoDownButton />
            </View>
        }
        { props.wfState === STATE_BEST_SCORE && <BestScoresList playOnClick={props.playOnClick} /> }
        { props.wfState === STATE_SET_SCORE && <EnterYourName points={props.points} level={props.level} /> }
        { props.wfState === STATE_PLAY && <Scores points={props.points} level={props.level} lineNumberBeforeNextLevel={props.lineNumberBeforeNextLevel} /> }
        { props.wfState === STATE_INSTRUCTION && <Information playOnClick={props.playOnClick} /> }
    </View>
);

const styles = StyleSheet.create({
    game: {
        width: '100%',
        height: 500,
        flex: 1,
        backgroundColor: 'black',
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
