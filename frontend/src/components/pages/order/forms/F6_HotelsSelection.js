import React, {useState} from 'react';
import FormWrapper from "../../../formComponents/FormWrapper";

import Search from "../../../formComponents/Search";
import CardItem from "../../../formComponents/CardItem";
import Cards from "../../../formComponents/Cards";

const hotelsDefault = [
    {
        img_url: "/img/hotelimg.png",
        name: "Название",
        description: "Описание описание описание описание описание",
        price: "10 000",
        address: "Адрес",
    },
    {
        img_url: "/img/hotelimg.png",
        name: "Название",
        description: "Описание описание описание описание описание",
        price: "10 000",
        address: "Адрес",
    },
    {
        img_url: "/img/hotelimg.png",
        name: "Название",
        description: "Описание описание описание описание описание",
        price: "10 000",
        address: "Адрес",
    }
]

export default function HotelsSelection6({
                               hotels=hotelsDefault,
                               updateFields=f=>f
}){
    const [items, setItems] = useState(hotels);

    return (
        <>
            <FormWrapper title={"Найдено 34 подходящих отелей"} undertitle={"Можете выбрать несколько вариантов"}>
                <Search />
                <Cards>
                    {items.map((item, i)=>{
                        return (<CardItem key={i} {...item} />)
                    })}
                </Cards>
            </FormWrapper>
        </>
    );
}
