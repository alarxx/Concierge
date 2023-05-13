import React from 'react';

import styles from './nav.module.css'
export default function NavLink({text, onClick=f=>f, active}){

    return (
        <li className={`
                ${styles["nav-link"]}
                ${active && styles['nav-link--active']}    
            `}
            onClick={onClick}
        >
            <span>{text}</span>
        </li>
    );
}

