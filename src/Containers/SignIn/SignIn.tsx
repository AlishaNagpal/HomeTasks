import * as React from 'react';
import { View, Text } from 'react-native';
import styles from './styles';

export interface SignINProps {
}

export default function SignINComponent(props: SignINProps) {
    return (
        <View style={styles.container} >
            <Text>SignIN Component</Text>
        </View>
    );
};
