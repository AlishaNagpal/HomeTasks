import { StyleSheet, Dimensions } from 'react-native';
import { vh, vw, Colors } from '../../Constants';
const hei = Dimensions.get('screen').height
const wi = Dimensions.get('screen').width

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignSelf: 'center',
    },
    backgroundImage: {
        height: hei,
        width: wi,
        resizeMode: 'stretch',
    },
    mainHeading:{
        position:'absolute',
    },
    moreSocial: {
        color: Colors.white,
        fontFamily: 'NordiquePro-Regular',
        fontSize: vh(60),
        top: vh(63.5),
        left:vw(43.5)
    },
    tagLine: {
        color: Colors.white,
        fontFamily: 'Poppins-Regular',
        fontSize: vh(16.5),
        top: vh(40),
        left:vw(43.5)
    },
    buttons:{
        top:vh(360)
    },
    facebook:{
        marginLeft:vw(38),
        marginRight:vw(38),
        height:vh(43),
        backgroundColor:Colors.fbColor,
        width:vw(wi-76),
        borderRadius:vw(20),
        alignItems:'center',
        flexDirection:'row',
    },
    oldSchool:{
        marginTop:vh(20),
        flexDirection:'row'
    },
    signIn:{
        marginLeft:vw(38),
        height:vh(43),
        backgroundColor:Colors.oldSchool,
        width:vw(160),
        borderRadius:vw(20),
        alignItems:'center',
        justifyContent: 'center',
    },
    signUp:{
        marginRight:vw(38),
        marginLeft:vw(20),
        height:vh(43),
        backgroundColor:Colors.oldSchool,
        width:vw(160),
        borderRadius:vw(20),
        alignItems:'center',
        justifyContent: 'center',
    },
    indicator:{
        top:vh(200),
    }
});

export default styles;

