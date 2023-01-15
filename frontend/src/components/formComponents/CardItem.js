import React from 'react';

import Star from '../../icons/star.svg'

export default function CardItem({ name, img_url, rate, address, description, price, rooms_num}){
    return (
        <div className="card-item">

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
                                    <svg width="15" height="24" viewBox="0 0 24 24" fill="none"
                                         xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M11.9999 13.4299C13.723 13.4299 15.1199 12.0331 15.1199 10.3099C15.1199 8.58681 13.723 7.18994 11.9999 7.18994C10.2768 7.18994 8.87988 8.58681 8.87988 10.3099C8.87988 12.0331 10.2768 13.4299 11.9999 13.4299Z"
                                            stroke="#292D32" stroke-width="1.5"/>
                                        <path
                                            d="M3.61995 8.49C5.58995 -0.169998 18.42 -0.159997 20.38 8.5C21.53 13.58 18.37 17.88 15.6 20.54C13.59 22.48 10.41 22.48 8.38995 20.54C5.62995 17.88 2.46995 13.57 3.61995 8.49Z"
                                            stroke="#292D32" stroke-width="1.5"/>
                                    </svg>
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