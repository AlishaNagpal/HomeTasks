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
    Loader: boolean
}


class Chat extends React.Component<ChatProps, ChatState> {
    constructor(props: ChatProps) {
        super(props);
        this.state = {
            userArray: [],
            Loader: false
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

        for (let i = 0; i < emptyArray.length; i++) {
            let chatRoomId = '';
            if (this.props.userUID > emptyArray[i][1].otherId) {
                chatRoomId = this.props.userUID.concat(emptyArray[i][1].otherId)
            } else {
                chatRoomId = emptyArray[i][1].otherId.concat(this.props.userUID)
            }

            FirebaseServices.unreadMessages(chatRoomId, emptyArray[i][1].otherId, (messages: any) => {
                FirebaseServices.unreadMessageCount(this.props.userUID, emptyArray[i][1].otherId, messages)
            })
        }

        setTimeout(() => {
            this.setState({
                Loader: false,
                userArray: emptyArray
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

    renderData = (rowData: any) => {
        const { item } = rowData
        return (
            <View>
                <View style={styles.row} >
                    <Image source={Images.dummyUserImage} style={styles.chatImage} />
                    <TouchableOpacity style={styles.root} onPress={() => this.onChatPress(item[0], item[1].otherName)} activeOpacity={1} >
                        <View style={styles.row2} >
                            <Text style={styles.nameSet} >{item[1].otherName}</Text>
                            <Text style={styles.message} >{item[1].gettingTime}</Text>

                        </View>
                        <View style={styles.time} >
                            <Text style={styles.lastMessage} >{item[1].text}</Text>
                            { item[1].unreadMessages !== 0 &&  <View style={styles.unreadView}>
                                <Text style={styles.unreadMessages} >{item[1].unreadMessages}</Text>
                            </View>}
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={styles.separator} />
            </View>
        )
    }

    verifying = () => {
        if (this.state.userArray && !this.state.Loader) {
            return (
                <FlatList
                    data={this.state.userArray}
                    renderItem={this.renderData}
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

    public render() {
        return (
            <View style={styles.container} >
                <View style={styles.header}>
                    <TouchableOpacity style={styles.menuIconButton} onPress={() => this.props.navigation.openDrawer()} >
                        <Image source={Images.menuIcon} style={styles.menuIcon} />
                    </TouchableOpacity>
                    <Text style={styles.moreSocial} > {Strings.messages} </Text>
                    <TouchableOpacity style={styles.addUser} onPress={() => this.props.navigation.navigate('UserListing')}>
                        <VectorIcons.Ionicons name={'ios-add-circle'} color={Colors.white} size={vh(23)} />
                    </TouchableOpacity>
                </View>
                {this.verifying()}
                <ActivityIndicator
                    size="large"
                    color={Colors.socialColor}
                    animating={this.state.Loader}
                />
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