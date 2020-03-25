import React from 'react';
import {TextInput} from 'react-native';

export interface TextInputProps {
    placeHolder: string,
    textInputStyle: any,
    defaultValue: any,
    keyboardType: any,
    returnKeyType: any,
    secureTextEntry: boolean,
    onSubmitEditing: any,
    onChangeTextAction?: any,

}

const TextField = React.forwardRef((props: TextInputProps, ref) => {
    return (
        <TextInput
            ref={ref}
            style={props.textInputStyle}
            placeholder={props.placeHolder}
            defaultValue={props.defaultValue}
            keyboardType={props.keyboardType}
            returnKeyType={props.returnKeyType}
            secureTextEntry={props.secureTextEntry}
            onSubmitEditing={() => props.onSubmitEditing()}
            onChangeText={value => props.onChangeTextAction(value)}
        />
    );
});

export default TextField;
