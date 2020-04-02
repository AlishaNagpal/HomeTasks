import React from 'react';
import { GiftedChat } from 'react-native-gifted-chat';
import {TouchableOpacity, View, Text, Image, } from 'react-native';
import styles from './styles'
import { Colors, vh, VectorIcons, vw } from '../../../Constants';
import { Bubble, Composer, Day, InputToolbar } from '../../../Components'


export interface Props {
    navigation?: any,
}

interface State {
    uid: string,
    name: string,
    avatar: string,
    otherPersonName: string,
    messages: Array<any>,
    lastMessageKey: string,
}
const image = 'https://images.unsplash.com/photo-1526047932273-341f2a7631f9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60';

export default class Chat extends React.Component<Props, State> {
    
    constructor(props: Props) {
        super(props);
        this.state = {
            uid: Math.random().toString(),
            name: 'Alisha Nagpal',
            avatar: image,
            otherPersonName: 'Roy',
            messages: [],
            lastMessageKey: '',
        };
        this.onSend = this.onSend.bind(this);
    }
    componentWillMount() {
        this.setState({
            messages: [
                {
                    _id: 1,
                    text: 'Hello developer',
                    createdAt: new Date(Date.UTC(2016, 7, 30, 17, 20, 0)),
                    user: {
                        _id: 2,
                        name: 'React Native',
                        avatar: 'https://reactjs.org/logo-og.png',
                    },
                },
            ],
        });
    }
    onSend(messages = []) {
        this.setState((previousState) => {
            return {
                messages: GiftedChat.append(previousState.messages, messages),
            };
        });
    }

    get user() {
        return {
            name: this.state.name,
            avatar: this.state.avatar,
            _id: 1,
        };
    }

    renderSend = (props: any) => {
        const message = this.inputText.state.text || '';
        return (
            <View style={styles.sendView}>
                <TouchableOpacity style={styles.sendBtn} activeOpacity={1} onPress={() => {
                    if (message.trim().length > 0) {
                        this.inputText.onSend(
                            {
                                text: message.trim()
                            },
                            true
                        );
                    } else {
                        return;
                    }
                }}>
                    <VectorIcons.FontAwesome name='send' color={Colors.socialColor} size={vh(25)} style={styles.sendIcon} />
                </TouchableOpacity>
            </View>
        )
    }

    renderBubble = (props: any) => {
        return (
            <Bubble {...props} />
        );
    }

    renderComposer = (props: any) => {
        return (
            <Composer {...props} />
        )
    }

    renderDay = (props: any) => {
        return (
            <Day {...props} />
        )
    }

    renderInputToolbar = (props: any) => {
        return (
            <InputToolbar {...props} />
        )
    }

    render() {
        return (
            <View style={styles.main} >
                <TouchableOpacity style={styles.headerView} activeOpacity={1} onPress={()=>this.props.navigation.goBack()}  >
                    <VectorIcons.Ionicons name={'md-arrow-back'} size={vh(30)} style={styles.icon} />
                    <Image
                        source={{ uri:'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500' }}
                        style={styles.imageStyle}
                    />
                    <View>
                        <Text style={styles.nameText} >{this.state.otherPersonName}</Text>
                        <Text style={styles.typingText} >{this.state.typingText ? 'typing...' : ''}</Text>
                    </View>
                </TouchableOpacity>
                <GiftedChat
                    messages={this.state.messages}
                    onSend={this.onSend}
                    user={this.user}
                    renderAvatarOnTop={true}
                    alwaysShowSend={true}
                    showAvatarForEveryMessage={false}
                    showUserAvatar={true}
                    placeholder={'Enter your message'}
                    scrollToBottom={true}
                    renderBubble={this.renderBubble}
                    timeTextStyle={{ left: { color: Colors.socialColor }, right: { color: Colors.white } }}
                    renderSend={this.renderSend}
                    renderComposer={this.renderComposer}
                    messagesContainerStyle={styles.messagesContainerStyle}
                    //@ts-ignore
                    ref={(ref) => this.inputText = ref}
                    renderDay={this.renderDay}
                    minComposerHeight={vw(45)}
                    maxComposerHeight={vw(80)}
                    renderInputToolbar={this.renderInputToolbar}
                />
            </View>
        );
    }
}
