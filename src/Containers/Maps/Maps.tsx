import * as React from 'react';
import { View, Text } from 'react-native';
import styles from './styles';

export interface MapsProps {
}

export interface MapsState {
}

export default class MapsComponent extends React.Component<MapsProps, MapsState> {
  constructor(props: MapsProps) {
    super(props);
    this.state = {
    };
  }

  public render() {
    return (
      <View style={styles.container} >
         <Text>Maps Component</Text>
      </View>
    );
  }
}
