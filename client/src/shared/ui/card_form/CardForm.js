import React from 'react';

import styles from './cardForm.module.css' 

export default function CardForm({
    title='',
    description='',
    icon='',
    active=false,
    onClick=f=>f
}){

    return (
        <div className="card-form">
            <div className="card-form__header">
                <div className="logo">
                    LOGO
                </div>
            </div>
            <div className="card-form__body">

            </div>
            <div className="card-form__footer">

            </div>
        </div>
    );
}

