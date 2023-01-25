import React from 'react';

import SearchIcon from '../../assets/icons/search-normal.svg'

export default function Search({ placeholder='Найти' }){
    return (
        <div className="search">
            <input type="text" className="search-input" placeholder={placeholder} />

            <span>
                <SearchIcon />
            </span>

        </div>
    );
}