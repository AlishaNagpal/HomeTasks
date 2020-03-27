import React, { useState} from 'react';
import {TouchableOpacity } from 'react-native';
import { Colors, vh, VectorIcons } from '../Constants';

export interface HeartProps {
    isCheck: boolean,
    clicked: Function,
    id: number,
    style:any
}

export default function CheckBox(props: HeartProps) {
    const [isCheck, setisCheck] = useState(props.isCheck);

    const checkClicked = async (value: boolean) => {
        await setisCheck(value)
        props.clicked && props.clicked(props.id, isCheck);
    }

    return (
        <TouchableOpacity onPress={() => checkClicked(!isCheck)} style={props.style}>
            <VectorIcons.AntDesign size={vh(20)} name={isCheck ? 'heart' : 'hearto'} color={isCheck ? Colors.heart : Colors.unHeart} />
        </TouchableOpacity>
    )
}
