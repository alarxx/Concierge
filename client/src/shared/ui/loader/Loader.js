import React from 'react';

import styles from './loader.module.css' ;

export default function Loader({color='white'}){

    const style = {
        color,
    }
    return (
        <div className={styles["loader"]} style={style}>
        </div>
    );
}

