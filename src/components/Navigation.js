import React from 'react';
import { View, Button, StyleSheet } from 'react-native';

import {STYLE_MENU_COLOR, STYLE_MENU_COLOR_ACTIVE} from '../Style/globalStyle';
import {STATE_BEST_SCORE, STATE_INSTRUCTION} from '../reducers/workflow';
import I18n from '../services/i18n';

const Navigation = ( props ) => (
    <View style={styles.buttonsContainer}>
        <View style={styles.buttonContainer}>
            <Button onPress={props.instructionOnClick}
                    title={I18n.t('instructions')}
                    color={props.wfState === STATE_INSTRUCTION?STYLE_MENU_COLOR_ACTIVE:STYLE_MENU_COLOR}
            />
        </View>
        <View style={styles.buttonContainer}>
            <Button onPress={props.bestScoresOnClick}
                    title={I18n.t('High scores')}
                    color={props.wfState === STATE_BEST_SCORE?STYLE_MENU_COLOR_ACTIVE:STYLE_MENU_COLOR}
            />
        </View>
        <View style={styles.buttonPlayContainer}>
            <Button onPress={props.playOnClick}
                    title={I18n.t('play')}
                    color="gray"
            />
        </View>
    </View>
);

const styles = StyleSheet.create({
    buttonsContainer: {
        height: 30,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        flex: 0.1,
        width: '100%',
    },
    buttonContainer: {
        width: '40%',
        padding: 1,
    },
    buttonPlayContainer: {
        width: '20%',
        padding: 1,
    },
});

export default Navigation;
