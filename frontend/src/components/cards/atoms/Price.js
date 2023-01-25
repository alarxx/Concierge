import React from "react";

export default function Price({price, measuring}){
    return (
        <div className="card-item__price">
            {price} {measuring}
        </div>
    );
}