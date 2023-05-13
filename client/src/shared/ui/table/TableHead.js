import React from "react";

import styles from './table.module.css';
export default function TableHead({children}) {

    return (<>
        <thead>
            <tr>
                {children}
            </tr>
        </thead>
    </>)
}