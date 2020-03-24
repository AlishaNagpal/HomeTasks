import { StyleSheet } from 'react-native';
import { vh, vw, Colors } from '../../Constants';

const styles = StyleSheet.create({
    container: {
        flex:1,
        alignItems: 'center',
        backgroundColor: Colors.peachy,
    },
    textStyle:{
        fontSize:vh(30),
        marginTop:vh(20),
        color:Colors.white,
        fontFamily:'Medinah'
    },
    image:{
        height:vh(200),
        width:vh(200),
        borderRadius:vh(100),
        marginTop:vh(100)
    },
    email:{
        fontSize:vh(30),
        marginTop:vh(20),
        color:Colors.peachy,
        fontFamily:'Medinah'
    },
    logOut:{
        fontSize:vh(20),
        alignSelf: 'center',
        color:Colors.bronzedYellow,
    },
    icon:{
        position:'absolute',
        top:vh(210),
        right:vw(80)
    },
    icon2:{
     marginTop:vh(30)   
    }
});

export default styles;
