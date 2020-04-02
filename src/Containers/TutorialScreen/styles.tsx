import { StyleSheet, Dimensions, Platform } from 'react-native';
import { vh, vw, Colors } from '../../Constants';
const hei = Dimensions.get('screen').height
const wi = Dimensions.get('screen').width

const styles = StyleSheet.create({
    main: {
        flex: 1,
        alignSelf: 'center',
        justifyContent: 'center',
    },
    container: {
        flex: 1,
        alignSelf: 'center',
        backgroundColor: Colors.white
    },
    backgroundImage: {
        height: hei,
        width: wi,
        resizeMode: 'stretch',
    },
    mainHeading: {
        position: 'absolute',
    },
    moreSocial: {
        color: Colors.white,
        fontFamily: 'NordiquePro-Regular',
        fontSize: vh(60),
        marginTop: vh(63.5),
        // marginLeft: vw(63.5)
        alignSelf: 'center',
    },
    tagLine: {
        color: Colors.white,
        fontFamily: 'Poppins-Regular',
        fontSize: vh(16.5),
        marginTop: Platform.OS === 'ios' ? vh(-10) : vh(20),
        // left: vw(43.5)
        alignSelf: 'center',
    },
    buttons: {
        marginTop: vh(280)
    },
    facebook: {
        marginLeft: vw(38),
        marginRight: vw(38),
        height: vh(43),
        backgroundColor: Colors.fbColor,
        width: vw(wi - 76),
        borderRadius: vw(20),
        alignItems: 'center',
        flexDirection: 'row',
    },
    oldSchool: {
        marginTop: vh(20),
        flexDirection: 'row'
    },
    signIn: {
        marginLeft: vw(38),
        height: vh(43),
        backgroundColor: Colors.oldSchool,
        width: vw(160),
        borderRadius: vw(20),
        alignItems: 'center',
        justifyContent: 'center',
    },
    signUp: {
        marginRight: vw(38),
        marginLeft: vw(20),
        height: vh(43),
        backgroundColor: Colors.oldSchool,
        width: vw(160),
        borderRadius: vw(20),
        alignItems: 'center',
        justifyContent: 'center',
    },
    indicator: {
        top: vh(200),
    },
    swipe: {
        left: Platform.OS === 'ios' ? vw(156.5) : vw(176.5),
        color: 'white',
        fontSize: vh(18),
        fontFamily: 'Poppins-Regular',
    },
    swipeHeading: {
        flexDirection: 'row',
        marginTop: vh(280),
        alignItems: 'center'
    },
    swipeImage: {
        height: vh(17.5),
        width: vw(17.5),
        marginLeft: Platform.OS === 'ios' ? vw(160) : vw(180),
    },
    tutorialHeading: {
        top: vh(335),
        alignItems: 'center',
    },
    heading: {
        color: Colors.white,
        fontSize: vh(25),
        fontFamily: 'Poppins-Medium',
        fontWeight: '500'
    },
    text: {
        color: Colors.white,
        fontSize: vh(15),
        fontFamily: 'Poppins-Regular',
        textAlign: 'center',
        marginTop: vh(17.5),
        fontWeight: '500'
    },
    dotView: {
        top: (hei - 50),
        left: wi / 2.3,
        flexDirection: 'row',
        position: 'absolute',
    },
    dot: {
        marginLeft: vw(5)
    }
});

export default styles;

