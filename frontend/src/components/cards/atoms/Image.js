import React from "react";

export default function Image({ img_url }){
    return (
        <div className="card-item__img">
            <img src={img_url} alt="image"/>
        </div>
    );
}