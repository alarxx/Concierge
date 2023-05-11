import React from 'react';

import styles from './groupButtons.module.css' 

export default function GroupButtons({children, top, bottom}){

    const style = {
        marginTop: top,
        marginBottom: bottom,
    }

    return (
        <div className={styles.GroupButtons} style={style}>
            {children}
        </div>
    );
}

