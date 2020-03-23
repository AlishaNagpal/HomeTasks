import React, {Component} from 'react';
import {Provider} from 'react-redux';
import Navigation from './src/Navigator/index';
import {store, persistor} from './src/Reducer/index';
import {PersistGate} from 'redux-persist/es/integration/react';

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Navigation />
        </PersistGate>
      </Provider>
    );
  }
}
