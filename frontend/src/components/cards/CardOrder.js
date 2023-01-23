import React from 'react';

export default function CardOrder({order,
                                      name="Астана - Будапешт",
                                      date="12 мая - 20 мая",
                                      type="Командировка",
                                      num_of_people="100 чел.",
                                      clientName="Казмунайгаз",
                                      statusOrder="Новый",
                                      onClick=f=>f
}){
    return (
        <div className="card card-order" onClick={onClick}>
            <div className="card-order__info info">
                <div className="info__title">
                    {name}
                </div>
                <div className="info__date">
                    {date}
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