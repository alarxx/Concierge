import React from 'react'

import styles from './stars.module.css'
import StarIcon from '../../../assets/icons/Star 1.svg'

export default function Stars(stars='') {
    return (<div className={styles.stars}>
        <StarIcon />
        <StarIcon />
        <StarIcon />
    </div>)
}