import React from "react";

import styles from './toggleButtonService.module.css'

export default function ToggleButtonService({Icon, title, description,onClick=f=>f}) {
    return(<>
        <div className={`${styles.ToggleButtonService} ${active ? styles['ToggleButtonService-active']:''}`} onClick={onClick}>
            <div className={styles['ToggleButtonService__icon']}>
                {Icon}
            </div>
            <div className={styles['ToggleButtonService__info']}>
                <div className={styles['ToggleButtonService__title']}>{title}</div>
                <div className={styles['ToggleButtonService__description']}>{description}</div>
            </div>
        </div>
    </>)
}