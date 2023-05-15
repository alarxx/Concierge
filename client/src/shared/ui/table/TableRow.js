import React from "react";

export default function  TableRow({isHead, children, key, onClick=f=>f}) {

    if (isHead) {
        return (<>
            <th>{children}</th>
        </>)
    }

    return (<>
        <tr key={key} onClick={onClick}>{children}</tr>
    </>)
}