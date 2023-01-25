import React from "react";

export default function Contacts({name, phone}){
    return (
        <div className="card-item__price">
            {name} <br/>
            {phone}
        </div>
    );
}