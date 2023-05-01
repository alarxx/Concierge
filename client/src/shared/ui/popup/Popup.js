import React, {useEffect} from "react";

import styles from './popup.module.css'

export default function Popup({variant='', children}) {

    return (<>
        {children &&
            <div className={`${styles.Popup} ${variant ? styles['Popup-'+variant] : ''}`}>
                {children}
            </div>}
    </>)
}