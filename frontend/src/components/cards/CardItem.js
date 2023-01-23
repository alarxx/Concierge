import React from 'react';

import Star from '../../assets/icons/star.svg'
import Location from '../../assets/icons/location.svg'

function Rate({ rate }){
    return (
        <div className="card-item__rate">
            <span>
                <Star width="15" height="24" viewBox="0 0 24 24"/>
            </span>
            {rate}
        </div>
    );
}
function Image({ img_url }){
    return (
        <div className="card-item__img">
            <img src={img_url} alt="image"/>
        </div>
    );
}
function Name({name}){
    return (
        <div className="card-item__name">
            {name}
        </div>
    );
}
function Rooms({rooms_num}){
    return (
        <div className="card-item__rooms">
            Комнат: <span className="roomsnum">{rooms_num}</span>
        </div>
    );
}
function Address({address}){
    return (
        <div className="card-item__address">
            <span>
                <Location width="15" height="24" viewBox="0 0 24 24"/>
            </span>
            {address}
        </div>
    );
}
function Description({ description }){
    return (
        <div className="card-item__descr">
            {description}
        </div>
    );
}
function Price({price, measuring}){
    return (
        <div className="card-item__price">
            {price} {measuring}
        </div>
    );
}

export default function CardItem({
                                     name,
                                     img_url,
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