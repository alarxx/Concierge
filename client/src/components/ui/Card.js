import React from 'react';

import styles from "../../assets/css/styles.css"
import cardStyles from "../../assets/css/card.css"
import Icon from '../../assets/icons/arrow_forward_FILL0_wght400_GRAD0_opsz48.svg'

export default function Card({data, onClick}){


    return (
        <div className="card" onClick={onClick}>
            <div className='card__title title title-mini'>
                {data.title}
            </div>  
            <div className='card__dop text'>
                {data.countVotes} voited
            </div>  
            <div className='card__icon title title-mini link'>
                Участвовать <Icon />
            </div>
        </div>
    );
}

