import {StyleSheet} from 'react-native';
import { vh, vw, Colors } from '../../Constants';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: Colors.white,
        justifyContent:'center'
    },
    key: {
        height: vh(130),
        width: vw(250),
        marginTop: vh(66),
    },
    text: {
        marginTop: vh(26.5),
        fontFamily: 'Poppins-Regular',
        fontSize: vh(14),
        textAlign: 'center',
        color: Colors.black,
        marginHorizontal: vw(40)
    },
    buttonStyle: {
        marginTop: vh(23.5),
        width: vw(140),
        backgroundColor: Colors.oldSchool,
        alignSelf: 'center',
        height: vh(43),
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: vh(25)
    },
    verified: {
        marginTop: vh(30.5),
        fontFamily: 'Poppins-Medium',
        fontSize: vh(18),
        textAlign: 'center',
        color: Colors.black,
        marginHorizontal: vw(40),
        textTransform:'uppercase',
    },
});

export default styles;
