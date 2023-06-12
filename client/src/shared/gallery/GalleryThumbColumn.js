import React from "react";

import styles from './gallery.module.css'

export default function GalleryThumbColumn({children}) {
    return (
        <div className={styles['Gallery-thumb-column']}>
            {children}
        </div>
    )
}