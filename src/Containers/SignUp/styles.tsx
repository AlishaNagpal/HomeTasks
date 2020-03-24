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
        fontSize:vh(50),
        color:Colors.white,
        fontFamily:'Medinah',
        marginLeft:vw(160),
        marginTop:vh(100)
    },
    linkedInStyle:{
        fontSize:vh(50),
        color:Colors.white,
        fontFamily:'Medinah',
        marginLeft:vw(160),
        marginTop:vh(30)
    }
});

export default styles;
