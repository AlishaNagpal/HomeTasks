import { StyleSheet, Platform } from 'react-native';
import { vh, vw, Colors } from '../../Constants';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
    moreSocial: {
        color: Colors.socialColor,
        fontFamily: 'NordiquePro-Regular',
        fontSize: vh(60),
        marginTop: vh(63.5),
        alignSelf: 'center',
    },
    indicator: {
        marginTop: vh(10)
    },
    tagLine: {
        color: Colors.black,
        fontFamily: 'Poppins-Regular',
        fontSize: vh(16.5),
        marginTop: Platform.OS === 'ios' ? vh(-10) : vh(20),
        alignSelf: 'center',
    },
    image: {
        flex: 1,
        width: '100%',
        height: '100%',
    },
    mainView: {
        position: 'absolute',
    },
    emailField: {
        height: vh(50),
        width: vw(314),
        borderRadius: vh(25),
        borderWidth: vw(1),
        backgroundColor: Colors.white,
        fontSize: vh(14),
        alignSelf: 'center',
        shadowColor: Colors.gray,
        shadowOpacity: 1,
        shadowRadius: 10,
        elevation:6,
        paddingLeft:vh(15)
    },
    passwordField: {
        height: vh(50),
        width: vw(314),
        borderRadius: vh(25),
        borderWidth: vw(1),
        backgroundColor: Colors.white,
        fontSize: vh(14),
        marginTop: vh(13),
        alignSelf: 'center',
        shadowColor: Colors.gray,
        shadowOpacity: 1,
        shadowRadius: 10,
        elevation:6,
        paddingLeft:vh(15)
    },
    textinputAll: {
        marginTop: vh(60),
        alignItems:'center'
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
    forgotPassword: {
        marginTop: vh(15),
        alignSelf: 'center',
        fontSize: vh(14),
        fontFamily: 'Poppins-Regular',
        color: Colors.warmGrey
    },
    orSign: {
        alignSelf: 'center',
        marginTop: vh(90),
        color: Colors.warmGrey2,
        fontFamily: 'Poppins-Regular',
        fontSize: vh(14),
    },
    socialButtons: {
        marginTop: vh(16.5),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    facebook: {
        height: vh(42),
        width: vh(42),
        borderRadius: vh(21),
        backgroundColor: Colors.fbColor,
        marginRight: vw(20),
        alignItems: 'center',
        justifyContent: 'center',
    },
    // linkedIn: {
    //     height: vh(42),
    //     width: vh(42),
    //     borderRadius: vh(21),
    //     backgroundColor: Colors.linkedIn,
    //     alignItems: 'center',
    //     justifyContent: 'center',
    // },
    noAccountView: {
        marginTop: vh(40),
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
    },
    noAccount: {
        color: Colors.black,
        fontFamily: 'Poppins-Regular',
        fontSize: vh(14),
    },
    SignUp: {
        textTransform: 'uppercase',
        color: Colors.socialColor,
        fontFamily: 'Poppins-Regular',
        fontSize: vh(14),
    },
    fbIcon: {
        height: 25,
        width: 18
    },
});

export default styles;
