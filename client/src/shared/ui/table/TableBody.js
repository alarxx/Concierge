import React from "react";

import styles from './table.module.css';

export default function TableBody({children, Loader, isLoading, data}) {

    return (<>
        <tbody id="flightsBody">
            {isLoading ? (
                <tr>
                    <td colSpan="7">{Loader ? Loader : 'Loading...'}</td>
                </tr>
            ) : data.map( item => (
                <tr key={item.id}>
                    <td>{item.name}</td>
                </tr>
            )) }
        </tbody>
    </>)
}