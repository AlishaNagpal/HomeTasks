import { StyleSheet, Dimensions } from 'react-native';
import { vh, vw, Colors } from '../../Constants';

const wid = Dimensions.get('screen').width

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: Colors.white
    },
    header: {
        backgroundColor: Colors.oldSchool,
        width: wid,
        height: vh(83.5),
        flexDirection: 'row',
        alignItems: 'center',
    },
    backArrowButton: {
        flex: 1,
        left: vw(12.5),
        marginTop: vh(20)
    },
    backArrow: {
        height: vh(17.5),
        width: vw(17.5)
    },
    headerText: {
        color: Colors.white,
        alignSelf: 'center',
        fontSize: vh(17),
        fontFamily: 'Poppins-Medium',
        marginTop: vh(20),
        marginRight: vw(115)
    },
    buttonStyle: {
        marginTop: vh(23.5),
        width: vw(140),
        backgroundColor: Colors.oldSchool,
        alignSelf: 'center',
        height: vh(43),
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: vh(25)
    },
    text:{
        textAlign:'center',
        fontSize:vh(14),
        marginTop:vh(40),
        marginHorizontal:vw(53)
    },
    pinBoxView:{
        flexDirection:'row',
        marginTop:vh(65.5),
        alignItems:'center'
    },
    pinField:{
        width:vw(40),
        height:vh(50),
        shadowColor: Colors.gray,
        shadowOpacity: 1,
        shadowRadius: 10,
        backgroundColor:Colors.white,
        marginRight:vw(10),
        textAlign:'center',
        fontSize:vh(16)
    },
    bottomTextView:{
        flexDirection:'row',
        alignItems:'center',
        marginTop:vh(40)
    },
    noCode:{
        fontFamily:'Poppins-Regular',
        fontSize:vh(14),
    },
    resend:{
        fontFamily:'Poppins-Regular',
        fontSize:vh(14),
        color:Colors.oldSchool,
        textTransform:'uppercase'
    }
});

export default styles;
