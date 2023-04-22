import React from 'react';

import styles from './link.module.css' 

export default function Link({text='', href=''}){

    return (
        <a class={styles.link} href={href}>
            {text}
        </a>
    );
}

