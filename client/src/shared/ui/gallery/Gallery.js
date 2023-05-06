import React from 'react';

import styles from './gallery.module.css' 

export default function Gallery({height}){

    const style = {
        height: height,
    }

    return (
        <div className={styles.Gallery} style={style}>
            Gallery
        </div>
    );
}

