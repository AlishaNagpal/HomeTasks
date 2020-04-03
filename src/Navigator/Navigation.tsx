import 'react-native-gesture-handler';
import * as React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { vh, Colors, Images, vw, VectorIcons } from '../Constants';


import Home from '../Containers/Home/Home';
import SignUP from '../Containers/SignUp/SignUp';
import Splash from '../Containers/Splash/Splash';
import NotMuch from '../Containers/NotMuch/NotMuch';
import NotMuch2 from '../Containers/NotMuch/NotMuch2';
import LogOut from '../Components/LogOut';
import TutorialScreen from '../Containers/TutorialScreen/TutorialScreen';
import SignIn from '../Containers/SignIn/SignIn';
import ForgotPassword from '../Containers/ForgotPassword/ForgotPassword';
import VerificationCode from '../Containers/VerificationCode/VerificationCode';
import ResetPassword from '../Containers/ResetPassword/ResetPassword';
import VerifiedSuccesfully from '../Containers/VerifiedSuccesfully/VerifiedSuccesfully';
import ResetSuccess from '../Containers/PasswordResetSucces/PasswordResetSucces';
import Maps from '../Containers/Maps/Maps';
import Profile from '../Containers/Profile/Profile';
import Chat from '../Containers/Chat/Chat';
import ChatRoom from '../Containers/Chat/ChatRoom/ChatRoom';
import UserListing from '../Containers/Chat/UserListing/UserListing';

console.disableYellowBox = true

const HomeStack = createStackNavigator();
const AuthStack = createStackNavigator();
const RootStack = createStackNavigator();
const SplashStack = createStackNavigator();
const Drawer = createDrawerNavigator();
const BottomTab = createBottomTabNavigator();
const TopTab = createMaterialTopTabNavigator();
const ChatStack = createStackNavigator();

const NotMuchNavigator = () => (
  <TopTab.Navigator
    // style={{ marginTop: vh(25) }}
    tabBarOptions={{
      activeTintColor: Colors.brown,
      inactiveTintColor: Colors.gray,
      labelStyle: { fontSize: vh(20), marginTop: vh(30) },
      style: { height: 100 }
    }} >
    <TopTab.Screen
      name={'NotMuch'}
      component={NotMuch}
      options={{ title: 'Exercise' }}
    />
    <TopTab.Screen
      name={'NotMuch2'}
      component={NotMuch2}
      options={{ title: 'Love' }}
    />
  </TopTab.Navigator>
);



const HomeNavigator = () => (
  <HomeStack.Navigator headerMode="screen" initialRouteName="HOME">
    <HomeStack.Screen name={'HOME'} component={Home} options={{ headerShown: false }} />
  </HomeStack.Navigator>
);



function ChatNavigator({ navigation, route }) {
  navigation.setOptions({ tabBarVisible: route.state ? route.state.index > 0 ? false : true : null });
  return (
    <ChatStack.Navigator headerMode="screen" initialRouteName="UserListing">
      <ChatStack.Screen name={'Chat'} component={Chat} options={{ headerShown: false }} />
      <ChatStack.Screen name={'Chatroom'} component={ChatRoom} options={{ headerShown: false }} />
      <ChatStack.Screen name={'UserListing'} component={UserListing} options={{ headerShown: false }} />
    </ChatStack.Navigator>
  )
};

const HomeBottomNavigator = () => (
  <BottomTab.Navigator
    tabBarOptions={{
      activeTintColor: Colors.white,
      inactiveTintColor: Colors.inactiveIconColor,
      // labelStyle: { fontSize: vh(22) },
      showIcon: true,
      showLabel: false
    }}
  >
    <BottomTab.Screen
      name={'Home'}
      component={HomeNavigator}
      options={{
        // title: 'Home',
        tabBarIcon: ({ focused }) => (
          focused ?
            <View style={styles.viewStyle} >
              <Image
                source={Images.homePageIcon} resizeMode='contain'
                style={styles.icon}
              />
            </View>
            : <View style={styles.viewStyleDisabled}  >
              <Image
                source={Images.homePageDisableIcon} resizeMode='contain'
                style={styles.icon}
              />
            </View>
        ),
      }}
    />
    {/* <BottomTab.Screen
      name={'NotMuch'}
      component={NotMuchNavigator}
      options={{ title: 'Advice' }}
    /> */}
    <BottomTab.Screen
      name={'Maps'}
      component={Maps}
      options={{
        tabBarIcon: ({ focused }) => (
          focused ?
            <View style={styles.viewStyle} >
              <Image
                source={Images.mapPageIcon} resizeMode='contain'
                style={styles.icon}
              />
            </View>
            : <View style={styles.viewStyleDisabled}  >
              <Image
                source={Images.mapPageDisableIcon} resizeMode='contain'
                style={styles.icon}
              />
            </View>
        ),
      }}
    />
    <BottomTab.Screen
      name={'Profile'}
      component={Profile}
      options={{
        tabBarIcon: ({ focused }) => (
          <View style={focused ? styles.viewStyle : styles.viewStyleDisabled}>
            <VectorIcons.Fontisto name={'person'} size={vh(28)} color={focused ? Colors.white : Colors.inactiveIconColor} style={styles.center} />
          </View>
        ),
      }}
    />
    <BottomTab.Screen
      name={'ChatTab'}
      component={ChatNavigator}
      options={{
        tabBarIcon: ({ focused }) => (
          <View style={focused ? styles.viewStyle : styles.viewStyleDisabled}>
            <VectorIcons.Ionicons name={'ios-chatbubbles'} size={vh(28)} color={focused ? Colors.white : Colors.inactiveIconColor} style={styles.center} />
          </View>
        ),
      }}
    />
  </BottomTab.Navigator >
);

