import React, {useEffect, useRef} from 'react';

import styles from "./modal.module.css"
import {createPortal} from "react-dom";

const appRoot = document.getElementById('root');
export default function Modal({children, onClose, minWidth,maxWidth, height}){

    const style = {
        minWidth: minWidth,
        maxWidth: maxWidth,
        height: height,
    }

    const modalRef = useRef(null);

    const handleClickOutside = (event) => {
        if (modalRef.current && !modalRef.current.contains(event.target)) {
            onClose();
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return createPortal(<>
        <div className={styles.overlay}></div>
        <div ref={modalRef} className={styles.Modal} style={style}>
            {/*<div className={styles['Modal__nav']}>*/}
            {/*    <div className={styles['Modal__close']} onClick={onClose}>X</div>*/}
            {/*</div>*/}

            <div className={styles['Modal__content']}>
                {children}
            </div>
        </div>
    </>, appRoot);
}