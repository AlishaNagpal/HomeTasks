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
        marginRight: vw(115),
        // flex:5
    },
    key: {
        height: vh(150),
        width: vw(200),
        marginTop: vh(66),
    },
    text: {
        marginTop: vh(55),
        fontFamily: 'Poppins-Regular',
        fontSize: vh(14),
        textAlign: 'center',
        color: Colors.black,
        marginHorizontal: vw(40)
    },
    passwordField: {
        height: vh(50),
        width: vw(314),
        borderRadius: vh(25),
        borderWidth: vw(1),
        backgroundColor: Colors.white,
        textAlign: 'center',
        fontSize: vh(14),
        alignSelf: 'center',
        shadowColor: Colors.gray,
        shadowOpacity:1,
        marginTop:vh(35.5),
        shadowRadius: 10,
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

});

export default styles;
