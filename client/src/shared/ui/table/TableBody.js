import React from "react";

import styles from './table.module.css';

export default function TableBody({children, Loader, isLoading}) {

    return (<>
        <tbody id="flightsBody">
            {isLoading ? (
                <tr>
                    <td colSpan="7">{Loader ? Loader : 'Loading...'}</td>
                </tr>
            ) : children }
        </tbody>
    </>)
}