import React from 'react';

import styles from "modal.module.css"

export default function Modal({children, onClose, width, height}){

    const style = {
        width: width,
        height: height,
    }

    return (
        <div className={styles.Modal} style={style}>
            <div className={styles['Modal__nav']}>
                <div className={styles['Modal__close']} onClick={onClose}>X</div>
            </div>

            <div className={styles['Modal__content']}>
                {children}
            </div>
        </div>
    );
}