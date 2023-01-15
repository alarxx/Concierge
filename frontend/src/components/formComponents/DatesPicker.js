import React from 'react';

export default function DatesPicker({  }){
    return (
        <div className="date_component">
            <label>Даты</label>
            <div className="datepicker">
                <input type="date" className="input-date" name="datepicker_start" placeholder="Выбрать" />
                <input type="date" className="input-date" name="datepicker_end" placeholder="Выбрать" />
            </div>
        </div>
    );
}