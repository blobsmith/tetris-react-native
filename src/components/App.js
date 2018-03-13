import React from 'react';
import { View, StyleSheet } from 'react-native';
import Header from './Header';
import Game from '../containers/Game';

const App = ( props ) => (
    <View style={styles.app} >
        <Header />
        <Game style={styles.game} />
    </View>
);

const styles = StyleSheet.create({
    app: {
        flex: 1
    },
    game: {
        backgroundColor: '#fff',
        color: 'white',
        flex: 2,
    },
});

export default App
