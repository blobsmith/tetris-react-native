import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

const Information = ( props ) => (
    <View style={styles.information} className={props.class} >
        <View style={styles.container} >

            <Text style={styles.text} >
                Hi, this is my Hello world application. It has been build with React.
                I already developed with jQuery, Backbone or Angular but React is (in my point of view) the best way to develop a JavaScript web app.<br /><br />
                You can >stay in touch
                &nbsp;or you can play a New Game
            </Text>
            <View style={styles.image}>
                <Image source={require('../images/qrcode.png')} />
            </View>
        </View>
    </View>
);

const styles = StyleSheet.create({
    information: {
    },
    container: {
    },
    text: {
    },
    button: {
    },
    link: {
    },
    image: {
    },
});

export default Information;
