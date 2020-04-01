import * as React from 'react';
import { View, Image, Text, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import styles from './styles'
import { Colors, VectorIcons, vh, Strings } from '../../Constants';

export default function Home() {

  const { token, result } = useSelector((state: { SignUpReducer: any }) => ({
    token: state.SignUpReducer.token,
    result: state.SignUpReducer.result,
  }));
  const dispatch = useDispatch();

  return (
    <View style={styles.container}>
        <Text> Profile </Text>
    </View>
  );
};
