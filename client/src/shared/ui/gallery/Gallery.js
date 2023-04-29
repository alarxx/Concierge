import React from 'react';

import styles from './gallery.module.css' 

export default function Gallery({height=''}){

    const styless = {
        height: height,
    }

    return (
        <div className={styles.Gallery} style={styless}>
            Gallery
        </div>
    );
}

