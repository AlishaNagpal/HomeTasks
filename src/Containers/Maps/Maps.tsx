import React from 'react';
import { View, Text, TouchableOpacity, Image, FlatList } from 'react-native';
import styles from './styles';
import MapView, { PROVIDER_GOOGLE, Marker, Callout, LatLng, Polyline } from 'react-native-maps';
import { Images, Strings, Colors, vw } from '../../Constants';
import { CustomTextInput } from '../../Components';
import Geolocation from '@react-native-community/geolocation';
import axios from 'axios';
// import { ClusterMap } from 'react-native-cluster-map';
// import { Cluster } from './Cluster';
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
  resultS: Array<any>,
  markers: Array<object>,
  animate: boolean,
  transport: any,
  route: Array<any>
}

const key = 'DgwCSLp1xsWqNPGjLvG4QlA5fzyYA85k';
const car = 'car';

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
      resultS: [],
      markers: [],
      animate: false,
      transport: {},
      route: []
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

    // this.ToConstantlyWatch()
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
        axios.get(`https://api.tomtom.com/search/2/search/+${query}+.json?key=${key}&limit=7`)
          .then(response => {
            this.setState({ resultS: response.data.results })
          })
      } catch (error) {
        console.log(error)
      }
    } else {
      this.setState({ resultS: [] })
    }
  }

  getMapRegion = (coordinates: any, place: string) => {
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
      , this.getDirections()
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

  // renderCustomClusterMarker = (count: any) => <Cluster count={count} />;

  setMarkers = (coordinate: LatLng) => {
    let temp: any = this.state.markers;
    temp = temp.concat({
      coordinates: coordinate
    });
    this.setState({ markers: temp });
  }

  hitRouteAPI = (callback: Function) => {
    const { currentPosition, searchCoordinates } = this.state;
    try {
      axios.get(`https://api.tomtom.com/routing/1/calculateRoute/${searchCoordinates.latitude}%2C${searchCoordinates.longitude}%3A${currentPosition.latitude}%2C${currentPosition.longitude}/json?avoid=unpavedRoads&travelMode=${car}&key=${key}`)
        .then((response: any) => {
          callback(response.data.routes)
        }).catch((error) => {
          console.log(error)
        })
    } catch (error) {
      console.log(error)
    }
  }

  getPaths = (title: string) => {

    const sa = this.state.searchCoordinates.latitude
    const so = this.state.searchCoordinates.longitude
    const la = this.state.currentPosition.latitude
    const lo = this.state.currentPosition.longitude
    const zoom = 0.07

    let averageCoordinate = {
      latitude: (sa + la) / 2,
      longitude: (so + lo) / 2,
      latitudeDelta: sa > la ? (sa - la) + zoom : (la - sa) + zoom,
      longitudeDelta: so > lo ? (so - lo) + zoom : (lo - so) + zoom,
    }
    this.setState({
      region: averageCoordinate
    }, () => this.mapView.animateToRegion(averageCoordinate, 2000))

    const data: Array<any> = this.state.transport[title];
    data.forEach(itemData => {
      const legArr: Array<any> = itemData.legs;
      legArr.forEach(legData => {
        const legPoints = legData.points;
        this.setState({
          route: legPoints
        })
      });
    });
  }

  getDirections = async () => {
    this.setState({ animate: true }, async () => {
      const result = await new Promise((resolve, reject) => {
        this.hitRouteAPI((response: any) => {
          resolve(response)
        })
      })
      const temp = this.state.transport
      const newType = 'car'
      Object.assign(temp, { [newType]: result })
      this.setState({
        transport: temp
      })
      this.setState({ animate: false }, () => this.getPaths(car))
    })
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
          // onPress={(e) => this.setState({
          //   markers: [...this.state.markers, {
          //     latlng: e.nativeEvent.coordinate
          //   }]
          // })}
          onPress={(e: { nativeEvent: { coordinate: LatLng } }) =>
            this.setMarkers(e.nativeEvent.coordinate)}
        >
          {/* <ClusterMap
          onPress={(e) => this.setState({
            markers: [...this.state.markers, {
              latlng: e.nativeEvent.coordinate
            }]
          })}
          renderClusterMarker={this.renderCustomClusterMarker}
          region={this.state.region}
          ref={ref => (this.mapView = ref)}
          provider={PROVIDER_GOOGLE}
          zoomEnabled={true}
          showsUserLocation={true}
          scrollEnabled={true}
          style={styles.mapStyle}> */}
          {
            this.state.markers.map((marker, i) => (
              <Marker
                // pinColor="green"
                key={i}
                // coordinate={marker.latlng}
                coordinate={marker.coordinates}
                icon={Images.searchPinInMap}
              />
            ))
          }
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
          <Polyline
            coordinates={this.state.route}
            strokeColor={Colors.socialColor}
            strokeWidth={vw(5)}
          />
          {/* </ClusterMap> */}
        </MapView>
      </View >
    );
  }
}
