import React from "react";

export default function TableRow({isHead, children}) {

    if (isHead) {
        return (<>
            <th>{children}</th>
        </>)
    }

    return (<>
        <td>{children}</td>
    </>)
}