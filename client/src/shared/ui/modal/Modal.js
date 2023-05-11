import React from 'react';

import styles from "./modal.module.css"
import {createPortal} from "react-dom";

const appRoot = document.getElementById('root');
export default function Modal({children, onClose, minWidth,maxWidth, height}){

    const style = {
        minWidth: minWidth,
        maxWidth: maxWidth,
        height: height,
    }

    return createPortal(<>
        <div className={styles.overlay}></div>
        <div className={styles.Modal} style={style}>
            <div className={styles['Modal__nav']}>
                <div className={styles['Modal__close']} onClick={onClose}>X</div>
            </div>

            <div className={styles['Modal__content']}>
                {children}
            </div>
        </div>
    </>, appRoot);
}