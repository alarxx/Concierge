import React from 'react';

import Image from './atoms/Image'
import Name from "./atoms/Name";
import Rate from "./atoms/Rate";
import Rooms from "./atoms/Rooms";
import Address from "./atoms/Address";
import Description from "./atoms/Description";
import Price from "./atoms/Price";

export default function CardItem({
                                     name,
                                     img_url='/img/hotelimg.png',
                                     rate,
                                     address,
                                     description,
                                     price,
                                     rooms_num,
                                     measuring="Т / ночь",

                                     active=false,
                                     onClick=f=>f
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

            </div>
        </div>
    );
}