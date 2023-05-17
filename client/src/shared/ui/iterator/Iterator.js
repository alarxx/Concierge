import React, {useState} from "react";

import styles from './iterator.module.css'
export default function Iterator({value=0, onChange=f=>f, minValue=0, maxValue=6}) {

    function onClickMinus() {
        if (value > minValue) {
            onChange(value - 1)
        }
    }
    function onClickPlus() {
        if (value < maxValue) {
            onChange(value + 1)
        }
    }

    return (
        <div className={styles['iterator']}>
            <button type="button" className={styles['iterator__control']} onClick={onClickMinus}>
                <span>−</span>
            </button>
            <div className={styles['iterator__counter']}>
                {value ? value : minValue }
            </div>
            <button type="button" className={styles['iterator__control']} onClick={onClickPlus}>
                <span>+</span>
            </button>
        </div>
    )
}