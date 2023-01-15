import React from 'react';
import HouseSVG from "../../icons/house.svg";

export default function ServiceItem({caption, address, icon=HouseSVG, updateFields=f=>f}){
    return (
        <div className="uslug-item">
            <div className="uslug-item__icon">
                    {icon({width:36, height:25})}
            </div>
            <div className="uslug-item__info">
                <div className="uslug-item__caption">{caption}</div>
                <div className="uslug-item__address">{address}</div>
            </div>
        </div>
    );
}