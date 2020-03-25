import React from 'react';
import { TouchableOpacity, Text, Image, StyleSheet } from 'react-native';
import {vw, vh, Colors } from '../Constants';

export interface ButtonProps {
    styleButton: any,
    pressMethod: any,
    image?: any,
    text: string,
    Social: boolean
}

export default function SocialButtons(props: ButtonProps) {
    if(props.Social){
        return (
            <TouchableOpacity style={props.styleButton} onPress={props.pressMethod} >
                <Image source={props.image} style={styles.imageStyle} />
                <Text style={styles.line} >I</Text>
                <Text style={styles.socialText} > {props.text} </Text>
            </TouchableOpacity>
        )
    }else{
        return(
            <TouchableOpacity style={props.styleButton} onPress={props.pressMethod} >
                <Text style={styles.normalText} > {props.text} </Text>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    imageStyle: {
        marginLeft:vw(22.5),
        marginRight:vw(12.5),
        height:vh(18),
        width:vw(10)
    },
    line:{
        color:Colors.white,
        fontSize:vh(30),
        width:vw(3)
    },
    socialText:{
        color:Colors.white,
        fontFamily:'Poppins-Regular',
        textTransform:'uppercase',
        fontSize:vh(16),
        marginLeft:vw(35)
    },
    normalText:{
        color:Colors.white,
        fontFamily:'Poppins-Regular',
        textTransform:'uppercase',
        fontSize:vh(16)
    }
});
