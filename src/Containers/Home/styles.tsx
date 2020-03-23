import { StyleSheet } from 'react-native';
import { vh, vw, Colors } from '../../Constants';

const styles = StyleSheet.create({
    container: {
        flex:1,
        alignItems: 'center',
        backgroundColor: Colors.white,
    },
    textStyle:{
        fontSize:vh(30),
        height:vh(60),
        marginTop:vh(30),
        alignSelf: 'center',
        color:Colors.tealGreen,
    },
    image:{
        height:vh(200),
        width:vh(200),
        borderRadius:vh(100),
        marginTop:vh(100)
    },
    email:{
        fontSize:vh(30),
        height:vh(60),
        alignSelf: 'center',
        color:Colors.tealGreen,
    },
    logOut:{
        fontSize:vh(30),
        height:vh(60),
        alignSelf: 'center',
        color:Colors.fbColor,
        marginTop:vh(30)
    }
});

export default styles;
