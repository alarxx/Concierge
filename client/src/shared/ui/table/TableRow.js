import React from "react";

export default function  TableRow({isHead, children, key}) {

    if (isHead) {
        return (<>
            <th>{children}</th>
        </>)
    }

    return (<>
        <tr key={key}>{children}</tr>
    </>)
}