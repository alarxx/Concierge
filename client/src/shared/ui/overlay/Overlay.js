import React from 'react';

import styles from "./overlay.module.css"
import {createPortal} from "react-dom";

const appRoot = document.getElementById('root');
export default function Overlay({children}){

    return createPortal(<>
        <div className={styles.overlay}></div>
        <div className={styles["overlay-content"]}>
            {children}
        </div>
    </>, appRoot);
}