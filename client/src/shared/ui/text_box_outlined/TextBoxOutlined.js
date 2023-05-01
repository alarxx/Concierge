import React from "react";

import styles from './textBoxOutlined.module.css'
export default function TextBoxOutlined({text='', top, bottom}) {

    const style = {
        marginTop: top,
        marginBottom: bottom,
    }

    return (<>{text &&
        <div className={styles.TextBoxOutlined} style={style}>
            {text}
        </div>}
    </>)
}