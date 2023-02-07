import React, {useState} from 'react'

import Workflow from '../phone/Workflow';
import Workspace from '../phone/Workspace';
import InputForm from '../form/InputForm';

export default function ServiceForm({title, onClose=f=>f, children, updateFields=f=>f}){

    return (
        <Workflow>
            <Workspace>
                <div class="create-service">
                    <div class="title">
                        Заполните информацию о новой услуге
                    </div>
                    <div class="create-service__from">
                        <InputForm
                            type="text"
                            required={true}
                            label={"Название услуги"}
                            placeHolder={"Введите значение"}
                            updateFields={updateFields}
                            field_key={"service_name"}
                            // value={num_of_people}
                        />
                        <div class="input-form">
                            <label for="people_quantity"></label>
                            <input type="text" name="people_quantity" class="input input-choice" placeholder="" />
                        </div>  
                        <div class="input-form">
                            <label for="people_quantity">Описание услуги</label>
                            <textarea 
                                type="text" 
                                name="people_quantity" 
                                class="input input-choice" 
                                placeholder="Введите значение"
                                rows="3"></textarea>
                        </div>  
                        <div class="input-form">
                            <label for="people_quantity">Имя партнера</label>
                            <input type="text" name="people_quantity" class="input input-choice" placeholder="Введите значение" />
                        </div>  
                        <div class="input-form">
                            <label for="people_quantity">Номер пратнера</label>
                            <input type="text" name="people_quantity" class="input input-choice" placeholder="Введите значение" />
                        </div>  
                        <div class="input-form">
                            <label for="people_quantity">Задать цену за общий период</label>
                            <input type="text" name="people_quantity" class="input input-choice" placeholder="Введите значение" />
                        </div>  
                    </div>
                    <div class="makeprice__controls">
                        <div class="btn btn-secondary btn-prev mr-5">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M14.4299 5.92993L20.4999 11.9999L14.4299 18.0699" stroke="#292D32" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                                <path d="M3.5 12H20.33" stroke="#292D32" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>  
                            <span>Назад</span>  
                        </div>
                        <div class="btn btn-main btn-next">
                            <span>Далее</span>  
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M14.4299 5.92993L20.4999 11.9999L14.4299 18.0699" stroke="#ffff" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                                <path d="M3.5 12H20.33" stroke="#ffff" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>    
                        </div>
                    </div>
                </div>
            </Workspace>
        </Workflow>
    );
}