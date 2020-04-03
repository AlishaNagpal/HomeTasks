import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import Navigation from './src/Navigator/index';
import { store, persistor } from './src/Reducer/index';
import { PersistGate } from 'redux-persist/es/integration/react';
import SplashScreen from 'react-native-splash-screen';
import AsyncStorage from '@react-native-community/async-storage';

export default function App() {
  useEffect(() => {
    SplashScreen.hide();
    // AsyncStorage.clear()
  });
  
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Navigation />
      </PersistGate>
    </Provider>
  );
}
