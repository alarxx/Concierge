import React, {useState} from 'react';
import FormWrapper from "../../../form/FormWrapper";

import Search from "../../../form/Search";
import CardItem from "../../../cards/CardItem";
import Cards from "../../../cards/Cards";
import toggleArrayElement from "../../../../handlers/toggleArrayElement";

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

export default function F6_HotelsSelection({
                                               preferred_services=[],
                                               updateFields=f=>f
}){
    const [items, setItems] = useState(hotelsDefault);

    return (
        <>
            <FormWrapper title={"Найдено 34 подходящих отелей"} undertitle={"Можете выбрать несколько вариантов"}>
                <Search />
                <Cards>
                    {items.map((item, i)=>{
                        return (
                            <CardItem
                                key={ i }
                                { ...item }
                                active={ preferred_services.includes(item.service) }
                                onClick={ e => updateFields({preferred_services: toggleArrayElement(preferred_services, item.service)})}
                            />
                        )
                    })}
                </Cards>
            </FormWrapper>
        </>
    );
}
