import * as React from 'react';
import { View, Text } from 'react-native';
import styles from './styles';
import { VectorIcons, Colors, vh, Strings } from '../../Constants';

export default function NotMuchComponen() {
    return (
        <View style={styles.container} >
            <VectorIcons.Fontisto name={'heart-alt'} color={Colors.white} size={vh(150)} />
            <Text style={styles.exercise} >{Strings.love}</Text>
        </View>
    );
}

