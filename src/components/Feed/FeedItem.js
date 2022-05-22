import React from 'react';

import { NavLink } from 'react-router-dom';
import { RiMoreFill } from 'react-icons/ri';

import moment from 'moment';

import './Feed.scss';

function Feed(props) {
    return (
        <NavLink
            to={{
                pathname: `/chat/${props.roomId}`
            }}
            exact={true}
            activeStyle={{
                background: '#F5F7FB',
            }}
            className="feed-item-link"
        >
            <li className="feed-item-card">
                <img
                    className="feed-item-image"
                    src={props.user.avatar}
                    alt="avatar"
                />
                <div className="feed-item-info">
                    <div className="feed-item-user">
                        <span className="feed-item-user-name">{`${props.user.lastname} ${props.user.firstname}`}</span>
                        <span className="feed-item-user-time">{moment(props.message.createdAt).fromNow()}</span>
                    </div>
                    <div className="feed-item-content">
                        {
                            props.message.type === 'message' ? <span>{props.messOfCurrentUser ? `You: ${props.message.text.length > 16 ? props.message.text.slice(0, 16) + '...' : props.message.text}` : `${props.user.lastname}: ${props.message.text.length + props.user.lastname.length > 20 ? props.message.text.slice(0, 20) + '...' : props.message.text}`}</span> :
                            <span>{props.messOfCurrentUser ? `You changed the color of the...` : `${props.user.lastname} ${props.user.firstname} changed the color of...` }</span>
                        }
                    </div>
                </div>
                <button className="button-more"><RiMoreFill/></button>
            </li>
        </NavLink>
    )
}

export default Feed;
