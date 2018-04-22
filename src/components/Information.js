import React from 'react';
import { View, Text, StyleSheet, Image, Linking, ScrollView, Button } from 'react-native';

import Navigation from '../containers/Navigation';

import {globalStyle} from '../Style/globalStyle';
import I18n from '../services/i18n';

const Information = ( props ) => (
    <View style={globalStyle.pageContainer}  >
        <Navigation playOnClick={props.playOnClick} />
        <ScrollView style={styles.contentContainer}>
            <Text style={styles.title} >
                {I18n.t('Instructions')}
            </Text>
            <Text style={styles.list}  >
                - {I18n.t('Move your finger right or left')}
            </Text>
            <Text style={styles.list}  >
                - {I18n.t('Push the "fall down" button')}
            </Text>
            <Text style={styles.list}  >
                - {I18n.t('Simple tap on the game area')}
            </Text>
            <Text style={styles.list}  >
                - {I18n.t('Click on play')}
            </Text>

            <Text style={styles.titleDetail} >
                {I18n.t('Application details')}
            </Text>

            <Text style={styles.text} >
                {I18n.t('This is my Hello world')}
            </Text>
            <Text style={styles.text} >
                {I18n.t('See the full code of this app')}
            </Text>
            <View style={styles.linkContainer}>
                <Text style={styles.link} onPress={() => Linking.openURL('https://github.com/blobsmith/tetris-react-native')} >
                    {I18n.t('Full code of this mobile application')}
                </Text>
                <Text style={styles.link} onPress={() => Linking.openURL('https://github.com/blobsmith/tetris')} >
                    {I18n.t('Full code of the React web application')}
                </Text>
                <Text style={styles.link} onPress={() => Linking.openURL('https://www.linkedin.com/in/gilbertolivier/')} >
                    {I18n.t('You can contact me')}
                </Text>
            </View>
        </ScrollView>
    </View>
);

const styles = StyleSheet.create({
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 15,
        color: 'white',
    },
    titleDetail: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 15,
        marginTop: 15,
        color: 'white',
    },
    text: {
        fontSize: 14,
        fontWeight: '400',
        marginBottom: 10,
        color: 'white',
    },
    link: {
        fontSize: 14,
        marginBottom: 5,
        marginTop: 5,
        color: 'blue'
    },
    contentContainer: {
        height: '100%'
    },
    buttonsContainer: {
        height: 30,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        flex: 0.1,
        width: '100%',
    },
    buttonContainer: {
        width: '33%',
        padding: 1,
    },
    button: {
        width: '100%'
    },
    list: {
        fontSize: 14,
        color: 'white',
    },
    linkContainer: {
      backgroundColor: 'white',
      borderRadius: 6,
      padding: 8,
    },
});

export default Information;
