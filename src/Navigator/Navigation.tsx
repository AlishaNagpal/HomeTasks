import 'react-native-gesture-handler';
import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import Home from '../Containers/Home/Home';
import SignUP from '../Containers/SignUp/SignUp'
import Example from '../Containers/SignUp/Example.js';

// console.disableYellowBox = true

const HomeStack = createStackNavigator();
const AuthStack = createStackNavigator();
const RootStack = createStackNavigator();

const AuthNavigator = () => (
  <AuthStack.Navigator headerMode="screen" initialRouteName="SignUP">
    <AuthStack.Screen name="SignUP" component={SignUP} />
  </AuthStack.Navigator>
);

const HomeNavigator = () => (
    <HomeStack.Navigator headerMode="screen" initialRouteName="HOME">
      <HomeStack.Screen name={'HOME'} component={Home} />
      <HomeStack.Screen name={'Example'} component={Example} />
    </HomeStack.Navigator>
);

export interface Props {
  token: string
}

export default class Navigator extends React.PureComponent<Props>  {
  render() {
    return (
      <NavigationContainer>
        <RootStack.Navigator headerMode="none">

          {this.props.token === '' ?
            <RootStack.Screen name="AuthNavigator" component={AuthNavigator} /> :
            <RootStack.Screen name="HomeNavigator" component={HomeNavigator} />}
        </RootStack.Navigator>
      </NavigationContainer>
    )
  }
}
