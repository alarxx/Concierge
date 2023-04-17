import React from 'react';

import styles from "../../assets/css/styles.css"
import listStyles from "../../assets/css/list.css"

export default function ListItem({title, icon, type=""}){

    return (
        <div className={`li ${type}`}>
            {title}
            {icon}
        </div>
    );
}

