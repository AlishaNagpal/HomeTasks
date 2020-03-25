import React, { PureComponent } from 'react';
import { TouchableOpacity, Animated } from 'react-native';
import { Colors, VectorIcons, vh } from '../../Constants';
import styles from './styles'

export interface AppProps {
  top:number,
  from:number,
  to:number,
  call:any,
  message:string
}

export interface AppState {}

export default class Toast extends PureComponent<AppProps, AppState>  {
  state = { animatedValue: new Animated.Value(this.props.top) }

  componentDidMount() {
    Animated.timing(this.state.animatedValue, {
      toValue: this.props.from,
      duration: 400,
    }).start();
  }
  close = () => {
    Animated.timing(this.state.animatedValue, {
      toValue: this.props.to,
      duration: 400
    }).start()
    this.props.call && this.props.call(false)
  }


  render() {
    return (
      <Animated.View style={[styles.errorView, { marginTop: this.state.animatedValue, top: this.props.top }]} >
        <Animated.View style={styles.topView} >
          <Animated.Text style={styles.errorMessage}> {this.props.message} </Animated.Text>
          <TouchableOpacity style={styles.headerButton} onPress={() => this.close()}  >
            <VectorIcons.AntDesign name="close" size={vh(25)} color={Colors.inactiveDot} />
          </TouchableOpacity>
        </Animated.View>
      </Animated.View>
    );
  }
}
