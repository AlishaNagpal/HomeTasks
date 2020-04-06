import { StyleSheet, Dimensions, Platform } from 'react-native';
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
        height: Platform.OS === 'ios' ? vh(73.5) : vh(53.5),
        alignItems: 'center',
        flexDirection: 'row',
    },
    menuIconButton:{
        height:vh(50),
        width:vw(60),
        marginLeft:vw(12.5),
        justifyContent: 'center',
        top: Platform.OS === 'ios' ? vh(10) : vh(0),
    },
    menuIcon:{
      height:vh(20.5),
      width:vw(20.5)  
    },
    moreSocial:{
        color: Colors.white,
        fontSize: vh(25),
        fontFamily: 'NordiquePro-Regular',
        marginTop: Platform.OS === 'ios' ? vh(25) : vh(0),
        flex:5,
        marginLeft:vw(60)
    },
    searchIconButton:{
        // width:vw(60),
        justifyContent: 'center',
        top: Platform.OS === 'ios' ? vh(10) : vh(0),
        marginLeft: Platform.OS === 'ios' ? vw(80): vw(120),
        // height:vh(50),
        flex:1
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
        marginTop: Platform.OS === 'ios' ? vh(64) : vh(40),
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
        width: vw(350),
        borderRadius:vh(10),
        backgroundColor:Colors.white,
        marginBottom:vh(10),
        shadowColor:Colors.gray,
        shadowOpacity:1,
        shadowRadius:vw(10),
        borderWidth:1,
        borderColor:Colors.white,
        flexDirection: 'row',
        paddingBottom:vh(10),
        marginLeft:vw(20)
    },
    heart:{
        marginLeft:vw(19),
        marginTop:vh(19)
    },
    row:{
        flexDirection: 'row',
    },
    heading:{
        marginLeft:vw(10),
        marginTop:vh(17),
        width:vw(220),
        fontFamily:'Poppins-Regular',
        fontSize:vh(15)
    },
    image:{
        height:vh(50),
        width:vh(50),
        borderRadius:vh(25),
        borderColor:Colors.oldSchool,
        borderWidth:1,
        marginTop:vh(22)
    },
    description:{
        width:vw(220),
        marginLeft:vw(10),
        marginTop:vh(5),
        fontSize:vh(12),
        fontFamily:'Poppins-Light'
    },
    button:{
        height:vh(50),
        width:vh(50),
        borderRadius:vh(25),
        backgroundColor:Colors.socialColor,
        alignItems:'center',
        justifyContent: 'center',
        marginTop:vh(25),
    },
    button2:{
        height:vh(50),
        width:vh(50),
        borderRadius:vh(25),
        backgroundColor:'red',
        alignItems:'center',
        justifyContent: 'center',
        marginTop:vh(25),
    }

});

export default styles;
