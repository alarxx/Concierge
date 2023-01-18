import React from 'react';

import SearchIcon from '../../assets/icons/search-normal.svg'

export default function Search({ }){
    return (
        <div className="search">
            <input type="text" className="search-input" placeholder="Найти" />

            <span>
                <SearchIcon />
            </span>

        </div>
    );
}