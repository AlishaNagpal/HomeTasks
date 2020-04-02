import { StyleSheet, Dimensions } from 'react-native';
import { vh, vw, Colors } from '../../Constants';

const wi = Dimensions.get('screen').width;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: Colors.white,
        opacity: 0.8
    },
    header: {
        backgroundColor: Colors.oldSchool,
        width: wi,
        height: vh(73.5),
        alignItems: 'center',
        flexDirection: 'row',
    },
    menuIconButton: {
        height: vh(50),
        width: vw(60),
        marginLeft: vw(12.5),
        justifyContent: 'center',
        marginTop: vh(20)
    },
    menuIcon: {
        height: vh(20.5),
        width: vw(20.5)
    },
    moreSocial: {
        color: Colors.white,
        alignSelf: 'center',
        fontSize: vh(22),
        fontFamily: 'Poppins-Regular',
        marginTop: vh(25),
        marginLeft: vw(80),
        textTransform: 'capitalize'
    },
    image: {
        height: vh(105),
        width: vh(105),
        borderRadius: vh(55),
        marginTop: vh(40),
        alignSelf: 'center',
    },
    cameraStyle: {
        position: 'absolute',
        height: vh(35),
        width: vh(35),
        borderRadius: vh(18),
        right: vw(0),
        bottom: vh(0),
        backgroundColor: Colors.white,
        alignItems: 'center',
        justifyContent: 'center',
    },
    camera: {
        height: vh(20),
        width: vh(20),
    },
    textField: {
        height: vh(50),
        width: vw(324),
        borderRadius: vh(25),
        borderWidth: vw(1),
        backgroundColor: Colors.white,
        paddingLeft: vw(25),
        fontSize: vh(14),
        alignSelf: 'center',
        shadowColor: Colors.gray,
        shadowOpacity: 1,
        marginTop: vh(46),
        shadowRadius: 10,
        fontFamily: 'Poppins-Regular',
        elevation:6
    },
    buttonStyle: {
        marginTop: vh(22),
        width: vw(140),
        backgroundColor: Colors.oldSchool,
        alignSelf: 'center',
        height: vh(43),
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: vh(25)
    },
    indicator:{
        position: 'absolute',
        justifyContent: 'center',
        alignSelf: 'center',
        marginTop:vh(310),
    }
});

export default styles;
