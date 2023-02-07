import React, {useEffect, useState} from 'react'
import Cards from "../cards/Cards";
import CardItem from "../cards/CardItem";

import toggleArrayElement from '../../handlers/toggleArrayElement'

//message={type=choice, id, items, selected, multiple_choice}
export default function ChoiceForm({
                                       user,
                                       message={},
                                       onAnother=f=>f,
                                       onServiceSelect=f=>f
}){

    return (
        <div className={`chat-choice ${message.sender == user.id ? 'mymssg' : ''}`}>

            <Cards>
                {message.choice.services.map((service, i) => {
                    // console.log("Choice service", service);
                    const s = service[service.type];
                    const img_url = s.logo ? `/file/${s.logo}` : null; // Это работает
                    return (
                            <CardItem key={i}
                                      img_url={img_url}
                                      {...s}
                                      active={message.choice.selectedServices.includes(service.id)}
                                      onClick={e => onServiceSelect(service)}
                            />
                        )
                    }
                )}
            </Cards>

            {!message.choice.submitted && message.sender != user.id &&
                <div className="chat-choice__link link" onClick={e => onAnother(message)}>
                    <div className="link__text">
                        Подобрать другой вариант
                    </div>
                </div>
            }
        </div>
    );
}