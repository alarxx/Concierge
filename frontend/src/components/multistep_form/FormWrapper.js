import React from 'react';

export default function FormWrapper({title, children}){
    return (<>
        <h2 style={{
            textAlign: 'center',
            margin: 0,
            marginBottom: '2rem'
        }}>
            {title}
        </h2>

        <div style={{
            display: 'grid',
            gap: '1rem .5rem',
            justifyContent: 'flex-start',
            gridTemplateColumns: 'auto mixmax(auto, 400px)',
        }}>
            {children}
        </div>
    </>);
}