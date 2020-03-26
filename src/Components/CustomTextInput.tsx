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

    return (
        <TextInput
            value={props.value}
            placeholder={props.placeholderStyle}
            style={props.style}
            ref={ref}
            onFocus={props._handleFocus}
            onBlur={props._handleBlur}
            onChangeText={_onChangeText}
            returnKeyType={props.returnKeyType}
            keyboardType={props.keyboardType}
            onSubmitEditing={handleOnSubmitEditing}
            {...props.otherTextInputProps}
            secureTextEntry={props.secureTextEntry}
        />
    )
});

export default TextField;

