import React from 'react';

export default function FormWrapper({title, undertitle, children}){
    return (<>
        <div className="title">{title}</div>
        {undertitle && <div className="undertitle_text">{undertitle}</div>}

        <div className="in_form_wrapper">
            {children}
        </div>
    </>);
}