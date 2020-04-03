import React from 'react';
import { Composer } from 'react-native-gifted-chat';
import { Colors, vw, Strings } from '../Constants';


export interface Props {
    props: any
}

export default function ComposerClass(props: Props) {

    return (
        <Composer
            {...props}
            placeholder={Strings.typeMsg}
            textInputStyle={{
                fontSize: vw(14),
                height: vw(45),
                alignSelf: 'center',
                borderRadius: vw(5),
                alignItems: 'center',
                backgroundColor: Colors.white,
                paddingTop: vw(10),
                paddingLeft: vw(10),
                paddingRight: vw(10),
                paddingBottom: vw(10),
            }}
        />
    )
}
