import React from 'react';

import styles from "../../assets/css/styles.css"
import genresStyles from "../../assets/css/genres.css"

export default function Genres({title, genres}){


    return (
        <div className="genres">
            <div className="section-editable title title-mini">
                {title}
                {/* <span>изменить</span>  */}
            </div>
            <div className="genres__wrapper">
                {genres.map( genre => (
                    <div className="genre">{genre}</div>
                )) }
            </div>
        </div>
    );
}

