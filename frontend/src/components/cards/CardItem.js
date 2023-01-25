import React from 'react';

import Image from './atoms/Image'
import Name from "./atoms/Name";
import Rate from "./atoms/Rate";
import Rooms from "./atoms/Rooms";
import Address from "./atoms/Address";
import Description from "./atoms/Description";
import Price from "./atoms/Price";
import Contacts from "./atoms/Contacts";

/* Testing arguments:
name="Название номера",
img_url='/img/hotelimg.png',
rate="4.2",
address="Адрес отеля",
description='Описание комнаты. Описание комнаты Описание комнаты',

price="",
rooms_num=1,

measuring="Т / ночь",

contact_name="Зарина",
contact_phone="+7 730 376 1222",

active=false,
onClick=f=>f,
 * */
export default function CardItem({

                                     name,
                                     img_url,
                                     rate,
                                     address,
                                     description,

                                     price,
                                     rooms_num,

                                     measuring="Т / ночь",

                                     contact_name,
                                     contact_phone,

                                     active=false,
                                     onClick=f=>f,

}){
    return (
        <div className={`card-item ${active?'card-item-active':''}`} onClick={onClick}>

            {img_url && <Image img_url={img_url} />}

            <div className="card-item__info">

                {name && <Name name={name}/>}

                <div className="card-item__dopinfo">
                    {rate && <Rate rate={rate}/>}
                    {rooms_num && <Rooms rooms_num={rooms_num}/>}
                </div>

                {address && <Address address={address} />}

                {description && <Description description={description}/>}

                {price && <Price price={price} measuring={measuring} />}

                {(contact_name || contact_phone) && <Contacts name={contact_name} phone={contact_phone}/>}
            </div>
        </div>
    );
}