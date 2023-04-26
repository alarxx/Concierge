import React from 'react';

import styles from './textWithLink.module.css' 

import Link from '../link/Link'

export default function TextWithLink({text, linktext, onClick}){

    return (
        <div className={styles["textWithLink"]}>
            {text && <span>{text}</span>}
            {linktext && <Link text={linktext} onClick={onClick} />}
        </div>
    );
}

