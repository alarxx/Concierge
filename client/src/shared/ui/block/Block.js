import React from 'react';

import styles from './block.module.css'

export default function Block({children, top, bottom, left, right, width, isAlignCenter}){

    const style = {
        width,
        marginTop: top,
        marginBottom: bottom,
        marginLeft: left,
        marginRight: right,
    }

    return (
        <div style={style} className={`
            ${styles['block']}
            ${isAlignCenter && styles['block--center']} 
        `}>
            {children}
        </div>
    );
}

