import React from "react";

import styles from './table.module.css';
export default function Table({children, top, bottom}) {

    const style = {
        marginTop: top,
        marginBottom: bottom,
    }

    return (<>
        <div className="table" id="managers" style={style}>
            <div className="table__body">
                <table className={styles['table']}>
                    {children}
                </table>
            </div>
        </div>
    </>)
}