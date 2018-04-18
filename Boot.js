import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducer from './src/reducers'

import App from './src/containers/App';

const store = createStore(reducer);

export default class Boot extends React.Component {

  render() {
    return (
        <Provider store={store}>
          <App />
        </Provider>
    );
  }
}