import React from 'react';
import monthName from "../../handlers/monthName";

export default function CardOrder({order,
                                      clientName="Казмунайгаз",
                                      onClick=f=>f
}){

    const date = new Date(order.createdDate);

    return (
        <div className="card card-order" onClick={onClick}>
            <div className="card-order__info info">
                <div className="info__title">
                    {order.meta.name}
                </div>
                <div className="info__date">
                    {`${date.getDate()} ${monthName(date.getMonth())}`}
                </div>
                <div className="info__details">
                    <span>{order.meta.type}</span>
                    <span>{order.meta.num_of_people}</span>
                </div>
                <div className="info__client">
                    <div className="logo-client">
                        <img src={"img/logo-client.png"} alt="logo-client"/>
                    </div>
                    {clientName}
                </div>
            </div>
            <div className="card-order__status status status-new">
                <span>{order.status}</span>
            </div>
        </div>
    );
}