import React from 'react'
// import ClosePageIcon from "../../assets/icons/close-square.svg";

export default function CloseButton({ onClick=f=>f }){
    return (
        <div onClick={onClick}>
            {/*<ClosePageIcon />*/}
            <p>X</p>
        </div>
    );
}