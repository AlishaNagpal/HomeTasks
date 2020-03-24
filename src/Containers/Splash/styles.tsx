import { StyleSheet } from 'react-native';
import { vh, vw, Colors } from '../../Constants';

const styles = StyleSheet.create({
    container: {
        flex:1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    logoImage:{
        height:vh(250),
        width:vw(350)
    },
    text:{
        color:Colors.white,
        fontSize:vh(50),
        fontFamily:'Medinah',
        position:'absolute'
    }
});

export default styles;
