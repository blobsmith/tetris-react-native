import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducer from './src/reducers'

import AppComponent from './src/components/App';

const store = createStore(reducer);

export default class App extends React.Component {

  render() {
    return (
        <Provider store={store}>
          <AppComponent />
        </Provider>
    );
  }
}