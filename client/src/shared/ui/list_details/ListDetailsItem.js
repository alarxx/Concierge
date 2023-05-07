import React from "react";

import styles from './listDetails.module.css'

export default function ListDetailsItem({text=''}) {
    return(<>
        <li className={styles['ListDetails__item']}>
            {text}
        </li>
    </>)
}