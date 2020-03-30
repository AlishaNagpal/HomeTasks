import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import styles from './styles';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import { Images, Strings, Colors } from '../../Constants';
import { CustomTextInput } from '../../Components';
import Geolocation from '@react-native-community/geolocation';

export interface MapsProps {
  navigation: any,
}

export default function MapsComponent(props: MapsProps) {
  const [Search, setSearch] = useState('');
  const [SearchFocus, setSearchFocus] = useState(false);
  const [currentPosition, setCurrentPosition] = useState({});

  // useEffect(() => {
  //   Geolocation.getCurrentPosition(info => {
  //     this.setState({
  //       currentPosition: {
  //         latitude: info.coords.latitude,
  //         longitude: info.coords.longitude,
  //         latitudeDelta: 0.0922,
  //         longitudeDelta: 0.0421,
  //       },
  //     }, () => this.setState({
  //       region: this.state.currentPosition,
  //       queryS: 'Current Location',
  //       searchCoordinates: this.state.currentPosition
  //     }))
  //   });
  // });

  const _updateMasterState = (attrName: any, value: any) => {
    return attrName(value);
  }

  const getFunction = (key: string) => {

  }

  return (
    <View style={styles.container} >
      <View style={styles.header}>
        <TouchableOpacity style={styles.menuIconButton} onPress={() => props.navigation.openDrawer()} >
          <Image source={Images.menuIcon} style={styles.menuIcon} />
        </TouchableOpacity>
        <Text style={styles.moreSocial} > {Strings.appName} </Text>
        <TouchableOpacity style={styles.searchIconButton} >
          <Image source={Images.searchIcon} />
        </TouchableOpacity>
      </View>
      <View style={[styles.textInput, { borderColor: SearchFocus ? Colors.socialColor : Colors.white }]} >
        <Image source={Images.searchPin} style={styles.searchPin} />
        <CustomTextInput
          value={Search}
          style={styles.searchField}
          attrName={setSearch}
          updateMasterState={_updateMasterState}
          keyboardType={'default'}
          returnKeyType={'done'}
          placeholderStyle={Strings.appTagLine}
          secureTextEntry={false}
          onSubmitEditing={() => { getFunction(Search), setSearchFocus(false) }}
          _handleFocus={() => setSearchFocus(true)}
          _handleBlur={() => setSearchFocus(false)}
          otherTextInputProps={{ autoCorrect: false, clearButtonMode: 'while-editing' }}
        />
      </View>
      <MapView
        style={styles.mapStyle}
        ref={ref => (this.mapView = ref)}
        provider={PROVIDER_GOOGLE}
        zoomEnabled={true}
        showsUserLocation={true}
        scrollEnabled={true}
        maxZoomLevel={13.3}
        region={{
          latitude: 28.597701,
          longitude: 77.338192,
          latitudeDelta: 0.015,
          longitudeDelta: 0.0121,
        }}
      />
    </View >
  );
}
