import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import axios from 'axios';

import { socket } from '../../App';
import useAuthentication from '../../hooks/useAuthentication';

import './ActiveList.scss';

function ActiveList() {
    const { user } = useSelector(state => state.user);
    const { token } = useAuthentication();
    const [onlineUsers, setOnlineUsers] = useState([]);

    useEffect(() => {
        socket.on('online-users', async data => {
            const res = await axios.get(`http://localhost:8080/user/${token}`);
            let users = [];

            res.data.friends.map(friend => {
                const user = data.find(user => user.userId === friend._id);
                if(user) users.push(friend);
            })
            setOnlineUsers(users);
        })
    }, [onlineUsers])

    return (
        <div className="active-list">
            <div className="active-list-wrapper">
                {
                    onlineUsers.length > 0 ? onlineUsers.map(user => {
                        return  <div className="active-list-block" key={user._id}>
                                    <img src={user.avatar} alt=""/>
                                    <span>{user.lastname}</span>
                                    <span>{user.firstname}</span>
                                </div>
                    }) : null
                }
            </div>
        </div>
    )
}

export default ActiveList;
