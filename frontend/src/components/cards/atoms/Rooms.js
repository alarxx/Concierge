import React from "react";

export default function Rooms({rooms_num}){
    return (
        <div className="card-item__rooms">
            Комнат: <span className="roomsnum">{rooms_num}</span>
        </div>
    );
}