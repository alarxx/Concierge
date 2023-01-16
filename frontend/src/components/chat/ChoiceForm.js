import React, {useEffect, useState} from 'react'
import Cards from "../form/Cards";
import CardItem from "../form/CardItem";

import toggleArrayElement from '../../handlers/toggleArrayElement'

//message={type=form, id, items, selected, multiple_choice}
export default function ChoiceForm({
                                       message={},
                                       onAnother=f=>f,
                                       onItem=f=>f
}){

    /*function addSelected(item){
        if(message.multiple_choice){
            setMessage({...message, selected: toggleArrayElement(message.selected, item.service)})
        } else {
            setMessage({...message, selected: message.selected.includes(item.service)?[]:[item.service]})
        }
    }*/

    return (
        <div className="chat-choice">

            <Cards>
                {message.items.map((item, i) => (
                        <CardItem key={i} {...item}
                                  active={message.selected.includes(item.service)}
                                  onClick={e => onItem(item)}
                        />
                    )
                )}
            </Cards>

            {!message.submitted && <div className="chat-choice__link link" onClick={e => onAnother(message)}>
                <div className="link__text">
                    Подобрать другой вариант
                </div>
            </div>}
        </div>
    );
}