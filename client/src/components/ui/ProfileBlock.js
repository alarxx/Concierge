import React from 'react';

export default function ProfileBlock({name, username, isMe}){


    return (
        <div className="profile">
            <div className="block">
                <div className="profile__avatar">
                    <img src="" alt=""/>
                </div>
            </div>
            <div className="block jcc tac">
                <div className="profile__name">
                    {name}
                </div>
                <div className="profile__username">
                    @{username}
                </div>
            </div>
            
            {isMe===true?
                <div className="block aic">
                    <a className="link" href="">Редактировать профиль</a> 
                </div>
            : "" }
            
        </div>
    );
}

