import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RiMoreFill, RiAddLine, RiDeleteBin7Fill, RiLogoutBoxLine } from 'react-icons/ri';
import { IoIosHelpCircle, IoMdNotificationsOutline } from 'react-icons/io';
import { BsChatDotsFill } from 'react-icons/bs';

import Modal from '@material-ui/core/Modal';
import Box from '@material-ui/core/Box';
import Popover from '@material-ui/core/Popover';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';

import axios from 'axios';
import jwt_decode from 'jwt-decode';

import Notification from '../../hooks/useNotification';
import actions from '../../redux/actions/user';
import { socket } from '../../App';

import './Header.scss';

const useStyles = makeStyles(theme => ({
    modal: {
        position: 'absolute',
        width: 450,
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing(4),
        outline: "none"
    },
    popover: {
        width: 300,
        padding: '10px',
        display: 'flex',
        alignItems: 'center'
    }
}))

function Header() {
    const token = localStorage.getItem('userToken');
    const loggedin = jwt_decode(token);
    const { user, notifications } = useSelector(state => state.user);

    const [isPopup, setPopup] = useState(false);
    const [open, setOpen] = useState(false);
    const [notify, setNotify] = useState({
        isOpen: false,
        message: '',
        type: ''
    });
    const [id, setId] = useState('');
    const [anchorEl, setAnchorEl] = useState(null);
    const [response, setResponse] = useState(null);
    const openPopover = Boolean(anchorEl);

    const classes = useStyles();
    const dispatch = useDispatch();

    useEffect(() => {
        socket.on('notify', data => {
            if(loggedin.id === data.receiver._id) {
                notifications.push(data);
                dispatch({
                    type: 'GET_NOTIFY',
                    payload: notifications
                })
            }
        })

        socket.on('notify accepted', data => {
            setResponse(data);
        })

        dispatch(actions.getNotify(token));
    }, [response])

    const handlePopup = () => setPopup(!isPopup);

    const handleOpen = () => {
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    }

    const handleChange = (e) => {
        setId(e.target.value);
    }

    const addFriend = async () => {
        if(!id) return;

        const res = await axios.post('http://localhost:8080/user/addfriend', {
            senderId: loggedin.id,
            receiverId: id
        });

        if(res.data === 'success') {
            socket.emit('new friend request', user._id, id);
            setNotify({
                isOpen: !notify.isOpen,
                message: 'Friend request sent successfully',
                type: 'success'
            })
            setId('');
        }
        else {
            setNotify({
                isOpen: !notify.isOpen,
                message: 'Friend request sent failure',
                type: 'fail'
            })
        }

        setTimeout(() => {
            setNotify({
                isOpen: false,
                message: '',
                type: 'none'
            })
        }, 3000);

    }

    const acpFriendReq = (notifyId, friendId) => {
        dispatch(actions.acpFriendReq(notifyId, user._id, friendId));
        socket.emit('accepted request', friendId);
    }

    const deleteFriendReq = (notifyId) => {
        dispatch(actions.deleteFriendReq(notifyId));
    }

    return (
        <header className="header">
            <div className="header-logo">
                <img
                    className="header-logo-image"
                    src="https://icons555.com/images/icons-purple/image_icon_chat_4_pic_512x512.png"
                    alt=""
                />
                <h3 className="header-logo-title">Chat App</h3>
            </div>
            <div className="header-action">
                <div className="header-action-button">
                    <button onClick={(e) => setAnchorEl(e.currentTarget)}><IoMdNotificationsOutline/></button>
                    <Popover
                        id={openPopover ? 'simple-popover' : undefined}
                        open={openPopover}
                        anchorEl={anchorEl}
                        onClose={() => setAnchorEl(null)}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'left',
                        }}
                        style={{ margin: '10px 0'}}
                    >
                        {
                            (response && response._id === loggedin.id) ? (<Box className={classes.popover} style={{ background: 'aliceblue'}}>
                                <img className="notify-img" src={response.avatar} alt=""/>
                                <span className="notify-content">{response.lastname + ' ' + response.firstname} accepted friend request</span>
                            </Box>) : null
                        }
                        {
                            notifications.length > 0 && notifications.map(notify => {
                                return <Box className={classes.popover} id={notify._id} key={notify._id}>
                                        <img className="notify-img" src={notify.sender.avatar} alt=""/>
                                        <div className="notify-info">
                                            <span className="notify-username">{notify.sender.lastname + ' ' + notify.sender.firstname}</span>
                                            <div className="notify-button">
                                                <button className="btn-remove" onClick={() => deleteFriendReq(notify._id)}>Remove</button>
                                                <button className="btn-agree" onClick={() => acpFriendReq(notify._id, notify.sender._id)}>Agree</button>
                                            </div>
                                        </div>
                                    </Box>
                            })
                        }
                        {
                            (!response && notifications.length === 0) && (
                                <Box className={classes.popover} style={{ padding: '20px 15px', fontFamily: "'Poppins', sans-serif" }}>
                                    <span>No announcement yet</span>
                                </Box>
                            )
                        }
                    </Popover>
                </div>
                <div className="header-action-button">
                    <button onClick={handlePopup}><RiMoreFill/></button>
                    {
                        isPopup && (
                            <ul className="popup-more">
                                <li className="popup-more-item">
                                    <span><BsChatDotsFill/></span>
                                    <span>Messages Waiting</span>
                                </li>
                                <li className="popup-more-item">
                                    <span><RiDeleteBin7Fill/></span>
                                    <span>Archived Chats</span>
                                </li>
                                <li className="popup-more-item">
                                    <span><IoIosHelpCircle/></span>
                                    <span>Help</span>
                                </li>
                                <li className="popup-more-item">
                                    <span><RiLogoutBoxLine/></span>
                                    <span>Logout</span>
                                </li>
                            </ul>
                        )
                    }
                </div>
                <div className="header-action-button">
                    <button onClick={handleOpen}><RiAddLine/></button>
                    <Modal
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                        <Box className={classes.modal}>
                            <span>Enter the id of the person you want to befriend</span>
                            <TextField
                                id="outlined-basic"
                                label="Outlined"
                                variant="outlined"
                                style={{ marginTop: '15px', width: '100%'}}
                                onChange={handleChange}
                            />
                            <Grid container justifyContent="flex-end">
                                <Button
                                    variant="contained"
                                    color="primary"
                                    style={{ margin: '10px 0' }}
                                    onClick={addFriend}
                                >
                                    Add
                                </Button>
                            </Grid>
                        </Box>
                    </Modal>
                </div>
                <Notification
                    notify={notify}
                    setNotify={setNotify}
                />
            </div>
        </header>
    )
}

export default Header
