import React, {useEffect} from "react";

import styles from './alert.module.css'

export default function Alert({variant='', children}) {

    return (<>
        {children &&
            <div className={`${styles.Alert} ${variant ? styles['Alert--'+variant] : ''}`}>
                {children}
            </div>}
    </>)
}