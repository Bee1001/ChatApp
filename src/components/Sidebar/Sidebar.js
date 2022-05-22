import React from 'react';

import Header from '../Header/Header';
import MenuBar from '../MenuBar/MenuBar';

import './Sidebar.scss';

function Sidebar() {
    return (
        <div className="sidebar">
            <Header/>
            <MenuBar/>
        </div>
    )
}

export default Sidebar;
