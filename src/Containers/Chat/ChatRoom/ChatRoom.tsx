import React from 'react';
import { GiftedChat } from 'react-native-gifted-chat';
import { TouchableOpacity, View, Text, Image, } from 'react-native';
import styles from './styles'
import { Colors, vh, VectorIcons, vw, Images } from '../../../Constants';
import { Bubble, Composer, Day, InputToolbar } from '../../../Components';
import { connect } from 'react-redux';
import FirebaseServices from '../../../Components/Firebase';


export interface Props {
    navigation?: any,
    route: any,
    result: any,
    userUID: string,
}

interface State {
    uid_otherPerson: string,
    name_otherPerson: string,
    // avatar_otherPerson: string,
    roomId: string,
    loadEarlier: boolean,
    isLoadingEarlier: boolean,
    messages: any[],
    lastMessageKey: string,
    lengthMessage: number,
    typingText: boolean,
}

function compare(a: any, b: any) {
    const bandA = a.mess.createdAt;
    const bandB = b.mess.createdAt;
    let comparison = 0;
    if (bandA > bandB) {
        comparison = 1;
    } else if (bandA < bandB) {
        comparison = -1;
    }
    return comparison * -1;
}

class ChatRoom extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props);
        this.state = {
            uid_otherPerson: this.props.route.params.id,
            name_otherPerson: this.props.route.params.name,
            // avatar_otherPerson: this.props.route.params.imageURL,
            roomId: this.props.route.params.chatRoomId,
            loadEarlier: false,
            isLoadingEarlier: false,
            messages: [],
            lastMessageKey: '',
            lengthMessage: 0,
            typingText: false
        };
    }
    _isMounted = false

    componentDidMount() {
        this._isMounted = true
        FirebaseServices.getTypingValue(this.state.roomId, this.state.uid_otherPerson, this.getTyping)
        FirebaseServices.refOn(this.state.roomId, (message: any) => {
            const ans = message.sort(compare)
            const data: any[] = []
            for (let i = 0; i < ans.length; i++) {
                let mess = ans[i].mess
                data.push(mess)
            }
            this.setState(previousState => ({
                messages: data
                // GiftedChat.append(previousState.messages, message),
            }))
            this.setState({
                lengthMessage: this.state.messages.length
            })
            if (this.state.lengthMessage === 20) {
                const getLastMessageKey = ans[19].id
                this.setState({
                    lastMessageKey: getLastMessageKey,
                    loadEarlier: true
                })
            }
        })
    }

    componentWillUnmount() {
        this._isMounted = false
    }

    onLoadEarlier = () => {
        if (this.state.lastMessageKey) {
            this.setState(() => {
                return {
                    isLoadingEarlier: true,
                }
            })

            setTimeout(() => {
                if (this._isMounted === true) {
                    FirebaseServices.getPreviousMessages(this.state.roomId, this.state.lastMessageKey, (message: any[]) => {
                        const sorted = message.sort(compare)
                        sorted.splice(0, 1)
                        const data: any[] = []
                        for (let i = 0; i < sorted.length; i++) {
                            const mess = sorted[i].mess
                            data.push(mess)
                        }

                        if (sorted.length === 19) {
                            const getLastMessageKey = sorted[18].id
                            this.setState({
                                loadEarlier: true,
                                lastMessageKey: getLastMessageKey,
                            })
                        } else {
                            this.setState({ loadEarlier: false, })
                        }

                        this.setState(previousState => ({
                            messages: [...this.state.messages, ...data],
                            isLoadingEarlier: false,
                        }))
                    })
                }
            }, 1000)
        }
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
                    <VectorIcons.FontAwesome name="send" color={Colors.socialColor} size={vh(20)} style={styles.sendIcon} />
                </TouchableOpacity>
            </View>
        )
    }

    goBack = () => {
        this.props.navigation.goBack()
        FirebaseServices.ChangeTypingText(this.state.roomId, this.props.userUID, false)
    }

    ontextChanged = (val: string) => {
        if (val !== '') {
            FirebaseServices.ChangeTypingText(this.state.roomId, this.props.userUID, true)
        } else {
            FirebaseServices.ChangeTypingText(this.state.roomId, this.props.userUID, false)
        }
    }

    getTyping = (data: boolean) => {
        this.setState({
            typingText: data
        })
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

    get user() {
        return {
            name: this.props.result.name,
            avatar: this.props.result.profilePic,
            idRoom: this.state.roomId,
            _id: this.props.userUID,
            otherID: this.state.uid_otherPerson,
            otherPersonName: this.state.name_otherPerson
        };
    }

    render() {
        return (
            <View style={styles.main} >
                <TouchableOpacity style={styles.headerView} activeOpacity={1} onPress={this.goBack}  >
                    <Image source={Images.forgotPasswordBackArrow} style={styles.icon} />
                    <Image
                        source={Images.mainScreen}
                        style={styles.imageStyle}
                    />
                    <View>
                        <Text style={styles.nameText} >{this.state.name_otherPerson}</Text>
                        <Text style={styles.typingText} >{this.state.typingText ? 'typing...' : ''}</Text>
                    </View>
                </TouchableOpacity>
                <GiftedChat
                    messages={this.state.messages}
                    onSend={FirebaseServices.send}
                    loadEarlier={this.state.loadEarlier}
                    onLoadEarlier={this.onLoadEarlier}
                    isLoadingEarlier={this.state.isLoadingEarlier}
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
                    // @ts-ignore
                    ref={(ref) => this.inputText = ref}
                    renderDay={this.renderDay}
                    renderInputToolbar={this.renderInputToolbar}
                    minComposerHeight={vw(45)}
                    maxComposerHeight={vw(80)}
                    onInputTextChanged={(val) => this.ontextChanged(val)} // changes over here
                />
            </View>
        );
    }
}

function mapDispatchToProps(dispatch: any) {
    return {
    }
}

function mapStateToProps(state: any) {
    const { result, userUID } = state.SignUpReducer;
    return {
        userUID,
        result
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ChatRoom);