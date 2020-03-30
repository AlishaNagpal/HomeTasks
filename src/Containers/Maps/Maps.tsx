import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import styles from './styles';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import { Images, Strings, Colors } from '../../Constants';
import { CustomTextInput } from '../../Components';
import Geolocation from '@react-native-community/geolocation';
export interface MapsProps {
  navigation: any,
}

export interface MapsState {
  Search: string,
  SearchFocus: boolean,
  currentPosition: any,
  region: any,
  queryS: string,
  searchCoordinates: any
}

export default class MapsComponent extends React.Component<MapsProps, MapsState> {
  constructor(props: MapsProps) {
    super(props);
    this.state = {
      Search: '',
      SearchFocus: false,
      currentPosition: null,
      region: {
        latitude: 0,
        longitude: 0,
        latitudeDelta: 0,
        longitudeDelta: 0,
      },
      queryS: '',
      searchCoordinates: null
    };
  }

  componentDidMount() {
    Geolocation.getCurrentPosition(info => {
      this.setState({
        currentPosition: {
          latitude: info.coords.latitude,
          longitude: info.coords.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        },
      }, () => this.setState({
        region: this.state.currentPosition,
        queryS: 'Current Location',
        searchCoordinates: this.state.currentPosition
      }))
    });

    this.ToConstantlyWatch()
  }

  ToConstantlyWatch = () => {
    Geolocation.watchPosition((info) => {
      this.setState({
        currentPosition: {
          latitude: info.coords.latitude,
          longitude: info.coords.longitude,
          latitudeDelta: 0.001,
          longitudeDelta: 0.001,
        }
      })
    }, (error) => {
      console.log(error);
    },
      { enableHighAccuracy: true, distanceFilter: 300 }
    )
  }

  componentWillUnmount() {
    Geolocation.stopObserving()
  }

  _updateMasterState = (attrName: any, value: any) => {
    this.setState({ [attrName]: value });
  }

  getFunction = (key: string) => {

  }

  public render() {
    return (
      <View style={styles.container} >
        <View style={styles.header}>
          <TouchableOpacity style={styles.menuIconButton} onPress={() => this.props.navigation.openDrawer()} >
            <Image source={Images.menuIcon} style={styles.menuIcon} />
          </TouchableOpacity>
          <Text style={styles.moreSocial} > {Strings.appName} </Text>
          <TouchableOpacity style={styles.searchIconButton} >
            <Image source={Images.searchIcon} />
          </TouchableOpacity>
        </View>
        <View style={[styles.textInput, { borderColor: this.state.SearchFocus ? Colors.socialColor : Colors.white }]} >
          <Image source={Images.searchPin} style={styles.searchPin} />
          <CustomTextInput
            value={this.state.Search}
            style={styles.searchField}
            attrName={'Search'}
            updateMasterState={this._updateMasterState}
            keyboardType={'default'}
            returnKeyType={'done'}
            placeholderStyle={Strings.appTagLine}
            secureTextEntry={false}
            onSubmitEditing={() => { this.getFunction(this.state.Search), this.setState({ SearchFocus: false }) }}
            _handleFocus={() => this.setState({ SearchFocus: true })}
            _handleBlur={() => this.setState({ SearchFocus: false })}
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
          region={this.state.region}
        >
          {this.state.currentPosition &&
            <Marker
              coordinate={{ latitude: this.state.currentPosition.latitude, longitude: this.state.currentPosition.longitude }}
            >
              <View style={styles.markerView} >
                <Image source={Images.user} style={styles.marker} />
              </View>
            </Marker>
          }
        </MapView>
      </View >
    );
  }
}
