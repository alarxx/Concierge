import React from 'react';

import styles from './textWithLink.module.css' 

import Link from '../link/Link'

export default function TextWithLink({text, linktext, onClick}){

    return (
        <div class={styles["textWithLink"]}>
            <span>{text}</span>
            <Link text={linktext} onClick={onClick} />
        </div>
    );
}

