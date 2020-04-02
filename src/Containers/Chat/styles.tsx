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
    },
    menuIconButton: {
        height: vh(50),
        width: vw(60),
        marginLeft: vw(12.5),
        justifyContent: 'center',
        marginTop: vh(20)
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
        marginLeft: vw(80),
        textTransform: 'capitalize'
    },
});

export default styles;
