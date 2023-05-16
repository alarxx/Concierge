import React from "react";

import styles from './checkbox.module.css'

// TODO: сделать режим фокусировки при нажатии TAB
// TODO: сделать изменение цвета и жирности при hover
export default function Checkbox({required=false, label, id, checked, onChange=f=>f}) {


    return(
        <label className={styles['checkbox-wrapper']}>
            <input type="checkbox"
                   required={required}
                   id={id}
                   checked={checked}
                   onChange={onChange}
            />
            <span className={styles['checkmark']}></span>
            <span className={styles['label']}>{label}</span>
        </label>
    )
}