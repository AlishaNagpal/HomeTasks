import { StyleSheet, Dimensions } from 'react-native';
import { vh, vw, Colors } from '../../Constants';

const wi = Dimensions.get('screen').width;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: Colors.white,
        opacity: 0.8
    },
    header: {
        backgroundColor: Colors.oldSchool,
        width: wi,
        height: vh(73.5),
        alignItems: 'center',
        flexDirection: 'row',
        marginBottom: vh(50)
    },
    menuIconButton: {
        height: vh(50),
        width: vw(60),
        marginLeft: vw(12.5),
        justifyContent: 'center',
        marginTop: vh(20),
        flex:1
    },
    menuIcon: {
        height: vh(20.5),
        width: vw(20.5)
    },
    moreSocial: {
        color: Colors.white,
        alignSelf: 'center',
        fontSize: vh(22),
        fontFamily: 'Poppins-Regular',
        marginTop: vh(25),
        marginLeft: vw(65),
        textTransform: 'capitalize',
        flex:5
    },
    addUser:{
        flex:1,
        justifyContent: 'center',
        marginTop:vh(25),
        marginLeft:vw(10)
    },
    moreSocial2: {
        color: Colors.white,
        alignSelf: 'center',
        fontSize: vh(14),
        fontFamily: 'Poppins-Regular',
        marginTop: vh(25),
        marginLeft: vw(55),
        textTransform: 'capitalize'
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    row2: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        flex: 1,
        marginTop: vh(15),
        marginLeft: vw(20),
        marginBottom:vh(5)
    },
    root: {
        flexDirection: 'column',
        flex: 1
    },
    nameSet: {
        fontSize: vh(18),
        marginBottom:vh(5)
    },
    time: {
        marginLeft: vw(20),
        flexDirection: 'row',
    },
    message: {
        color: Colors.socialColor,
        fontSize: vh(12),
        marginRight:vw(10),
        // flex: 1,
        // marginTop: vw(10)
    },
    message2: {
        color: Colors.socialColor,
        fontSize: vh(12),
        marginRight: vw(10)
    },
    separator: {
        height: vh(2),
        width: vw(400),
        alignSelf: 'center',
        backgroundColor: Colors.textInput,
        margin: vw(5)
    },
    centerNoChats: {
        marginLeft: vw(-40)
    },
    noChatImage: {
        height: vh(180),
        width: vh(220),
        alignSelf: 'center',
        marginTop: vh(120),
    },
    noChat: {
        alignSelf: 'center',
        marginTop: vh(30),
        fontWeight: '700',
        fontSize: vh(25),
        color: Colors.pinkishGrey,
        marginLeft: vw(25)
    },
    chatImage: {
        height: vh(50),
        width: vh(50),
        borderRadius: vh(25),
        marginLeft: vw(15),
    },
    selectView: {
        position: 'absolute',
        backgroundColor: Colors.oldSchool,
        height: vh(60),
        width: wi,
        opacity: 0.4
    },
    icon: {
        top: 15,
        left: 20,
        position: 'absolute'
    },
    lastMessage: {
        color: Colors.dayText,
        fontSize:vh(12),
        flex:1
    },
    unreadView:{
        height:vh(20),
        width:vh(20),
        backgroundColor:Colors.socialColor,
        alignItems: 'center',
        borderRadius:vh(10),
        justifyContent: 'center',
        marginRight:vw(25)
    },
    unreadMessages: {
        color: Colors.white,
        fontSize:vh(12),
    },
});

export default styles;
