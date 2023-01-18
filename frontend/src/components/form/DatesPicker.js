import React from 'react';

export default function DatesPicker({
                                        updateFields=f=>f,
                                        date_start,
                                        date_start_key,
                                        date_end,
                                        date_end_key,
                                        one_way_ticket,
                                        placeholderOnStart,
                                        placeholderOnEnd,
}){

    function setField(key, date){
        const obj = {};
        obj[key] = date;
        updateFields(obj);
    }

    return (
        <div className="date_component">
            <label>Даты</label>
            <div className="datepicker">
                <input
                    type="date" className="input-date" name="datepicker_start" placeholder="Выбрать"
                    value={date_start}
                    onChange={e => setField(date_start_key, e.target.value)}
                />
                {!one_way_ticket &&
                <input
                    type="date" className="input-date" name="datepicker_end" placeholder="Выбрать"
                    value={date_end}
                    onChange={e => setField(date_end_key, e.target.value)}
                />}
            </div>
        </div>
    );
}