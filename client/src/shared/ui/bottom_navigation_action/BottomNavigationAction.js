import React from 'react';

import styles from './bottomNavigationAction.module.css' 

export default function BottomNavigationAction({number_of_notifications=0, label, icon, active=false, onClick=f=>f}){

    const notifications = number_of_notifications > 0 ? `, ${number_of_notifications}` : '';

    return (
        <button className={`${styles["bottomNavigationAction"]} ${active ? styles["bottomNavigationAction-active"] : ''}`} onClick={onClick}>
            {icon}
            <span>{`${label}${notifications}`}</span>
        </button>
    );
}

