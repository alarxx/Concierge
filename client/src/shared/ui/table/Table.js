import React from "react";

import styles from './table.module.css';
export default function Table({children}) {

    return (<>
        <div className="table" id="managers">
            <div className="table__body">
                <table className={styles['table']}>
                    {children}
                </table>
            </div>
        </div>
    </>)
}