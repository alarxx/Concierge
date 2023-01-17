import React from 'react'


export default function YummyButton({name, icon, onClick=f=>f}){
    return (
        <div className="btn-create-order" onClick={onClick}>
            <span>{name}</span>
            {icon}
        </div>
    );
}