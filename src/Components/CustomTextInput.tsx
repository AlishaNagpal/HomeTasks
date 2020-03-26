import React from 'react';
import { TextInput } from 'react-native';

export interface AppProps {
    value: any,
    style: any,
    _handleFocus?: any,
    _handleBlur?: any,
    attrName: any,
    updateMasterState: Function,
    keyboardType: any,
    placeholderStyle: string,
    returnKeyType: any,
    otherTextInputProps?: object,
    onSubmitEditing: any,
    ref?: any;
    secureTextEntry: any,
    onKeyPress?:any
};

const TextField = React.forwardRef((props: AppProps, ref) => {
    const _onChangeText = (updatedValue: any) => {
        const { attrName, updateMasterState } = props;
        updateMasterState(attrName, updatedValue);
    }

    const handleOnSubmitEditing = () => {
        if (props.onSubmitEditing)
            props.onSubmitEditing()
    }

    const handleOnFocus = () => {
        if (props._handleFocus)
        props._handleFocus()
    }
    const handleOnBlur = () => {
        if (props._handleBlur)
        props._handleBlur()
    }

    const handleonKeyPress = (event:any, ref:any) => {
        if (props.onKeyPress)
            props.onKeyPress(event,ref)
    }

    return (
        <TextInput
            value={props.value}
            placeholder={props.placeholderStyle}
            style={props.style}
            ref={ref}
            onFocus={handleOnFocus}
            onBlur={handleOnBlur}
            onChangeText={_onChangeText}
            returnKeyType={props.returnKeyType}
            keyboardType={props.keyboardType}
            onSubmitEditing={handleOnSubmitEditing}
            {...props.otherTextInputProps}
            secureTextEntry={props.secureTextEntry}
            onKeyPress={(e)=>handleonKeyPress(e,ref)}
        />
    )
});

export default TextField;

