import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { RiArrowDownSLine } from 'react-icons/ri';
import { IoMdDoneAll } from 'react-icons/io';

import Accordion from '@material-ui/core/Accordion';
import Typography from '@material-ui/core/Typography';
import AcccodionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import { makeStyles } from '@material-ui/core';

import jwt_decode from 'jwt-decode';
import moment from 'moment';

import actions from '../../redux/actions/room';
import { socket } from '../../App';

import './ChatInfo.scss';

const useStyles = makeStyles(theme => ({
    accordion: {
        margin: '10px'
    },
    summary: {
        background: '#F5F7FB',
        margin: '10px 15px'
    },
    accordion_detail: {
        display: 'flex',
        alignItems: 'center',
        cursor: 'pointer',
        flexWrap: 'wrap',
        justifyContent: 'center'
    },
    btn_theme: {
        width: '40px',
        height: '40px',
        borderRadius: '100%',
        minWidth: 'auto',
        marginRight: '10px',
        marginTop: '7px'
    }
}))

const colors = ['#58A6FF', '#A5D0E5', '#9F8FF2', '#007529', '#51C157', '#ED0364', '#EE41D3', '#E65750', '#EDA600'];

function ChatInfo() {
    const token = localStorage.getItem('userToken');
    const user = jwt_decode(token);

    const [expanded, setExpanded] = useState(false);
    const [recipient, setRecipient] = useState({});

    const { room } = useSelector(state => state.room);
    const { roomId } = useParams();
    const dispatch = useDispatch();
    const classes = useStyles();

    useEffect(() => {
        dispatch(actions.getRoom(roomId));
        if(room._id && roomId === room._id)
            setRecipient(room.members.find(member => member._id !== user.id));
    }, [roomId === room._id])

    const handleChange = panel => (event, isExpaned) => {
        setExpanded(isExpaned ? panel : false);
    }

    const changeTheme = (theme) => {
        if (room.roomTheme.background === theme) return;
        socket.emit('change theme', roomId, user.id, recipient._id, theme);
    }

    const iconBtnStyle = {
        color: 'white',
        fontSize: '25px',
        textAlign: 'center',
        alignItems: 'center',
        verticalAlign: 'middle',
        textAlign: 'center',
        left: '20%',
        top: '15%',
        display: 'table-cell',
        position: 'relative',
        justifyContent: 'center',
    }

    return (
        <div className="chatinfo">
            <div className="chatinfo-user">
                <img
                    src={recipient.avatar}
                    alt="avatar"
                    style={{
                        border: recipient.online ? 'solid 2px lightgreen' : 'solid 2px #E9EAEC'
                    }}
                />
                <span>{`${recipient.lastname} ${recipient.firstname}`}</span>
                <span>{recipient.online ? 'Just now' : moment(recipient.lastActivity).fromNow()}</span>
            </div>
            <Accordion
                expanded={expanded === "panel1"}
                id="panel1"
                onChange={handleChange("panel1")}
                elevation={0}
            >
                <AcccodionSummary
                    className={classes.summary}
                    expandIcon={<RiArrowDownSLine/>}
                    aria-controls="panel1bh-content"
                    id="panel1bh-header"
                >
                    <Typography>Customize chat</Typography>
                </AcccodionSummary>
                <AccordionDetails className={classes.accordion_detail}>
                    {
                        colors.map(color => {
                            return <Typography
                                        className={classes.btn_theme}
                                        style={{ background: color }}
                                        key={color}
                                        onClick={() => changeTheme(color)}
                                    >
                                    { (room && room.roomTheme?.background === color) && <IoMdDoneAll style={iconBtnStyle}/> }
                                    </Typography>
                        })
                    }
                </AccordionDetails>
            </Accordion>
            <Accordion
                expanded={expanded === "panel2"}
                id="panel2"
                onChange={handleChange("panel2")}
                elevation={0}
            >
                <AcccodionSummary
                    className={classes.summary}
                    expandIcon={<RiArrowDownSLine/>}
                    aria-controls="panel1bh-content"
                    id="panel1bh-header"
                >
                    <Typography>File image</Typography>
                </AcccodionSummary>
                <AccordionDetails>
                    <Typography>hihihihihihihihi</Typography>
                </AccordionDetails>
            </Accordion>
        </div>
    )
}

export default ChatInfo;
