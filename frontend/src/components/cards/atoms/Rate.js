import React from "react";

import Star from "../../../assets/icons/star.svg";

export default function Rate({ rate }){
    return (
        <div className="card-item__rate">
            <span>
                <Star width="15" height="24" viewBox="0 0 24 24"/>
            </span>
            {rate}
        </div>
    );
}