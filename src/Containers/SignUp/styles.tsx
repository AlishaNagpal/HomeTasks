import { StyleSheet } from 'react-native';
import { vh, Colors } from '../../Constants';

const styles = StyleSheet.create({
    container: {
        flex:1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.white,
        resizeMode:'contain',
    },
    exercise:{
        fontFamily:'Medinah',
        color:Colors.white,
        fontSize:vh(35),
        textAlign:'center',
        marginTop:vh(20)
    }
});

export default styles;
