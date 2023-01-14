import React from 'react';

export default function FormWrapper({title, children}){
    return (<>
        <div className="title">{title}</div>

        <div className="uslug__wrapper needed_component in_form_wrapper">
            {children}
        </div>
    </>);
}