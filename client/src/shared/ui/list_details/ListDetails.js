import React from "react";

import styles from './listDetails.module.css'
export default function ListDetails({Icon, title='', children}) {
    return(<>
        <div className={styles.ListDetails}>
            <div className={styles['ListDetails__icon']}>
                {Icon}
            </div>
            <div>
                <h4 className={styles['ListDetails__title']}>{title}</h4>
                {children}
            </div>
        </div>
    </>)
}