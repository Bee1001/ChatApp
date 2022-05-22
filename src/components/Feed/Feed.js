import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import FeedItem from './FeedItem';
import Search from '../Search/Search';
import ActiveList from '../ActiveList/ActiveList';

import jwt_decode from 'jwt-decode';

import actions from '../../redux/actions/room';
import { socket } from '../../App';
import useAuthentication from '../../hooks/useAuthentication';

function Feed() {
    const {user, token} = useAuthentication();

    const { rooms, latestMessages } = useSelector(state => state.room);
    const dispatch = useDispatch();

    useEffect(() => {
        if(user) {
            socket.emit('online', user.id);
        }
    }, [])

    useEffect(() => {
        dispatch(actions.getAllRoom(token));
    }, [latestMessages])

    return (
        <div className="feed">
            <ActiveList/>
            <Search/>
            <ul className="feed-item">
                {
                    latestMessages.length > 0 ? latestMessages.map(message => {
                        const room = rooms.find(room => room._id === message.roomId);
                        const member = room.members.find(member => member._id != user.id);
                        let messOfCurrentUser = message.sender == user.id;
                        return <FeedItem
                                    user={member}
                                    roomId={message.roomId}
                                    message={message}
                                    key={message._id}
                                    messOfCurrentUser={messOfCurrentUser}
                                />
                    }) : null
                }
            </ul>
        </div>
    )
}

export default Feed;
