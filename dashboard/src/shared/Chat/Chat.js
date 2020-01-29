import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

// Components //
import InputToolbar from './InputToolbar';
import MessagesList from './MessagesList';

const Root = styled.div`
    flex: 1;
`;

const MessagesWrapper = styled.div`
    height: calc(100vh - ${({ inputToolbarHeight }) => inputToolbarHeight}px);
`;

class Chat extends Component {
    static propTypes = {
        placeholder: PropTypes.string,
        textInputProps: PropTypes.object,
        user: PropTypes.object,
    };

    static defaultProps = {
        placeholder: 'Write something...',
        onSend: () => console.log,
    };

    state = {
        inputToolbarHeight: 0,
        isMounted: false,
        messages: new Array(100).fill(0).map((_, index) => ({
            _id: index,
        })),
        text: '',
        typingDisabled: false,
    };

    componentDidMount() {
        this.setState({ isMounted: true });
    }

    onInputTextChanged = text => {
        const { typingDisabled } = this.state;
        const { onInputTextChanged } = this.props;
        if (typingDisabled) {
            return;
        }

        if (onInputTextChanged) {
            onInputTextChanged(text);
        }

        this.setState({
            text,
        });
    };

    onSend = (messages = [], shouldResetInputToolbar = false) => {
        const { onSend, user } = this.props;
        const { isMounted } = this.state;
        if (!Array.isArray(messages)) {
            messages = [messages];
        }
        const newMessages = messages.map(message => {
            return {
                ...message,
                user,
                created_at: new Date(),
            };
        });

        if (shouldResetInputToolbar === true) {
            this.setState({ typingDisabled: true });
            this.resetInputToolbar();
        }

        onSend(newMessages);
        this.messageContainerRef.scrollToEnd();

        if (shouldResetInputToolbar === true) {
            setTimeout(() => {
                if (isMounted === true) {
                    this.setState({ typingDisabled: false });
                }
            }, 100);
        }
    };

    renderInputToolbar = () => {
        const { text } = this.state;
        const { placeholder, textInputProps } = this.props;
        const { onInputTextChanged, onSend } = this;

        const props = {
            text,
            onSend,
            onTextChanged: onInputTextChanged,
            placeholder,
            textInputProps: {
                ...textInputProps,
                ref: input => (this.textInput = input),
            },
        };

        return (
            <InputToolbar onResize={this.setInputToolbarHeight} {...props} />
        );
    };

    resetInputToolbar = () => {
        if (this.textInput) {
            this.textInput.value = '';
        }
        this.setState({
            text: '',
        });
    };

    scrollTo = (index, animated = true) => {
        if (this.messageContainerRef !== null) {
            this.messageContainerRef.scrollToIndex(index, animated);
        }
    };

    setActionsOpen = actionsOpen =>
        this.setState({
            actionsOpen,
        });

    setInputToolbarHeight = ({ height }) =>
        this.setState({
            inputToolbarHeight: height,
        });

    setMessageContainerRef = el => {
        this.messageContainerRef = el;
    };

    render() {
        const { inputToolbarHeight, messages } = this.state;
        return (
            <Root>
                <MessagesWrapper {...{ inputToolbarHeight }}>
                    <MessagesList
                        {...{ inputToolbarHeight }}
                        data={messages}
                        setMessageContainerRef={this.setMessageContainerRef}
                    />
                </MessagesWrapper>
                {this.renderInputToolbar()}
            </Root>
        );
    }
}

export default Chat;
