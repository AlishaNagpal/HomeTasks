import React, { useState, useEffect } from 'react';
import { View, Image, Text, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native';
import styles from './styles'
import { Colors, Strings, Images, VectorIcons, vh } from '../../Constants';
import { useSelector } from 'react-redux'
import FirebaseServices from '../../Components/Firebase';

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
        FirebaseServices.readInboxData(userUID, getLastMessages)
    })

    // sorting the data as per the timestamp
    const getUniqueData = (data: any) => {
        const emptyArray = userArray;
        const index = emptyArray.findIndex((item: any) => item[0] === data[0])
        if (index !== -1) {
            emptyArray.splice(index, 1)
            emptyArray.push(data)
        } else {
            emptyArray.push(data)
        }
        function compareWhole(a: any, b: any) {
            const bandA = a[1].createdAt;
            const bandB = b[1].createdAt;
            let comparison = 0;
            if (bandA > bandB) {
                comparison = 1;
            } else if (bandA < bandB) {
                comparison = -1;
            }
            return comparison * -1;
        }
        emptyArray.sort(compareWhole)
        setUserArray(emptyArray)
    }

    // getting the last messages of the one-on-one chat
    const getLastMessages = (data: any) => {
        if (data) {
            const result: any[] = Object.keys(data).map(function (key) {
                return [String(key), data[key]];
            })
            for (let i = 0; i < result.length; i++) {
                getUniqueData(result[i])
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
                chatRoomId
            })
    }

    const renderData = (rowData: any) => {
        const { item } = rowData
        return (
            <View>
                <View style={styles.row} >
                    <Image source={Images.dummyUserImage} style={styles.chatImage} />
                    <TouchableOpacity style={styles.root} onPress={() => onChatPress(item[0], item[1].otherName)} activeOpacity={1} >
                        <View style={styles.row2} >
                            <Text style={styles.nameSet} >{item[1].otherName}</Text>
                            <Text style={styles.message} >{item[1].gettingTime}</Text>

                        </View>
                        <View style={styles.time} >
                            <Text style={styles.lastMessage} >{item[1].text}</Text>

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
                <TouchableOpacity style={styles.menuIconButton} onPress={() => props.navigation.openDrawer()} >
                    <Image source={Images.menuIcon} style={styles.menuIcon} />
                </TouchableOpacity>
                <Text style={styles.moreSocial} > {Strings.messages} </Text>
                <TouchableOpacity style={styles.addUser} onPress={() => props.navigation.navigate('UserListing')}>
                    <VectorIcons.Ionicons name={'ios-add-circle'} color={Colors.white} size={vh(23)} />
                </TouchableOpacity>
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
