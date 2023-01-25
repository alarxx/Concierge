import React from "react";

import Location from "../../../assets/icons/location.svg";

export default function Address({address}){
    return (
        <div className="card-item__address">
            <span>
                <Location width="15" height="24" viewBox="0 0 24 24"/>
            </span>
            {address}
        </div>
    );
}