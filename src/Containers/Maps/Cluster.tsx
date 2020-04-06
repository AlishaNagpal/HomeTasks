import * as React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import { vh, Colors, vw } from '../../Constants';

export const Cluster = (props: any) => {
    // console.log(props)
  const {count} = props;
  return (
    <View style={styles.viewStyle}>
      <Text>{count}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  viewStyle: {
    width: vh(50),
    height: vh(50),
    borderRadius: vh(25),
    backgroundColor: Colors.white,
    borderColor:Colors.socialColor,
    borderWidth:vw(2),
    justifyContent: 'center',
    alignItems: 'center',
  },
});