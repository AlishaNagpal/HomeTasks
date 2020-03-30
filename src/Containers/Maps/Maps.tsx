import React from 'react';
import { View, Text, TouchableOpacity, Image, FlatList } from 'react-native';
import styles from './styles';
import MapView, { PROVIDER_GOOGLE, Marker, Callout } from 'react-native-maps';
import { Images, Strings, Colors } from '../../Constants';
import { CustomTextInput } from '../../Components';
import Geolocation from '@react-native-community/geolocation';
import axios from 'axios';
export interface MapsProps {
  navigation: any,
}

export interface MapsState {
  Search: string,
  SearchFocus: boolean,
  currentPosition: any,
  region: any,
  queryS: string,
  searchCoordinates: any,
  resultS: Array<any>
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
      searchCoordinates: null,
      resultS: []
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
    setTimeout(() => {
      this.getFunction(this.state.Search)
    }, 200);
    
  }

  getFunction = (query: string) => {
    if (query.length >= 2) {
      try {
        axios.get(`https://api.tomtom.com/search/2/search/+${query}+.json?key=P6TSGrQgZwug3PtS8MuyiLR4j33bOLeJ&limit=7`)
          .then(response => {
            this.setState({ resultS: response.data.results })
            console.log(response.data.results);

          })
      } catch (error) {
        console.log(error)
      }
    } else {
      this.setState({ resultS: [] })
    }
  }

  getMapRegion = (coordinates: any, place: string) => {
    console.log('setting ', coordinates, place);
    this.setState({ resultS: [], queryS: place })
    const r: any = {
      latitude: coordinates.lat,
      longitude: coordinates.lon,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    }
    this.setState({
      searchCoordinates: r
    }, () => this.mapView.animateToRegion(r, 2000))
  }

  itemSeparator = () => {
    return (
      <View style={styles.separator} />
    )
  }

  renderItems = (rowData: any) => {
    const { item } = rowData
    let address: any
    const { position } = item
    this.state.resultS.length === 0
      ? address = item.address
      : address = item.address.freeformAddress

    return (
      <TouchableOpacity
        activeOpacity={0.8}
        style={styles.searchFlatList}
        onPress={() => { this.getMapRegion(position, address) }}>
        <Text numberOfLines={1} style={styles.searchedText}>{address} </Text>
      </TouchableOpacity>
    )
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
            onSubmitEditing={() => { this.setState({ SearchFocus: false }) }}
            _handleFocus={() => this.setState({ SearchFocus: true })}
            _handleBlur={() => this.setState({ SearchFocus: false })}
            otherTextInputProps={{ autoCorrect: false, clearButtonMode: 'while-editing' }}
          />
          <View style={[styles.searchBarFlat, this.state.resultS === null ? { padding: vw(10), borderWidth: vw(2) } : { padding: 0, borderWidth: 0 }]}>
            <FlatList
              data={this.state.resultS}
              keyExtractor={(item, index) => index.toString()}
              ItemSeparatorComponent={this.itemSeparator}
              renderItem={this.renderItems}
              keyboardShouldPersistTaps='always'
            />
          </View>
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
              <Callout>
                <View style={styles.callOutView} >
                  <Text style={styles.callOut} >{this.state.queryS}</Text>
                </View>
              </Callout>
            </Marker>
          }
          {this.state.searchCoordinates &&
            <Marker
              coordinate={{ latitude: this.state.searchCoordinates.latitude, longitude: this.state.searchCoordinates.longitude }}
            >
              <Image source={Images.searchPinInMap} style={styles.markerSearch} />
              <Callout>
                <View style={styles.callOutView} >
                  <Text style={styles.callOut} >{this.state.queryS}</Text>
                </View>
              </Callout>
            </Marker>
          }
        </MapView>
      </View >
    );
  }
}
