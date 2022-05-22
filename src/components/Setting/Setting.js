import React, { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { RiArrowDownSLine, RiLogoutBoxLine } from 'react-icons/ri';
import { MdModeEdit } from 'react-icons/md';

import ToggleSwitch from '../ToggleSwitch/ToggleSwitch';
import actions from '../../redux/actions/user';

import { socket } from '../../App';

import './Setting.scss';

function Setting() {
    const { user } = useSelector(state => state.user);
    const [isOpen, setIsOpen] = useState(false);
    const [index, setIndex] = useState(0);
    const [imgPreview, setImgPreview] = useState('');
    const [avatar, setAvatar] = useState('');

    const token = localStorage.getItem('userToken');

    const dispatch = useDispatch();
    const history = useHistory();
    const inputRef = useRef(null);

    if(!token) {
        history.push('/login');
    }

    const handleFileInput = () => {
        inputRef.current.click();
    }

    const handleChangeImage = (e) => {
        const image = e.target.files[0];

        setAvatar(image);

        dispatch(actions.updateAvatar(token, image));

        let reader = new FileReader();
        reader.onloadend = function() {
            setImgPreview(reader.result);
        }

        reader.readAsDataURL(e.target.files[0]);
    }

    const handleClickDropdown = (index) => {
        setIsOpen(!isOpen)
        setIndex(index);
    };

    const handleLogout = () => {
        socket.emit('logout', user._id);
        localStorage.removeItem('userToken');
        history.push('/login');
    }

    useEffect(() => {
        dispatch(actions.getUser(token));
    }, [token, avatar])

    return (
        <div className="setting">
            <div className="setting-wrapper">
                <div className="setting-edit">
                    <div className="setting-edit-avatar">
                        {
                            imgPreview ? <img src={imgPreview} alt="avatar"/> : <img src={user && user.avatar} alt="avatar"/>
                        }
                        <div className="setting-edit-icon" onClick={handleFileInput}><MdModeEdit/></div>
                        <input
                            type="file"
                            id="file"
                            name="avatar"
                            ref={inputRef}
                            style={{ display: 'none' }}
                            onChange={handleChangeImage}
                        />
                    </div>
                </div>
                <div className="setting-name">
                    <span>{user && "#" + user.shortId}</span>
                    <br></br>
                    <span>{user && user.lastname + ' ' + user.firstname}</span>
                </div>
                <div className="setting-info">
                    <div
                        onClick={() => handleClickDropdown(1)}
                        className="setting-info-title"
                    >
                        <span>Personal Information</span>
                        <span><RiArrowDownSLine/></span>
                    </div>
                    <div
                        className={(isOpen && index === 1) ? "setting-info-block open" : "setting-info-block"}
                    >
                        <div className="setting-info-block-input">
                            <span>Name</span>
                            <span>My Nguyen</span>
                        </div>
                    </div>
                </div>
                <div className="setting-info">
                    <div
                        onClick={() => handleClickDropdown(2)}
                        className="setting-info-title"
                    >
                        <span>Setting Password</span>
                        <span><RiArrowDownSLine/></span>
                    </div>
                    <div
                        className={(isOpen && index === 2) ? "setting-info-block open" : "setting-info-block"}
                    >
                        <div className="setting-info-block-input">
                            <label>Current Password</label>
                            <input type="password"/>
                        </div>
                        <div className="setting-info-block-input">
                            <label>New Password</label>
                            <input type="password"/>
                        </div>
                        <div className="setting-info-block-input">
                            <label>Confirm Password</label>
                            <input type="password"/>
                        </div>
                        <button className="setting-info-block-button">Save</button>
                    </div>
                </div>
                <div className="setting-switch">
                    <span>Active Status</span>
                    <ToggleSwitch/>
                </div>
                <div className="setting-switch">
                    <span>Show Notification</span>
                    <ToggleSwitch/>
                </div>
                <div className="setting-logout" onClick={handleLogout}>
                    <span><RiLogoutBoxLine/></span>
                    <span>Logout</span>
                </div>
            </div>
        </div>
    )
}

export default Setting;
