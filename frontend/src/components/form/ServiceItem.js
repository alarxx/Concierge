import React from 'react';
import HouseSVG from "../../assets/icons/house.svg";

export default function ServiceItem({caption, address, icon=<HouseSVG/>,
                                        active=false,
                                        onClick=f=>f
}){
    return (
        <div className={`service-item ${active?'service-item-active':''}`} onClick={onClick}>
            <div className="service-item__icon">
                    {icon}
            </div>
            <div className="service-item__info">
                <div className="service-item__caption">{caption}</div>
                <div className="service-item__address">{address}</div>
            </div>
        </div>
    );
}