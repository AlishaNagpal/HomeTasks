import React from 'react';
import { InputToolbar } from 'react-native-gifted-chat';
import { vh } from '../Constants';

export interface Props {
    props: any,
}

export default function InputToolbarClass(props: Props) {

    return (
        <InputToolbar
            {...props}
            containerStyle={{
                backgroundColor: 'transparent',
                borderTopWidth: 0,
                paddingRight: vh(7.5),
                alignItems: 'center',
                justifyContent: 'center',
                // height: vh(55),
            }}
            primaryStyle={{ alignItems: 'center' }}
        />
    )
}