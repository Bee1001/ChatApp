import React, { useState } from 'react';

import { BsChatDotsFill } from 'react-icons/bs';
import { RiGroup2Fill, RiSettings5Fill } from 'react-icons/ri';

import Setting from '../Setting/Setting';
import Feed from '../Feed/Feed';
import FriendList from '../FriendList/FriendList';

import './MenuBar.scss';

function MenuBar() {
    const [indexMenu, setIndexMenu] = useState(1);
    const handleClickMenu = (index) => setIndexMenu(index);

    return (
        <div className="menu-bar-container">
            <div className="menu-bar">
                <div className="menu-bar-item">
                    <span
                        onClick={ () => handleClickMenu(1) }
                    >
                        <BsChatDotsFill className={indexMenu === 1 ? 'menu-bar-icon active' : 'menu-bar-icon'}/>
                    </span>
                    <span
                        onClick={ () => handleClickMenu(2) }
                    >
                        <RiGroup2Fill className={indexMenu === 2 ? 'menu-bar-icon active' : 'menu-bar-icon'}/>
                    </span>
                    <span
                        onClick={ () => handleClickMenu(3) }
                    >
                        <RiSettings5Fill className={indexMenu === 3 ? 'menu-bar-icon active' : 'menu-bar-icon'}/>
                    </span>
                </div>
            </div>
            <div className="menu-bar-block">
                <div
                    onClick={ () => handleClickMenu(1) }
                    className={indexMenu === 1 ? 'menu-bar-block-content active' : 'menu-bar-block-content'}
                >
                    <Feed/>
                </div>
                <div
                    onClick={ () => handleClickMenu(2) }
                    className={indexMenu === 2 ? 'menu-bar-block-content active' : 'menu-bar-block-content'}
                >
                    <FriendList/>
                </div>
                <div
                    onClick={ () => handleClickMenu(3) }
                    className={indexMenu === 3 ? 'menu-bar-block-content active' : 'menu-bar-block-content'}
                >
                    <Setting/>
                </div>
            </div>
        </div>
    )
}

export default MenuBar;
