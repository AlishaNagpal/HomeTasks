import { StyleSheet, Platform } from 'react-native';
import { vh, vw, Colors } from '../../Constants';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
    moreSocial: {
        color: Colors.white,
        fontFamily: 'NordiquePro-Regular',
        fontSize: vh(60),
        marginTop: vh(63.5),
    },
    tagLine: {
        color: Colors.white,
        fontFamily: 'Poppins-Regular',
        fontSize: vh(16.5),
        marginTop: Platform.OS === 'ios' ? vh(-24.5) : vh(20),
    },
    logoImage: {
        height: vh(71),
        width: vh(71.5),
        position:'absolute',
        left:vw(33),
        bottom:vh(26.5)
    }
});

export default styles;
