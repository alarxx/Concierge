import React from "react";

export default function GroupInline({children, width, height}) {

    const style = {
        width,
        height,
        display: 'flex',
        alignItems: 'center',
    }

    return (
        <div style={style}>
            {children}
        </div>
    )
}