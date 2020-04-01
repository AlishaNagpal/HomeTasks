import React from 'react';
import { View, Text, TouchableOpacity, Image, Animated, Alert} from 'react-native';
import styles from './styles';
import { Heart } from '../../Components';
import { Images, vw, VectorIcons, vh } from '../../Constants';
import { useDispatch, useSelector } from 'react-redux';
import { updateValueHome } from '../../Modules/Home/HomeAction';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import Share from 'react-native-share';

export interface FlatListDataProps {
    item: any,
    index: any,
    toggleNumberOfLines: Function,
    TextShown: any,
}

export default function FlatListDataComponent(props: FlatListDataProps) {

    const { value } = useSelector((state: { HomeReducer: any }) => ({
        value: state.HomeReducer.value,
    }));
    const dispatch = useDispatch();
    let prevOpenedRow: any;
    const row: Array<any> = [];

    const _openShareForAll = () => {
        let options = {
          title: 'Share Link: ',
          type: 'url',
          url: props.item.url,
        };
        try {
          Share.open(options).then((response: any) => {
              Alert.alert('Your response has been shared!')
              row[props.index].close()
            // console.log('_openShareForAll ', response);
          });
        } catch (error) {
          console.log('Error ', error);
        }
      };

    const success = (key: string) => {
        row[props.index].close()
        const data = value.filter((item: any) => item.title !== key);
        dispatch(updateValueHome(data))
    }

    const toggle = (index: any) => {
        return props.toggleNumberOfLines && props.toggleNumberOfLines(index)
    }

    const renderLeftActions = (progress: any, dragX: any) => {
        // console.log(dragX)
        const trans = dragX.interpolate({
            inputRange: [0, 50, 100, 301],
            outputRange: [-5, 0, 0, 50]
        });
        const trans2 = dragX.interpolate({
            inputRange: [0, 50, 100, 301],
            outputRange: [0, 0, 0, 100],
        });
        return (
            <View style={styles.row} >
                <Animated.View style={[styles.button, { transform: [{ translateX: trans }] }]} >
                    <TouchableOpacity onPress={_openShareForAll} >
                        <VectorIcons.Entypo name="share" color="white" size={vh(25)} />
                    </TouchableOpacity>
                </Animated.View>
                <Animated.View style={[styles.button2, { transform: [{ translateX: trans2 }] }]} >
                    <TouchableOpacity onPress={() => success(props.item.title)} >
                        <VectorIcons.MaterialIcons name="delete" color="white" size={vh(25)} />
                    </TouchableOpacity>
                </Animated.View>
            </View>
        );
    };

    const closeRow = (index: number) => {
        if (prevOpenedRow && prevOpenedRow !== row[index]) {
            prevOpenedRow.close();
        }
        return prevOpenedRow = row[index];
    }

    return (
        <Swipeable
            ref={ref => row[props.index] = ref}
            renderRightActions={renderLeftActions}
            // onSwipeableOpen={closeRow(props.index)}
            containerStyle={{ paddingRight: vw(20) }}
            >
            <View style={styles.flatlistContainer}>
                <Heart
                    isCheck={false}
                    id={props.index}
                    style={styles.heart}
                />
                <View>
                    <Text style={styles.heading} numberOfLines={1} > {props.item.title} </Text>
                    <TouchableOpacity onPress={() => toggle(props.index)} >
                        <Text
                            numberOfLines={props.TextShown === props.index ? 0 : 2}
                            ellipsizeMode="tail"
                            style={styles.description} >{props.item.description}</Text>
                    </TouchableOpacity>
                </View>
                <Image
                    source={props.item.urlToImage == null ? Images.placeholderImage : { uri: props.item.urlToImage }}
                    style={styles.image}
                />
            </View>
        </Swipeable>
    );
}
