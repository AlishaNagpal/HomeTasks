import { StyleSheet } from 'react-native'
import { vh, Colors, vw} from '../../Constants'

const  styles = StyleSheet.create({
    errorView: {
        position: 'absolute',
        height: vh(80),
        width: vw(420),
        backgroundColor: Colors.white,
    },
    errorMessage: {
        fontSize: vh(13),
        color: Colors.black,
        marginTop: vh(15),
        marginLeft: vw(20),
        width: vw(290),
        height: vw(60),
        alignSelf:'center',
    },
    headerButton: {
        // marginTop: vh(25),
        marginRight: vw(20),
        marginLeft: vw(20),
        marginBottom: vh(15)
    },
    infoText: {
        color: 'blue',
        marginTop: vh(25),
        marginBottom: vh(15)
    },
    topView: {
        marginTop: vw(30),
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
    }
});
export default styles;
