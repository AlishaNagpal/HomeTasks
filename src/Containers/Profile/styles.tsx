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
        top: vh(10),
        flex:1
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
        marginLeft: vw(120),
        textTransform: 'capitalize',
        flex:5
    },
    searchIconButton: {
        // width: vw(60),
        justifyContent: 'center',
        marginTop: vh(30),
        // marginLeft: vw(90),
        // height: vh(50),
        flex:1,
        right:vw(20)
    },
    edit: {
        textTransform: 'uppercase',
        fontFamily: 'Poppins-Regular',
        fontSize: vh(16),
        color: Colors.white
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
    approved: {
        position: 'absolute',
        right: vw(10),
        bottom: vh(12)
    },
    BiotextField: {
        height: vh(80),
        width: vw(324),
        borderRadius: vh(10),
        borderWidth: vw(1),
        backgroundColor: Colors.white,
        paddingLeft: vw(25),
        fontSize: vh(14),
        alignSelf: 'center',
        shadowColor: Colors.gray,
        shadowOpacity: 1,
        marginTop: vh(10),
        shadowRadius: 10,
        fontFamily: 'Poppins-Regular',
        paddingTop: vh(10),
        elevation:6
    },
    number: {
        position: 'absolute',
        fontSize: vh(16),
        fontFamily: 'Poppins-Regular',
        top: vh(23),
        left: vw(15)
    },
    socialLogin: {
        height: vh(50),
        width: vw(324),
        borderRadius: vh(25),
        backgroundColor: Colors.white,
        paddingLeft: vw(10),
        alignSelf: 'center',
        shadowColor: Colors.gray,
        shadowOpacity: 1,
        marginTop: vh(10),
        shadowRadius: 10,
        flexDirection: 'row',
        paddingTop:vh(10)
    },
    facebook: {
        height: vh(30),
        width: vh(30),
        borderRadius: vh(21),
        backgroundColor: Colors.fbColor,
        alignItems: 'center',
        justifyContent: 'center',
    },
    fbIcon: {
        height: 25,
        width: 18
    },
    linkedIn: {
        height: vh(30),
        width: vh(30),
        borderRadius: vh(21),
        backgroundColor: Colors.linkedIn,
        alignItems: 'center',
        justifyContent: 'center',
    },
    linkedInIcon: {
        height: 21,
        width: 22
    },
    url:{
        fontFamily:'Poppins-Regular',
        fontSize:vh(12),
        marginTop:vh(5),
        marginLeft:vw(2)
    },
});

export default styles;
