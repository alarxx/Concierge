import React from 'react';

import styles from './bottomNavigationAction.module.css'
import Badge from "../badge/Badge";

export default function BottomNavigationAction({number_of_notifications=0, label, icon, active=false, onClick=f=>f}){

    return (
        <button  className={`${styles["bottomNavigationAction"]} ${active ? styles["bottomNavigationAction-active"] : ''}`} onClick={onClick}>
            <span className={styles["bottomNavigationAction--notifications"]}>
                {number_of_notifications > 0 && <Badge air={true} top={-6} left={28} text={number_of_notifications > 999 ? '999+' : String(number_of_notifications)} />}
                {icon}
            </span>
            <span>{label}</span>
        </button>
    );
}