const FullHomeNavigator = () => (
  <Drawer.Navigator>
    <Drawer.Screen
      name={'MainHome'}
      component={HomeBottomNavigator}
      options={{ title: 'Home' }}
    />
    <Drawer.Screen
      name={'LogOut'}
      component={LogOut}
      options={{ title: 'LogOut' }}
    />
  </Drawer.Navigator>
);

const AuthNavigator = () => (
  <AuthStack.Navigator headerMode="screen" initialRouteName="TutorialScreen">
    <AuthStack.Screen name="TutorialScreen" component={TutorialScreen} options={{
      headerShown: false
    }} />
    <AuthStack.Screen name="SignUP" component={SignUP} options={{
      headerShown: false
    }} />
    <AuthStack.Screen name="SignIn" component={SignIn} options={{
      headerShown: false
    }} />
    <AuthStack.Screen name="ForgotPassword" component={ForgotPassword} options={{
      headerShown: false
    }} />
    <AuthStack.Screen name="VerificationCode" component={VerificationCode} options={{
      headerShown: false
    }} />
    <AuthStack.Screen name="ResetPassword" component={ResetPassword} options={{
      headerShown: false
    }} />
    <AuthStack.Screen name="VerifiedSuccesfully" component={VerifiedSuccesfully} options={{
      headerShown: false
    }} />
    <AuthStack.Screen name="ResetSuccess" component={ResetSuccess} options={{
      headerShown: false
    }} />
  </AuthStack.Navigator>
);

const SplashNavigator = () => (
  <SplashStack.Navigator headerMode="screen" initialRouteName="Splash">
    <SplashStack.Screen name={'Splash'} component={Splash} options={{ headerShown: false }} />
  </SplashStack.Navigator>
);

export interface Props {
  token: string,
  splashRan: boolean,
}

export default class Navigator extends React.PureComponent<Props>  {
  render() {
    // return (
    //   <NavigationContainer>
    //     <RootStack.Navigator headerMode="none">
    //       <RootStack.Screen name="NotMuch" component={UserListing} />
    //     </RootStack.Navigator>
    //   </NavigationContainer>
    // )

    if (this.props.splashRan) {
      return (
        <NavigationContainer>
          <RootStack.Navigator headerMode="none">
            {this.props.token === '' ?
              <RootStack.Screen name="AuthNavigator" component={AuthNavigator} /> :
              <RootStack.Screen name="HomeNavigator" component={FullHomeNavigator} />}
          </RootStack.Navigator>
        </NavigationContainer>
      )
    } else {
      return (
        <NavigationContainer>
          <RootStack.Navigator headerMode="none">
            <RootStack.Screen name="SplashNavigator" component={SplashNavigator} />
          </RootStack.Navigator>
        </NavigationContainer>
      )
    }

  }
}

const styles = StyleSheet.create({
  icon: {
    height: vh(55),
    width: vw(45),
  },
  viewStyle: {
    alignItems: 'center',
    marginTop: vh(25),
    height: vh(60),
    width: vh(60),
    borderRadius: vh(30),
    backgroundColor: Colors.socialColor,
    shadowColor: Colors.gray,
    shadowRadius: vh(10),
    shadowOpacity: 2,
    justifyContent: 'center',
  },
  viewStyleDisabled: {
    alignItems: 'center',
    marginTop: vh(25),
    height: vh(60),
    width: vh(60),
    borderRadius: vh(30),
    shadowColor: Colors.gray,
    shadowRadius: vh(10),
    shadowOpacity: 2,
    backgroundColor: Colors.white,
    justifyContent: 'center',
  },
  center: {
    alignSelf: 'center'
  }
})