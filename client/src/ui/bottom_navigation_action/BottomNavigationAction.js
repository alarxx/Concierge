import React from 'react';

import styles from './bottomNavigationAction.module.css' 

export default function BottomNavigationAction({label, icon, active=false, onClick=f=>f}){

    return (
        <button className={`${styles["bottomNavigationAction"]} ${active ? styles["bottomNavigationAction-active"] : ''}`} onClick={onClick}>
            {icon}
            <span>{label}</span>
        </button>
    );
}

