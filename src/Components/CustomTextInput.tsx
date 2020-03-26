import React from 'react';
import {TextInput} from 'react-native';

export interface AppProps {
    value: any,
    style:any,
    _handleFocus?:any,
    _handleBlur?:any,
    attrName: string,
    updateMasterState: Function,
    keyboardType: any,
    placeholderStyle: string,
    returnKeyType:any,
    otherTextInputProps?: object,
    onSubmitEditing: any,
    ref?: any;
    secureTextEntry: any,  
};

export interface AppState {};


export default class CustomTextInput extends React.Component<AppProps, AppState> {

    _onChangeText = (updatedValue: any) => {
        const { attrName, updateMasterState } = this.props;
        updateMasterState(attrName, updatedValue);
    }

    handleOnSubmitEditing = () => {
        if (this.props.onSubmitEditing)
            this.props.onSubmitEditing()
    }

    render() {
        return (
            <TextInput
                value={this.props.value}
                placeholder={this.props.placeholderStyle}
                style={this.props.style}
                ref={"FloatingLabelInput"}
                onFocus={this.props._handleFocus}
                onBlur={this.props._handleBlur}
                onChangeText={this._onChangeText}
                returnKeyType={this.props.returnKeyType}
                keyboardType={this.props.keyboardType}
                onSubmitEditing={this.handleOnSubmitEditing}
                {...this.props.otherTextInputProps}
            />
        )
    }
};
