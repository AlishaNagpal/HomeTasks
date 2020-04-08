import React from 'react';
import { View, Image, Text, TouchableOpacity, FlatList, Alert } from 'react-native';
import styles from './styles'
import { Colors, Strings, Images, VectorIcons, vh } from '../../Constants';
import FirebaseServices from '../../Components/Firebase';
import { connect } from 'react-redux';

export interface ChatProps {
    navigation?: any,
    userUID: string
}

export interface ChatState {
    userArray: any[],
    longPress: boolean,
    otherPersonID: string,
    chatsPresent: boolean,
    refreshing: boolean
}


class Chat extends React.Component<ChatProps, ChatState> {
    constructor(props: ChatProps) {
        super(props);
        this.state = {
            userArray: [],
            longPress: false,
            otherPersonID: '',
            chatsPresent: false,
            refreshing: false
        };
    }

    componentDidMount() {
        FirebaseServices.readInboxData(this.props.userUID, this.getLastMessages)
    }

    // getting the last messages of the one-on-one chat
    getLastMessages = (data: any) => {
        if (data) {
            this.setState({ userArray: data, chatsPresent: true },()=> this.getUnreadMessages())
        }
    }

    // getting unread messages
    getUnreadMessages = () => {
        const data = this.state.userArray;
        for (let i = 0; i < data.length; i++) {
            let chatRoomId = '';
            if (this.props.userUID > data[i].id) {
                chatRoomId = this.props.userUID.concat(data[i].id)
            } else {
                chatRoomId = data[i].id.concat(this.props.userUID)
            }
            // FirebaseServices.deleteNodeInfo(this.props.userUID, chatRoomId, (dataHere: number) => {
            //     if (!dataHere) {
            FirebaseServices.unreadMessages(chatRoomId, data[i].otherId, (messages: any) => {
                FirebaseServices.unreadMessageCount(this.props.userUID, data[i].otherId, messages)
            })
            //     }
            // })
        }

    }


    // going forward
    onChatPress = (id: string, name: string, imageURL: string) => {
        let chatRoomId = '';
        if (this.props.userUID > id) {
            chatRoomId = this.props.userUID.concat(id)
        } else {
            chatRoomId = id.concat(this.props.userUID)
        }
        this.props.navigation.navigate('Chatroom',
            {
                id,
                name,
                imageURL,
                chatRoomId
            })
    }

    // deleting chat thread here 
    deleteChatThread = () => {
        Alert.alert(
            'Delete this Chat Thread?',
            'This action cannot be undone.',
            [
                { text: 'Cancel', style: 'cancel' },
                {
                    text: 'OK', onPress: () => {
                        let chatRoomId = '';
                        if (this.props.userUID > this.state.otherPersonID) {
                            chatRoomId = this.props.userUID.concat(this.state.otherPersonID)
                        } else {
                            chatRoomId = this.state.otherPersonID.concat(this.props.userUID)
                        }
                        FirebaseServices.deleteChatThread(this.props.userUID, chatRoomId, this.state.otherPersonID, () => {
                            FirebaseServices.readInboxData(this.props.userUID, this.getLastMessages)
                        })
                        this.setState({
                            longPress: false,
                        })
                    }
                },
            ],
            { cancelable: false }
        )
    }

    longPressDelete = (otherPersonID: string) => {
        this.setState({
            otherPersonID,
            longPress: true
        })
    }

    // refreshing flat list
    refresh = () => {
        this.setState({ refreshing: true })
        FirebaseServices.readInboxData(this.props.userUID, this.getLastMessages)
        this.forceUpdate()
        setTimeout(() => {
            this.setState({ refreshing: false })
        }, 300);
    }

    renderData = (rowData: any) => {
        const { item } = rowData
        return (
            <View>
                <TouchableOpacity style={styles.row} onLongPress={() => this.longPressDelete(item.otherId)} >
                    <Image source={{ uri: item.otherPersonAvatar }} style={styles.chatImage} />
                    <TouchableOpacity style={styles.root} onPress={() => this.onChatPress(item.otherId, item.otherName, item.otherPersonAvatar)} activeOpacity={1} >
                        <View style={styles.row2} >
                            <Text style={styles.nameSet} >{item.otherName}</Text>
                            <Text style={styles.message} >{item.gettingTime}</Text>

                        </View>
                        <View style={styles.time} >
                            <Text style={styles.lastMessage} >{item.text}</Text>
                            {item.unreadMessages !== 0 && <View style={styles.unreadView}>
                                <Text style={styles.unreadMessages} >{item.unreadMessages}</Text>
                            </View>}
                        </View>
                    </TouchableOpacity>
                </TouchableOpacity>
                {this.state.longPress && this.state.otherPersonID === item.otherId &&
                    <>
                        <View style={styles.overlappingView} />
                        <VectorIcons.Feather name={'check'} color={'red'} size={vh(55)} style={styles.deleteIcon} />
                    </>
                }
                <View style={styles.separator} />
            </View>
        )
    }

    public render() {
        return (
            <View style={styles.container} >
                <View>
                    <View style={styles.header}>
                        <TouchableOpacity style={styles.menuIconButton} onPress={() => this.props.navigation.openDrawer()} >
                            <Image source={Images.menuIcon} style={styles.menuIcon} />
                        </TouchableOpacity>
                        <Text style={styles.moreSocial} > {Strings.messages} </Text>
                        {this.state.longPress &&
                            <TouchableOpacity style={styles.deleteChat} onPress={this.deleteChatThread}>
                                <Text style={styles.deleteChatThread}> {Strings.delete} </Text>
                            </TouchableOpacity>
                        }
                    </View>
                    {this.state.userArray && this.state.chatsPresent
                        ?
                        <FlatList
                            data={this.state.userArray}
                            renderItem={this.renderData}
                            keyExtractor={(item, index) => index.toString()}
                            refreshing={this.state.refreshing}
                            onRefresh={this.refresh}
                        />
                        :
                        <View style={styles.centerNoChats}>
                            <Image
                                source={Images.social}
                                style={styles.noChatImage}
                            />
                            <Text style={styles.noChat} >{Strings.noChats}</Text>
                        </View>
                    }
                </View>
                <TouchableOpacity style={styles.addUser} onPress={() => this.props.navigation.navigate('UserListing')}>
                    <VectorIcons.Ionicons name={'ios-add-circle'} color={Colors.socialColor} size={vh(38)} />
                </TouchableOpacity>
            </View >
        );
    }
}

function mapDispatchToProps(dispatch: any) {
    return {
    }
}

function mapStateToProps(state: any) {
    const { userUID } = state.SignUpReducer;
    return {
        userUID
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Chat);