import React from 'react';

export default function ListItem({title, icon, type=""}){
    return (
        <div className={`li ${type}`}>
            {title}
            {icon}
        </div>
    );
}

