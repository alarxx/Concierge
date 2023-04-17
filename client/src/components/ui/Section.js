import React from 'react';

import styles from "../../assets/css/styles.css"
import sectionStyles from "../../assets/css/section.css"

export default function Section({title, text}){


    return (
        <div className="section">
            <div className="section__title section-editable title title-mini">
                {title}
                {/* <!-- <span>изменить</span> --> */}
            </div>
            <div className="section__text text">
                {text}
            </div>
        </div>
    );
}

