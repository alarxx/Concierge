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
        <div class="card-form">
            <div class="card-form__header">
                <div class="logo">
                    LOGO
                </div>
            </div>
            <div class="card-form__body">

            </div>
            <div class="card-form__footer">

            </div>
        </div>
    );
}

