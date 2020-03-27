import { StyleSheet, Dimensions } from 'react-native';
import { vh, vw, Colors } from '../../Constants';

const wi = Dimensions.get('screen').width;

const styles = StyleSheet.create({
    container: {
        flex:1,
        alignItems: 'center',
        backgroundColor: Colors.white,
    },
    header:{
        backgroundColor:Colors.oldSchool,
        width:wi,
        height:vh(73.5),
        alignItems: 'center',
        flexDirection: 'row',
    },
    menuIconButton:{
        height:vh(50),
        width:vw(60),
        marginLeft:vw(12.5),
        justifyContent: 'center',
        top:vh(10)
    },
    menuIcon:{
      height:vh(20.5),
      width:vw(20.5)  
    },
    moreSocial:{
        color: Colors.white,
        alignSelf: 'center',
        fontSize: vh(21),
        fontFamily: 'Poppins-Medium',
        marginTop: vh(20),
        marginLeft:vw(60)
    },
    searchIconButton:{
        width:vw(60),
        justifyContent: 'center',
        top:vh(10),
        marginLeft:vw(80),
        height:vh(50),
    },
    map:{
        flex:1,
        alignItems:'center'
    },
    background:{
        flex:1,
        width:wi,
        opacity:0.5
    },
    bottom:{
        position:'absolute',
    },
    textInput:{
        backgroundColor:Colors.white,
        height:vh(50),
        width:vw(350),
        borderRadius:vh(25),
        marginTop:vh(64),
        flexDirection:'row',
        borderWidth:1,
        position:'absolute'
    },
    searchPin:{
        alignSelf: 'center',
        marginLeft:vw(21),
        height:vh(18),
        width:vw(14)
    },
    searchField:{
        width:vw(290),
        marginLeft:vw(10),
        fontSize:vh(15),
    },
    indicator:{
        marginTop:vh(20)
    },
    flatlistContainer: {
        width:vw(350),
        height:vh(83),
        borderRadius:vh(10),
        backgroundColor:Colors.white,
        marginBottom:vh(10),
        shadowColor:Colors.gray,
        shadowOpacity:1,
        shadowRadius:vw(10),
        borderWidth:1,
        borderColor:Colors.white
    },

    text: {
        // paddingBottom: 10,
        paddingLeft: 20,
        fontSize: 16,
        color: 'white',
        fontWeight: 'bold',
        paddingTop: 10
    },
    
    buttonTextStyle: {
        color: '#1b4e55',
        height: 30,
        width: 100,
        fontSize: 20,
        borderRadius: 20,
        marginLeft: 110
    },
    textInputStyle: {
        marginLeft: 20,
        marginRight: 20,
        borderRadius: 10,
        borderColor: 'lightgray',
        borderWidth: 0.5,
        shadowOpacity: 0.3,
        shadowColor: 'lightgray',
        height: 50,
        paddingLeft: 40,
        marginTop: 30,
        fontSize: 20,
    },
    imagestyle: {
        height: 100,
        width: 100,
        position: 'absolute',
        backgroundColor: 'white',
        top: -20,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: 'darkgray'
    },
    dateStyle: {
        paddingLeft: 10,
        fontSize: 12,
        color: 'white',
        fontWeight: 'bold',
    },
    iconPos:{
    position:'absolute', 
    top:38, 
    left: 30
    }
});

export default styles;
