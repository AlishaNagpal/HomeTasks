import React from 'react';
import { Day } from 'react-native-gifted-chat';
import { Colors, vw, vh } from '../Constants';

export interface Props {
    props: any,
    currentMessage:any
}

export default function DayClass (props:Props) {
    return (
        <Day
            {...props}
            wrapperStyle={{
                backgroundColor: Colors.day,
                paddingVertical: vh(8),
                paddingHorizontal: vw(13),
                borderRadius: vh(5)
            }}
            // @ts-ignore
            currentMessage={{
                createdAt: props.currentMessage.createdAt
            }}
            textStyle={{color: Colors.dayText}}
        />
    )
}
