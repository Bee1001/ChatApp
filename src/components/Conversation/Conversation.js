import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { FaVideo } from 'react-icons/fa';
import { RiPhoneFill, RiEmotionHappyFill } from 'react-icons/ri';
import { TiMicrophone } from 'react-icons/ti';
import { IoAttachOutline, IoImageSharp } from 'react-icons/io5';
import { CgMoreO } from 'react-icons/cg';
import { MdSend } from 'react-icons/md';

import jwt_decode from 'jwt-decode';
import moment from 'moment';
import Picker from 'emoji-picker-react';
import Resizer from 'react-image-file-resizer';

import ChatMessage from '../ChatMessage/ChatMessage';
import { uploadImage } from '../../hooks/useUploadImage';

import actions from '../../redux/actions/room';
import { socket } from '../../App';

import './Conversation.scss';

function Conversation() {
    const token = localStorage.getItem('userToken');
    const user = jwt_decode(token);

    const { room } = useSelector(state => state.room);
    const { roomId } = useParams();
    const dispatch = useDispatch();
    const inputRef = useRef(null);

    const [recipient, setRecipient] = useState({});
    const [message, setMessage] = useState('');
    const [color, setColor] = useState(null);
    const [showPicker, setShowPicker] = useState(false);

    useEffect(() => {
        socket.on('set theme', data => {
            dispatch({
                type: 'GET_ROOM',
                payload: data.room
            })
            setColor(data.theme);
        })
    }, [color])

    useEffect(() => {
        dispatch(actions.getRoom(roomId));
    }, [roomId === room._id, color])

    useEffect(() => {
        if(room._id && roomId === room._id)
            setRecipient(room.members.find(member => member._id !== user.id));
    }, [roomId === room._id])

    const handleChange = (e) => {
        setMessage(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setMessage('');
        if(message.trim())
            socket.emit('send message', message.trim(), roomId, user.id, recipient._id);
    }

    const handleSendEmoji = (emoji) => {
        socket.emit('send message', emoji, roomId, user.id, recipient._id);
    }

    const onEmojiClick = (e, emojiObject) => {
        setMessage(prevMess => prevMess + emojiObject.emoji);
    }

    const themeStyle = {
        color: room.roomTheme?.color
    }

    const handleFileInput = () => {
        inputRef.current.click();
    }

    const resizeFile = (file) => {
        new Promise((resolve) => {
            Resizer.imageFileResizer(
                file,
                300,
                400,
                "JPEG",
                80,
                0,
                (uri) => {
                    resolve(uri);
                },
                "base64"
            );
        })
    }

    const handleSendImage = async (e) => {
        const file = e.target.files[0];
        const image = await resizeFile(file);

        const res = await uploadImage(file);
        // socket.emit('send image', res.data, roomId, user.id, recipient._id);
    }

    return (
        <div className="conversation">
            <div className="conversation-header">
                <div className="conversation-header-left">
                    <img
                        src={recipient.avatar}
                        alt="avatar"
                        style={{
                            border: recipient.online ? 'solid 2px lightgreen' : 'solid 2px #E9EAEC'
                        }}
                    />
                    <div className="conversation-header-info">
                        <span>{`${recipient.lastname} ${recipient.firstname}`}</span>
                        <span>{recipient.online ? 'Just now' : moment(recipient.lastActivity).fromNow()}</span>
                    </div>
                </div>
                <div className="conversation-header-right" style={themeStyle}>
                    <span><RiPhoneFill/></span>
                    <span><FaVideo/></span>
                    <span><CgMoreO/></span>
                </div>
            </div>
            <div className="conversation-messages">
                <ChatMessage room={room} color={color}/>
            </div>
            <div className="conversation-input">
                <div className="conversation-button" style={themeStyle}>
                    <span><TiMicrophone/></span>
                    <span onClick={() => setShowPicker(val => !val)}><RiEmotionHappyFill/></span>
                    {   showPicker &&   <Picker
                                            pickerStyle={{ width: '320px', position: 'absolute', bottom: '45px', right: '-50px' }}
                                            onEmojiClick={onEmojiClick}
                                        />
                    }
                    <span><IoAttachOutline/></span>
                    <span onClick={handleFileInput}><IoImageSharp/></span>
                    <input
                        type="file"
                        id="file"
                        name="image"
                        ref={inputRef}
                        style={{ display: 'none' }}
                        onChange={handleSendImage}
                    />
                </div>
                <form className="conversation-input-messages" onSubmit={handleSubmit}>
                    <input
                        id="message-input"
                        type="text"
                        placeholder="Aa"
                        value={message}
                        onChange={handleChange}
                        autoComplete="off"
                    />
                    <span
                        className="button-send"
                        onClick={handleSubmit}
                        onKeyDown={handleSubmit}
                        style={themeStyle}
                    >
                        <MdSend/>
                    </span>
                </form>
                <div className="button-emoji" onClick={() => handleSendEmoji(room.roomTheme?.emoji)}>{room.roomTheme?.emoji}</div>
            </div>
        </div>
    )
}

export default Conversation;
