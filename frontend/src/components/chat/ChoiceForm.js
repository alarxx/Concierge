import React, {useState} from 'react'
import Cards from "../form/Cards";
import CardItem from "../form/CardItem";

import toggleArrayElement from '../../handlers/toggleArrayElement'

const hotelsDefault = [
    {
        service: 1,
        img_url: "/img/hotelimg.png",
        name: "Название",
        description: "Описание описание описание описание описание",
        price: "10 000",
        address: "Адрес",
        rate: "4.2"
    },
    {
        service: 2,
        img_url: "/img/hotelimg.png",
        name: "Название",
        description: "Описание описание описание описание описание",
        price: "10 000",
        address: "Адрес",
        rate: "4.2"
    },
    {
        service: 3,
        img_url: "/img/hotelimg.png",
        name: "Название",
        description: "Описание описание описание описание описание",
        price: "10 000",
        address: "Адрес",
        rate: "4.2"
    }
]

export default function ChoiceForm({
                                       message,
                                       multiple=false,
                                       onSubmit=console.log,
                                       selected=[],
                                       setSelected=f=>f
}){
    // На самом деле мы должны распарсивать как нибудь message.items
    const [items, setItems] = useState(hotelsDefault)

    function addSelected(item){
        if(multiple){
            setSelected(toggleArrayElement(selected, item.service))
        } else {
            setSelected(selected.includes(item.service)?[]:[item.service])
        }
    }

    return (
        <div className="chat-choice">
            <Cards>
                {items.map((item, i) => (
                    <CardItem key={i} {...item}
                              active={selected.includes(item.service)}
                              onClick={e => addSelected(item)}
                    />
                ))}
            </Cards>
            <div className="chat-choice__link link" onClick={e => onSubmit(selected)}>
                <div className="link__text">
                    Подобрать другой вариант
                </div>
            </div>
        </div>
    );
}