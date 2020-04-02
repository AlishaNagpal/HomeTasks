import React from 'react';
import { View, Image, Text, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native';
import styles from './styles'
import { Colors, vh, Strings, Images, vw, VectorIcons } from '../../Constants';
import { connect } from 'react-redux'
import { getChatDATA, deleteChatDATA } from '../../Modules/Chat/ChatAction';

export interface ChatProps {
    navigation?: any,
    value: Array<any>,
    getChatDATA: Function,
    deleteChatDATA: Function
}

export interface ChatState {
    Loader: boolean,
    onLongPress: boolean,
    id: number
}

class ChatComponent extends React.Component<ChatProps, ChatState> {
    constructor(props: ChatProps) {
        super(props);
        this.state = {
            Loader: true,
            onLongPress: false,
            id: 0
        };
    }

    componentDidMount() {
        this.props.getChatDATA()
    }

    deletingData = (id: number) => {
        console.log(id)
        this.setState({
            onLongPress: true,
            id,
        })
       
    }

    deleteData = () => {
        this.props.deleteChatDATA(this.state.id)
        this.setState({
            onLongPress: false,
        })
    }

    onChatPress = () => {
        this.props.navigation.navigate('Chatroom')
    }

    renderData = (rowData: any) => {
        const { item } = rowData
        return (
            <TouchableOpacity onLongPress={() => this.deletingData(item.id)} >
                <View style={styles.row} >
                    <Image source={{ uri: item.image }} style={styles.chatImage} />
                    <TouchableOpacity style={styles.root} onPress={this.onChatPress} activeOpacity={1} >
                        <View style={styles.row2} >
                            <Text style={styles.nameSet} >{item.name}</Text>
                            <Text style={styles.message2} >{item.time}</Text>
                        </View>
                        <View style={styles.time} >
                            <Text style={styles.message} >{item.message}</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={styles.separator} />
                {this.state.onLongPress && (this.state.id === item.id) &&
                    <>
                        <View style={styles.selectView} />
                        <VectorIcons.Feather name="check" color={Colors.white} size={vh(35)} style={styles.icon} />
                    </>
                }
            </TouchableOpacity>
        )
    }

    verifying = () => {
        setTimeout(() => {
            this.setState({
                Loader: false
            })
        }, 1000);
        if (this.props.value && !this.state.Loader) {
            return (
                <FlatList
                    data={this.props.value}
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
                    <Text style={styles.noChat} >No Chats</Text>
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
                    {this.state.onLongPress && <TouchableOpacity onPress={this.deleteData} >
                        <Text style={styles.moreSocial2} > {Strings.delete} </Text>
                    </TouchableOpacity>}
                </View>
                {this.verifying()}
                <ActivityIndicator
                    size="large"
                    color={Colors.socialColor}
                    animating={this.state.Loader}
                />
            </View>
        );
    }
}

function mapDispatchToProps(dispatch: any) {
    return {
        getChatDATA: () => dispatch(getChatDATA()),
        deleteChatDATA: (NewData: number) => dispatch(deleteChatDATA(NewData))
    }
}

function mapStateToProps(state: any) {
    const { value } = state.ChatReducer;
    return {
        value
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ChatComponent);
