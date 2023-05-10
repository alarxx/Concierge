import React from 'react';

import styles from './gallery.module.css'
import Slider from "../../slider/Slider";

export default function Gallery({height}){

    const style = {
        height: height,
    }

    return (
        <div className={styles.gallery} style={style}>
            <Slider />
        </div>
    );
}

