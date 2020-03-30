import { StyleSheet, Dimensions } from 'react-native';
import { vh, vw, Colors, DesignWidth } from '../../Constants';

const wi = Dimensions.get('screen').width

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: Colors.white
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
        fontSize: vh(25),
        fontFamily: 'NordiquePro-Regular',
        marginTop: vh(25),
        marginLeft:vw(60)
    },
    searchIconButton:{
        width:vw(60),
        justifyContent: 'center',
        top:vh(10),
        marginLeft:vw(80),
        height:vh(50),
    },
    textInput:{
        backgroundColor:Colors.white,
        height:vh(50),
        width:vw(350),
        borderRadius:vh(25),
        marginTop:vh(64),
        flexDirection:'row',
        borderWidth:1,
        position:'absolute',
        zIndex:99
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
    mapStyle: {
        height: vh(600),
        width: vw(DesignWidth),
        // marginTop: vh(10)
    },
    marker:{
        height:vh(30),
        width:vh(30),
        borderRadius:vh(15)
    },
    markerView:{
        height:vh(30),
        width:vh(30),
        borderRadius:vh(15),
        borderColor:Colors.socialColor,
        borderWidth:vw(1)
    },
    searchBarFlat: {
        position: 'absolute',
        marginTop:vh(50),
        alignItems:'center',
        backgroundColor: Colors.white,
        borderRadius: vw(5),
        zIndex: 99,
    },
    separator: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        height: vw(0.7),
        backgroundColor: Colors.socialColor,
        marginHorizontal: vw(30)
    },
    searchFlatList:{
        height:vh(30),
        width:vw(350),
    },
    searchedText:{
        fontSize:vh(13),
        fontFamily:'Poppins-Regular',
        textAlign:'center',
        marginTop:vh(10)
    },
    callOut:{
        textAlign:'center',
        fontFamily:'NordiquePro-Regular',
        fontSize:vh(14),
    },
    callOutView:{
        width:vw(150)
    },
    markerSearch:{
        height:vh(70),
        width:vh(60),
    },

});

export default styles;
