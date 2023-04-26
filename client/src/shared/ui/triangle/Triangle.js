import React from 'react';

import styles from './triangle.module.css' 

export default function Triangle(){

    // вообще нужен ли или лучше просто использовать svg а не треугольник из чистого css
    return (
        <div className={styles.triangle}>
        </div>
    );
}

