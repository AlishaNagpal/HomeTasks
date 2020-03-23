import { connect } from 'react-redux'
import Navigator from './Navigation';

const mapStateToProps = (state: any) => {
  const { token } = state.SignUpReducer;
  return {
    token
  }
}

export default connect(
  mapStateToProps,
)(Navigator);