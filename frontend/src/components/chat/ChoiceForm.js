import React, {useEffect, useState} from 'react'
import Cards from "../cards/Cards";
import CardItem from "../cards/CardItem";

import toggleArrayElement from '../../handlers/toggleArrayElement'

//message={type=choice, id, items, selected, multiple_choice}
export default function ChoiceForm({
                                       message={},
                                       onAnother=f=>f,
                                       onItem=f=>f
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

    useEffect(()=>{
        console.log("Choice", message);
    }, [])

    return (
        <div className="chat-choice">

            <Cards>
                {message.choice.services.map((service, i) => {
                    return (
                            <CardItem key={i} {...service}
                                      active={message.choice.selectedIndexes.includes(service._id)}
                                      onClick={e => onItem(service)}
                            />
                        )
                    }
                )}
            </Cards>

            {!message.choice.submitted && <div className="chat-choice__link link" onClick={e => onAnother(message)}>
                <div className="link__text">
                    Подобрать другой вариант
                </div>
            </div>}
        </div>
    );
}