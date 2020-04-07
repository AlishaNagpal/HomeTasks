import React from 'react';
import { View, Image, Text, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native';
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
    chatsPresent: boolean
}


class Chat extends React.Component<ChatProps, ChatState> {
    constructor(props: ChatProps) {
        super(props);
        this.state = {
            userArray: [],
            longPress: false,
            otherPersonID: '',
            chatsPresent: false
        };
    }

    componentDidMount() {
        FirebaseServices.readInboxData(this.props.userUID, this.getLastMessages)
    }


    // sorting the data as per the timestamp
    getUniqueData = (data: any) => {
        const emptyArray = this.state.userArray;
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
        setTimeout(() => {
            for (let i = 0; i < emptyArray.length; i++) {
                let chatRoomId = '';
                if (this.props.userUID > emptyArray[i][1].otherId) {
                    chatRoomId = this.props.userUID.concat(emptyArray[i][1].otherId)
                } else {
                    chatRoomId = emptyArray[i][1].otherId.concat(this.props.userUID)
                }
                FirebaseServices.deleteNodeInfo(this.props.userUID, chatRoomId, (dataHere: number) => {
                    if (!dataHere) {
                        FirebaseServices.unreadMessages(chatRoomId, emptyArray[i][1].otherId, (messages: any) => {
                            FirebaseServices.unreadMessageCount(this.props.userUID, emptyArray[i][1].otherId, messages)
                        })
                    }
                    this.forceUpdate()
                })
            }
        }, 2000);

        setTimeout(() => {
            this.setState({
                userArray: emptyArray,
                chatsPresent: true
            })
        }, 1000);
    }

    // getting the last messages of the one-on-one chat
    getLastMessages = (data: any) => {
        if (data) {
            const result: any[] = Object.keys(data).map(function (key) {
                return [String(key), data[key]];
            })
            for (let i = 0; i < result.length; i++) {
                this.getUniqueData(result[i])
            }
        }
    }

    onChatPress = (id: string, name: string) => {
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
                chatRoomId
            })
    }

    deleteChatThread = () => {
        let chatRoomId = '';
        if (this.props.userUID > this.state.otherPersonID) {
            chatRoomId = this.props.userUID.concat(this.state.otherPersonID)
        } else {
            chatRoomId = this.state.otherPersonID.concat(this.props.userUID)
        }
        FirebaseServices.deleteChatThread(this.props.userUID, chatRoomId, this.state.otherPersonID)
        FirebaseServices.readInboxData(this.props.userUID, this.getLastMessages)
        this.setState({
            longPress: false
        })

    }

    longPressDelete = (otherPersonID: string) => {
        this.setState({
            otherPersonID,
            longPress: true
        })
    }

    renderData = (rowData: any) => {
        const { item } = rowData
        return (
            <View>
                <TouchableOpacity style={styles.row} onLongPress={() => this.longPressDelete(item[0])} >
                    <Image source={Images.dummyUserImage} style={styles.chatImage} />
                    <TouchableOpacity style={styles.root} onPress={() => this.onChatPress(item[0], item[1].otherName)} activeOpacity={1} >
                        <View style={styles.row2} >
                            <Text style={styles.nameSet} >{item[1].otherName}</Text>
                            <Text style={styles.message} >{item[1].gettingTime}</Text>

                        </View>
                        <View style={styles.time} >
                            <Text style={styles.lastMessage} >{item[1].text}</Text>
                            {item[1].unreadMessages !== 0 && <View style={styles.unreadView}>
                                <Text style={styles.unreadMessages} >{item[1].unreadMessages}</Text>
                            </View>}
                        </View>
                    </TouchableOpacity>
                </TouchableOpacity>
                {this.state.longPress && this.state.otherPersonID === item[0] &&
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