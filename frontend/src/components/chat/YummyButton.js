import React from 'react'


export default function YummyButton({name, icon}){
    return (
        <div className="btn-create-order">
            <span>{name}</span>
            {icon}
        </div>
    );
}