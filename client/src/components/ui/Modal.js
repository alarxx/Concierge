import React from 'react';

import Button from "../ui/Button"

export default function Modal({data, onClose}){


    return (
        <div className="modal">
            <div class="modal__nav">
                <div class="modal__close" onClick={onClose}>X</div>
                <div class="modal__share">share</div>
            </div>

            <div class="modal__info">
                
            </div>

            <div class="modal__btn">
                <Button />
            </div>


        </div>
    );
}

