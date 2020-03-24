import * as React from 'react';
import { View, Image, Text, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import * as  SocialLogin from '../../Components/SocialLoginHandler';
import { updateToken } from '../../Modules/SignUP/Action'
import styles from './styles'
import LinearGradient from 'react-native-linear-gradient';
import { Colors, VectorIcons, vh, Strings } from '../../Constants';

const colors = [Colors.goldenYellow, Colors.goldenYellow, 'pink', Colors.white, Colors.white]
export default function Home() {

  const { token, result } = useSelector((state: { SignUpReducer: any }) => ({
    token: state.SignUpReducer.token,
    result: state.SignUpReducer.result,
  }));
  const dispatch = useDispatch();

  const logOut = () => {
    SocialLogin.logOut()
    dispatch(updateToken(''))
  };

  return (
    <LinearGradient start={{ x: 1, y: 0 }} end={{ x: 0, y: 1 }} colors={colors} style={styles.container}>
      <Image
        style={styles.image}
        source={{ uri: result.profilePic }}
      />
      <VectorIcons.FontAwesome name={'hand-peace-o'} color={Colors.white} size={vh(80)} style={styles.icon} />
      <Text style={styles.textStyle} >{Strings.Hello}</Text>
      <Text style={styles.textStyle} >{Strings.I_Am}{result.name}</Text>
      <Text style={styles.textStyle} >{Strings.contact}</Text>
      <Text style={styles.email} >{result.email}</Text>
      <VectorIcons.MaterialCommunityIcons name={'spa-outline'} color={Colors.goldenYellow} size={vh(80)} style={styles.icon2} />
      <TouchableOpacity onPress={logOut}>
        <Text style={styles.logOut} >LogOut</Text>
      </TouchableOpacity>
    </LinearGradient>
  );
};
