import React from 'react';

import Star from '../../icons/star.svg'
import Location from '../../icons/location.svg'

export default function CardItem({
                                     name,
                                     img_url,
                                     rate, address,
                                     description,
                                     price,
                                     rooms_num,
                                     active,
                                     onClick
}){
    return (
        <div className={`card-item ${active?'card-item-active':''}`} onClick={onClick}>

            {img_url &&
            <div className="card-item__img">
                <img src={img_url} alt="image"/>
            </div>}

            <div className="card-item__info">

                {name &&
                <div className="card-item__name">
                    {name}
                </div>}

                <div className="card-item__dopinfo">

                    {rate &&
                    <div className="card-item__rate">
                        <span>
                            <Star />
                        </span>
                        {rate}
                    </div>}

                    {rooms_num &&
                    <div className="card-item__rooms">
                        Комнат: <span className="roomsnum">{rooms_num}</span>
                    </div>}

                </div>

                {address &&
                <div className="card-item__address">
                                <span>
                                    {/*<Location width={15} height={24} viewBox="0 0 24 24"/>*/}
                                    <Location />
                                </span>
                    {address}
                </div>}

                {description &&
                <div className="card-item__descr">
                    {description}
                </div>}

                {price &&
                <div className="card-item__price">
                    {price} Т / ночь
                </div>}

            </div>
        </div>
    );
}