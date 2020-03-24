import { connect } from 'react-redux'
import Navigator from './Navigation';

const mapStateToProps = (state: any) => {
  const {splashRan} = state.SplashReducer;
  const {token} = state.SignUpReducer;
  return {
    token,
    splashRan
  }
}

export default connect(
  mapStateToProps,
)(Navigator);