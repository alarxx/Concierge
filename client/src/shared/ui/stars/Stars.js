import React from 'react'

import styles from './stars.module.css'
import StarIcon from '../../../assets/icons/Star 1.svg'

export default function Stars({ stars=0 }) {

    const starsArray =  [...new Array(stars)]; // [...new Array((stars > 5 ? 5 : stars))];

    return (<div className={styles.stars}>
        {starsArray.map((_, i)=><StarIcon key={i} />)}
    </div>)
}