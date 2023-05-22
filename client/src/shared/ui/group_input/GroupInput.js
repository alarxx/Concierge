import React from "react";

import styles from './groupInput.module.css'
export default function GroupInput({children, isMobile=false, isAlignStart=false}) {
    return(<>
        <div className={`
            ${styles.GroupInput} 
            ${styles['GroupInput--mobile']}
            ${isAlignStart && styles['GroupInput--ais']}
        }`}>
            {children}
        </div>
    </>)
}