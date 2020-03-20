import * as React from 'react';
import { View, StyleSheet, Text } from 'react-native';

export interface HomeProps {
}

export interface HomeState {
}

export default class HomeComponent extends React.Component<HomeProps, HomeState> {
  constructor(props: HomeProps) {
    super(props);
    this.state = {
    };
  }

  public render() {
    return (
      <View>
         <Text>Home Component</Text>
      </View>
    );
  }
}
