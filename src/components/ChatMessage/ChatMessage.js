import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { MdInsertEmoticon } from 'react-icons/md';
import { RiMore2Fill } from 'react-icons/ri';
import { BsFillReplyFill, BsFillCircleFill } from 'react-icons/bs';

import jwt_decode from 'jwt-decode';
import axios from 'axios';

import { socket } from '../../App';

import '../ChatMessage/ChatMessage.scss';

function ChatMessage(props) {
    const token = localStorage.getItem('userToken');
    const user = jwt_decode(token);

    const { messages } = useSelector(state => state.message);
    const { roomId } = useParams();
    const dispatch = useDispatch();
    const messagesEndRef = useRef(null);

    const [messageList, setMessageList] = useState(null);

    const scrollDown = () => {
        messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }

    useEffect(() => {
        async function receiveMessage() {
            const res = await axios.get(`http://localhost:8080/message/${roomId}`);

            dispatch({
                type: 'GET_MESSAGES',
                payload: res.data
            })

            socket.on('receive message', data => {
                res.data.push(data);
                setMessageList(res.data);
            });
            if(props.color) scrollDown();
        }
        receiveMessage();
    }, [roomId, messageList, props.color])

    useEffect(() => {
        scrollDown();
    }, [roomId === props.room._id, messageList])

    return (
        <div className="message-container">
            {
                messages.length && messages.map(message => {
                    const emoji_regex = /^(?:[\u2700-\u27bf]|(?:\ud83c[\udde6-\uddff]){2}|[\ud800-\udbff][\udc00-\udfff]|[\u0023-\u0039]\ufe0f?\u20e3|\u3299|\u3297|\u303d|\u3030|\u24c2|\ud83c[\udd70-\udd71]|\ud83c[\udd7e-\udd7f]|\ud83c\udd8e|\ud83c[\udd91-\udd9a]|\ud83c[\udde6-\uddff]|[\ud83c[\ude01-\ude02]|\ud83c\ude1a|\ud83c\ude2f|[\ud83c[\ude32-\ude3a]|[\ud83c[\ude50-\ude51]|\u203c|\u2049|[\u25aa-\u25ab]|\u25b6|\u25c0|[\u25fb-\u25fe]|\u00a9|\u00ae|\u2122|\u2139|\ud83c\udc04|[\u2600-\u26FF]|\u2b05|\u2b06|\u2b07|\u2b1b|\u2b1c|\u2b50|\u2b55|\u231a|\u231b|\u2328|\u23cf|[\u23e9-\u23f3]|[\u23f8-\u23fa]|\ud83c\udccf|\u2934|\u2935|[\u2190-\u21ff])+$/;

                    switch (message.type) {
                        case "message":
                            if(message.sender === user.id) {
                                return (
                                    <div className="message-right" key={message._id}>
                                        <div className="message-right-button">
                                            <button><RiMore2Fill/></button>
                                            <button ><BsFillReplyFill/></button>
                                            <button className="btn-react"><MdInsertEmoticon/></button>
                                        </div>
                                        <div
                                            className={message.text.length < 50 ? 'message-right-text' : 'message-text-length'}
                                            style={{ background: emoji_regex.test(message.text) ? 'transparent' : props.room.roomTheme?.background, fontSize: emoji_regex.test(message.text) && '30px' }}
                                        >
                                            <span>{message.text}</span>
                                        </div>
                                    </div>
                                )
                            } else {
                                return (
                                    <div className="message-left" key={message._id}>
                                        <div
                                            className={message.text.length < 50 ? 'message-left-text' : 'message-text-length'}
                                            style={{ background: emoji_regex.test(message.text) ? 'transparent' : props.room.roomTheme?.background }}
                                        >
                                            <span>{message.text}</span>
                                        </div>
                                        <div className="message-left-button">
                                            <button className="btn-react"><MdInsertEmoticon/></button>
                                            <button ><BsFillReplyFill/></button>
                                            <button><RiMore2Fill/></button>
                                        </div>
                                    </div>
                                )
                            }
                        case "image":
                            if(message.sender === user.id) {
                                return (
                                    <div className="message-right" key={message._id}>
                                        <div className="message-right-button">
                                            <button><RiMore2Fill/></button>
                                            <button ><BsFillReplyFill/></button>
                                            <button className="btn-react"><MdInsertEmoticon/></button>
                                        </div>
                                        <div className='message-right-img'>
                                            <img src={message.text}/>
                                        </div>
                                    </div>
                                )
                            } else {
                                return (
                                    <div className="message-left" key={message._id}>
                                        <div className='message-left-img'>
                                            <img src={message.text}/>
                                        </div>
                                        <div className="message-left-button">
                                            <button className="btn-react"><MdInsertEmoticon/></button>
                                            <button ><BsFillReplyFill/></button>
                                            <button><RiMore2Fill/></button>
                                        </div>
                                    </div>
                                )
                            }
                        case "change-theme":
                            const member = props.room.members?.find(member => member._id != user.id);
                            const messOfCurrentUser = message.sender == user.id;

                            return  <div className="message-center" key={message._id}>
                                        <span className="message-center-text">{messOfCurrentUser ? `You changed the color of theme to ` : `${member?.lastname} ${member?.firstname} changed the color of theme to ` }
                                        <BsFillCircleFill style={{ color: message.text, margin: '0 5px' }}/></span>
                                    </div>
                        default:
                            <div></div>;
                    }

                })
            }
            <div ref={messagesEndRef}></div>
        </div>
    )
}

export default ChatMessage;
