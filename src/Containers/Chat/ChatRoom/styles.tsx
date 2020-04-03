import { StyleSheet } from 'react-native';
import { Colors, DesignWidth, vh, vw } from '../../../Constants';

const Styles = StyleSheet.create({
    main: {
        flex: 1
    },
    headerView: {
        backgroundColor: Colors.oldSchool,
        width: DesignWidth,
        height: vh(83.5),
        flexDirection: 'row',
        alignItems: 'center',
    },
    icon: {
        marginLeft: vw(12.5),
        marginTop: vh(20),
        height:vh(20)
    },
    nameText: {
        fontSize: vh(18),
        marginLeft: vw(10),
        marginTop: vh(25),
        color: Colors.white,
        fontFamily:'Poppins-Medium'
        // marginBottom: Platform.OS === 'ios' ? vw(8) : 0
    },
    typingText: {
        color: Colors.dayText,
        fontSize: vh(11),
        marginLeft: vw(10),
        marginBottom: vw(5)
    },
    sendView: {
        // backgroundColor: Colors.white,
        height: vw(45),
        width: vw(45),
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: vw(5),
        marginLeft: vw(7.5),
    },
    sendBtn: {
        backgroundColor: Colors.white,
        height: vw(45),
        width: vw(45),
        alignSelf:'center',
        borderRadius: vw(25)
    },
    messagesContainerStyle: {
        paddingBottom: vh(30),
    },
    imageStyle: {
        resizeMode: 'contain',
        height: vh(40),
        width: vh(40),
        marginLeft: vw(10),
        borderRadius:vh(20),
        backgroundColor:'black',
        marginTop:vh(25)
    },
    footerView: {
        backgroundColor: Colors.socialColor,
        marginLeft: vw(150),
        marginRight: vw(50),
        borderBottomEndRadius: vw(10),
        borderBottomLeftRadius: vw(10),
        borderTopLeftRadius: vw(10),
        padding: vw(10),
        marginBottom: vh(10)
    },
    timeStyle: {
        color: Colors.white,
        fontSize: vh(9),
        marginLeft: vw(130)
    },
    footerImage: {
        height: vw(180),
        width: vw(180),
        borderRadius: vw(20),
        margin: vw(10)
    },
    indicator: {
        position: 'absolute',
        alignSelf: 'center',
        top: vh(70)
    },
    arrayText: {
        color: Colors.white,
        fontWeight: 'bold',
        fontSize: vh(20),
        position: 'absolute',
        alignSelf: 'center',
        top: vh(70)
    },
    backgroundVideo: {
        height: vw(100),
        width: vw(200),
        marginTop: vw(10)
    },
    sendIcon:{
        alignSelf:'center',
        marginTop:vh(5),
        marginRight:vw(4)
    },
})
export default Styles;