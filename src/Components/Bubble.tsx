import React from 'react';
import { Bubble } from 'react-native-gifted-chat';
import { Colors, vw, VectorIcons, vh } from '../Constants';

export interface Props {
    props: any
}

export default function Chat(props: Props) {

    const renderTick = () => {
        return (
            <VectorIcons.FontAwesome5 name={props.currentMessage.messageRead ? 'check-double' : 'check'} color="lightgray" size={vh(12)} style={{ right: vw(5) }} />
        )
    }

    return (
        <Bubble
            {...props}
            // @ts-ignore
            wrapperStyle={{
                left: {
                    backgroundColor: Colors.white,
                    borderRadius: vw(0),
                    borderBottomEndRadius: vw(10),
                    borderBottomLeftRadius: vw(10),
                    borderTopRightRadius: vw(10)
                },
                right: {
                    backgroundColor: Colors.socialColor,
                    borderRadius: vw(0),
                    borderBottomEndRadius: vw(10),
                    borderBottomLeftRadius: vw(10),
                    borderTopLeftRadius: vw(10)
                }
            }}
            renderTicks={renderTick}
        />
    );
}
