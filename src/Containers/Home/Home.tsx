import * as React from 'react';
import { View, Image, Text, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import * as  SocialLogin from '../../Components/SocialLoginHandler';
import { updateToken } from '../../Modules/SignUP/Action'
import styles from './styles'

export interface HomeProps { }

export default function Home(props: HomeProps) {

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
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={{ uri: result.profilePic }}
      />
      <Text style={styles.textStyle} >{result.name}</Text>
      <Text style={styles.email} >{result.email}</Text>
      <TouchableOpacity onPress={logOut}>
        <Text style={styles.logOut} >LogOut</Text>
      </TouchableOpacity>
    </View>
  );
};
