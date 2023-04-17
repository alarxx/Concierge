import React from 'react';


import styles from "../../assets/css/styles.css"
import listStyles from "../../assets/css/list.css"

export default function List({children}){


    return (
        <div className="list">
            {children}
        </div>
    );
}

