import { StyleSheet } from 'react-native';
import { vh, vw, Colors } from '../../Constants';

const styles = StyleSheet.create({
    container: {
        flex:1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.white,
        resizeMode:'contain',
    },
    textStyle:{
        borderColor:Colors.white,
        fontSize:vh(30),
        height:vh(60),
        marginTop:vh(30),
        alignSelf: 'center',
        color:Colors.fbColor,
        borderRadius:vw(100)
    }
});

export default styles;
