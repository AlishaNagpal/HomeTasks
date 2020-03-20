import 'react-native-gesture-handler';
import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';

import Home from '../Containers/Home/Home';

// console.disableYellowBox = true

const HomeStack = createStackNavigator();

const HomeNavigator = () => (
  <NavigationContainer>
    <HomeStack.Navigator headerMode="screen" initialRouteName="BallComponent">
      <HomeStack.Screen name={'HOME'} component={Home} />
    </HomeStack.Navigator>
  </NavigationContainer>
);

export default HomeNavigator;
