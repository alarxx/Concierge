import React from "react";

import styles from './appbar.module.css'
export default function AppBar({children, padding, left, isClientView}) {

    const style = {
        padding
    }

    return (<>
        <header
            style={style}
            className={`
                ${styles['app-bar']}
                ${left && styles['app-bar-left']}
                ${isClientView && styles['app-bar--client']}
            `}
        >
            {children}
        </header>
    </>)
}