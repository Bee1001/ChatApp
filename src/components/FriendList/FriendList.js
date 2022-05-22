import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import { RiMoreFill } from 'react-icons/ri';

import { makeStyles } from '@material-ui/core';

import Box from '@material-ui/core/Box';
import Popover from '@material-ui/core/Popover';

import './FriendList.scss';

const useStyles = makeStyles(theme => ({
    popover: {
        width: 250,
        padding: '10px',
        display: 'flex',
        flexDirection: 'column',
    }
}))

function FriendList() {
    const classes = useStyles();
    const { user } = useSelector(state => state.user);
    const [anchorEl, setAnchorEl] = useState({
        id: null,
        element: null
    });

    const handlePopoverClose = () => {
        setAnchorEl({
            id: null,
            element: null
        });
    }

    return (
        <div className="friendlist">
            <div className="friendlist-container">
                <div className="friendlist-title">Friend List</div>
                {
                    user?.friends.map(friend => {
                        return  <div className="friendlist-box" key={friend._id}>
                                    <img src={friend.avatar}/>
                                    <span>{`${friend.lastname} ${friend.firstname}`}</span>
                                    <button
                                        className="btn-more-friend"
                                        onClick={(e) => setAnchorEl({
                                            id: 1,
                                            element: e.currentTarget
                                        })}
                                    >
                                        <RiMoreFill/>
                                    </button>
                                    <Popover
                                        id={anchorEl.id === 1 ? 'simple-popover' : undefined}
                                        open={anchorEl.id === 1}
                                        anchorEl={anchorEl.element}
                                        onClose={handlePopoverClose}
                                        anchorOrigin={{
                                            vertical: 'bottom',
                                            horizontal: 'left',
                                        }}
                                        transformOrigin={{
                                            vertical: 'top',
                                            horizontal: 'left',
                                        }}
                                        style={{ margin: '10px 0' }}
                                    >
                                        <Box className={classes.popover}>
                                            <span className="popover-content">Remove friend</span>
                                        </Box>
                                    </Popover>
                                </div>
                    })
                }
            </div>
        </div>
    );
}

export default FriendList;
