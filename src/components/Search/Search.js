import React from 'react';

import { IoIosSearch } from 'react-icons/io';

import './Search.scss';

function Search() {
    return (
        <div className="search">
            <div className="search-wrapper">
                <div className="search-input">
                    <span><IoIosSearch className="search-input-icon"/></span>
                    <input type="text" placeholder="Search friends, groups..."/>
                </div>
            </div>
        </div>
    )
}

export default Search;
