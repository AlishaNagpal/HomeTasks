import 'react-native-gesture-handler';
import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';

import Home from '../Containers/Home/Home';
import SignUP from '../Containers/SignUp/SignUp'
import Example from '../Containers/SignUp/Example.js';

// console.disableYellowBox = true

const HomeStack = createStackNavigator();

const HomeNavigator = () => (
  <NavigationContainer>
    <HomeStack.Navigator headerMode="screen" initialRouteName="Example">
      <HomeStack.Screen name={'HOME'} component={Home} />
      <HomeStack.Screen name={'SignUP'} component={SignUP} />
      <HomeStack.Screen name={'Example'} component={Example} />
    </HomeStack.Navigator>
  </NavigationContainer>
);

export default HomeNavigator;
