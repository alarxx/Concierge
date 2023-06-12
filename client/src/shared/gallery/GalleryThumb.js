import React from "react";

import styles from './gallery.module.css'

export default function GalleryThumb({children, isBig=false}) {

    return (
        <div className={`${isBig && styles['Gallery-thumb--big']} ${styles['Gallery-thumb']}`} data-id="gallery-thumb">
            {children}
        </div>
    )
}