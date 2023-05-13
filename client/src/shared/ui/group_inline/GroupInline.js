import React from "react";

export default function GroupInline({children, width}) {

    const style = {
        width,
        display: 'flex',
        alignItems: 'center',
    }

    return (
        <div style={style}>
            {children}
        </div>
    )
}