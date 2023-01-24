import React, {useEffect, useState} from 'react'
import Cards from "../cards/Cards";
import CardItem from "../cards/CardItem";

import toggleArrayElement from '../../handlers/toggleArrayElement'

//message={type=choice, id, items, selected, multiple_choice}
export default function ChoiceForm({
                                       message={},
                                       onAnother=f=>f,
                                       onServiceSelect=f=>f
}){

    /*
    function addSelected(item){
        if(message.multiple_choice){
            setMessage({...message, selected: toggleArrayElement(message.selected, item.service)})
        } else {
            setMessage({...message, selected: message.selected.includes(item.service)?[]:[item.service]})
        }
    }
    */

    /*useEffect(()=>{
        console.log("Choice", message);
    }, [])*/

    return (
        <div className="chat-choice">

            <Cards>
                {message.choice.services.map((service, i) => {
                    // console.log("Choice service", service);
                    const s = service[service.type];
                    const img_url = s.logo ? `/file/${s.logo}` : null; // Это работает
                    return (
                            <CardItem key={i}
                                      {...s}
                                      active={message.choice.selectedServices.includes(service.id)}
                                      onClick={e => onServiceSelect(service)}
                            />
                        )
                    }
                )}
            </Cards>

            {!message.choice.submitted &&
                <div className="chat-choice__link link" onClick={e => onAnother(message)}>
                    <div className="link__text">
                        Подобрать другой вариант
                    </div>
                </div>
            }
        </div>
    );
}