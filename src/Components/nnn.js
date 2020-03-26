import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {connect} from 'react-redux';
// custom import
import {TextField, Button, ActivityIndicator} from '../components';
import Validation from '../utils/Validation';
import {Services, Config} from '../firebase';
import {sha1} from '../utils/hashing';
import {vh} from '../constansts';

function Registration(props) {
  const [name, setName] = useState('');
  const [contact, setContact] = useState('');
  const [address, setAddress] = useState('');
  const [isLoading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // refs
  contactRef = React.createRef();
  addressRef = React.createRef();
  //actions
  _onChangeName = value => {
    setErrorMessage('');
    setName(value);
  };
  _onChangeContact = value => {
    setErrorMessage('');
    setContact(value);
  };
  _onChangeAddress = value => {
    setErrorMessage('');
    setAddress(value);
  };
  _onSubmitFailed = () => {
    setLoading(false);
    setErrorMessage('error occured');
  };
  _onSubmitSuccess = () => {
    props.navigation.navigate('Home');
    setLoading(false);
  };
  _onSubmit = () => {
    validation = new Validation();
    if (!validation.isValidName(name)) {
      setErrorMessage('invalid name format!!!');
      return;
    }
    if (!validation.isValidContact(contact)) {
      setErrorMessage('invalid Mobile number  format!!!');
      return;
    }
    if (address === '') {
      setErrorMessage('invalid address!!!');
      return;
    }
    // setLoading(true);
    services = new Services();
    data = {name: name, contact: contact, address: address};
    location = props.email;
    // console.warn(props.email);

    // location.remove('.');
    location = location.replace('.', '');
    location = location + '/details';

    services.store(data, location, _onSubmitFailed, _onSubmitSuccess);
  };
  if (isLoading) {
    return <ActivityIndicator />;
  } else {
    return (
      <KeyboardAwareScrollView
        style={{flex: 1}}
        enableOnAndroid={true}
        scrollEnabled={true}
        enableAutomaticScroll={true}>
        <View style={styles.container}>
          <TextField
            placeHolder="Name"
            defaultValue={name}
            onChangeTextAction={_onChangeName}
            returnKeyType="next"
            onSubmitEditing={() => contactRef.current.focus()}
          />
          <TextField
            ref={contactRef}
            placeHolder="Contact Number"
            defaultValue={contact}
            keyboardType="number-pad"
            onChangeTextAction={_onChangeContact}
            returnKeyType="next"
            onSubmitEditing={() => addressRef.current.focus()}
          />
          <TextField
            ref={addressRef}
            placeHolder="Address"
            defaultValue={address}
            onChangeTextAction={_onChangeAddress}
            returnKeyType="done"
            onSubmitEditing={_onSubmit}
          />
          <Button buttonText="Submit" buttonAction={_onSubmit} />
          <Text style={styles.error}>{errorMessage}</Text>
        </View>
      </KeyboardAwareScrollView>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    height: vh(500),
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  error: {
    color: 'red',
  },
});

const mapStateToProps = state => {
  return {
    email: state.email,
  };
};
const mapDispatchToProps = dispatch => {
  return {};
};
export default connect(mapStateToProps, mapDispatchToProps)(Registration);