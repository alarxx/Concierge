import React, {useEffect, useState} from 'react'

export default function ChatItem({ unread_num, name, last_message, onClick }){
    return (
        // <div class="card card-order">
        //     <div class="card-order__info info">
        //         <div class="info__title">
        //             Астана - Будапешт
        //         </div>
        //         <div class="info__date">
        //             12 мая - 20 мая
        //         </div>
        //         <div class="info__details">
        //             <span>Командировка</span>
        //             <span>100 чел.</span>
        //         </div>
        //         <div class="info__client">
        //             <div class="logo-client">
        //                 <img src="img/logo-client.png" alt="logo-client">
        //             </div>
        //             Казмунайгаз
        //         </div>
        //     </div>
        //     <div class="card-order__status status status-new">
        //         <span>Новый</span>
        //     </div>
        // </div>
        <div className={`chat-item ${ unread_num > 0 ? 'unreaded' : '' }`} onClick={onClick}>
            <div className="chat-item__photo">

            </div>
            <div className="chat-item__info">
                <div className="chat-item__name">
                    {name}
                </div>
                <div className="chat-item__mssg">
                    {last_message}
                </div>
            </div>

            {unread_num > 0 && <div className="unreaded__num">{unread_num}</div>}
        </div>
    );
}