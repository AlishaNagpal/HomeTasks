import * as React from 'react';
import {View, Image, Text, TouchableOpacity} from 'react-native';
import * as  SocialLogin from '../../Components/SocialLoginHandler';
import { connect } from 'react-redux';
import {updateToken} from '../../Modules/SignUP/Action'
import styles from './styles'

export interface HomeProps {
  result:Array<any>,
  updateToken:Function
}

export interface HomeState {}

class HomeComponent extends React.Component<
  HomeProps,
  HomeState
> {
  constructor(props: HomeProps) {
    super(props);
    this.state = {};
  }

  logOut = () =>{
    SocialLogin.logOut()
    this.props.updateToken('')
  }

  public render() {
    return (
      <View style={styles.container}>
        <Image
        style={styles.image}
        source={{uri:this.props.result.picture.data.url}}
        />
        <Text style={styles.textStyle} >{this.props.result.name}</Text>
        <Text style={styles.email} >{this.props.result.email}</Text>
        <TouchableOpacity onPress={this.logOut} >
        <Text style={styles.logOut} >LogOut</Text>
        </TouchableOpacity>
      </View>
    );
  }
}


function mapDispatchToProps(dispatch:any) {
  return {
    updateToken: (value:string) => dispatch(updateToken(value))
  }
}

function mapStateToProps(state:any) {
  const {result} = state.SignUpReducer;
  return {
    result
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeComponent);