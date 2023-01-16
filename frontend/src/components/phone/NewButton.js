import React from 'react'

export default function NewButton({ name }){
    return (
        <div className="applications__new">
            <div className="btn btn-main">
                <span>{name}</span>
            </div>
        </div>
    );
}