import React, { useState, useEffect } from 'react';
import { View, Image, Text, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native';
import styles from './styles'
import { Colors, Strings, Images } from '../../../Constants';
import { useSelector } from 'react-redux'
import firebaseSDK from '../../../Components/Firebase';

export interface UserListingProps {
    navigation?: any
}


export default function UserListingComponent(props: UserListingProps) {

    const [userArray, setUserArray] = useState<any>([]);
    const [Loader, setLoader] = useState(false);

    const { userUID } = useSelector((state: { SignUpReducer: any }) => ({
        userUID: state.SignUpReducer.userUID,
    }));

    useEffect(() => {
        firebaseSDK.readUserData(getUsers)
    })

    const getUsers = (users: any) => {
        if (users) {
            const result = Object.keys(users).map(function (key) {
                return [String(key), users[key]];
            })
            const emptyArray = result;
            const indexToFind = emptyArray.findIndex((item: any) => item[0] === userUID)
            if (indexToFind !== -1) {
                emptyArray.splice(indexToFind, 1)
                setUserArray(emptyArray)
            } else if (indexToFind === -1) {
                setUserArray(emptyArray)
            }
        }
    }

    const onChatPress = (id: string, name: string) => {
        let chatRoomId = '';
        if (userUID > id) {
            chatRoomId = userUID.concat(id)
        } else {
            chatRoomId = id.concat(userUID)
        }
        props.navigation.navigate('Chatroom',
            {
                id,
                name,
                // imageURL,
                chatRoomId
            })
    }

    const renderData = (rowData: any) => {
        const { item } = rowData
        return (
            <View>
                <View style={styles.row} >
                    <Image source={Images.dummyUserImage} style={styles.chatImage} />
                    <TouchableOpacity style={styles.root}
                        onPress={() =>
                            onChatPress(
                                item[0],
                                item[1].name,
                                // item[1].image
                            )} activeOpacity={1} >
                        <View style={styles.row2} >
                            <Text style={styles.nameSet} >{item[1].name}</Text>
                        </View>
                        <View style={styles.time} >
                            <Text style={styles.message} >{item[1].email}</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={styles.separator} />
            </View>
        )
    }

    const verifying = () => {
        setTimeout(() => {
            setLoader(false)
        }, 1000);
        if (userArray && !Loader) {
            return (
                <FlatList
                    data={userArray}
                    renderItem={renderData}
                    keyExtractor={(item, index) => index.toString()}
                />
            )
        } else {
            return (
                <View style={styles.centerNoChats}>
                    <Image
                        source={Images.social}
                        style={styles.noChatImage}
                    />
                    <Text style={styles.noChat} >No Users</Text>
                </View>
            )
        }
    }

    return (
        <View style={styles.container} >
            <View style={styles.header}>
                <TouchableOpacity style={styles.menuIconButton} onPress={() => props.navigation.goBack()} >
                    <Image source={Images.forgotPasswordBackArrow} style={styles.menuIcon} />
                </TouchableOpacity>
                <Text style={styles.moreSocial} > {Strings.messages} </Text>
            </View>
            {verifying()}
            <ActivityIndicator
                size="large"
                color={Colors.socialColor}
                animating={Loader}
            />
        </View>
    );
}
