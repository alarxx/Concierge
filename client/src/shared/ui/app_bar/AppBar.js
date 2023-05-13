import React from "react";

import styles from './appbar.module.css'
export default function AppBar({children, padding}) {

    const style = {
        padding
    }

    return (<>
        <header style={style} className={styles['app-bar']}>
            {children}
        </header>
    </>)
}