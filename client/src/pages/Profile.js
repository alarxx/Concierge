import React from 'react';

import Menu from "../components/ui/Menu";
import Layout from "../components/layouts/Layout";

import ProfileBlock from '../components/ui/ProfileBlock'
import Section from '../components/ui/Section'
import Genres from '../components/ui/Genres'
import List from '../components/ui/List'
import ListItem from "../components/ui/Listitem"

import Icon from '../assets/icons/arrow_forward_FILL0_wght400_GRAD0_opsz48.svg'
import LogoutIcon from '../assets/icons/logout_FILL0_wght400_GRAD0_opsz48.svg'


import profileStyles from "../assets/css/profile.css"

export default function Profile({}){

    let user = {
        name: "Konstantinta",
        username: "flexussername",
        isMe: true,
        about: "I like non-fiction books, so don't distrube me by fantasy!!",
        genres: ["testa","bgfhsta","asdasda","tesasasta"],
    }

    return (
        <Layout>
            <div className="section section-profile">
                <ProfileBlock name={user.name} username={user.username} isMe={user.isMe} />
                <Section title="О себе" text={user.about} />
                <Genres title="Любимые жанры" genres={user.genres} />
                
                {user.isMe===true?
                    <List>
                        <ListItem title="История" icon={<Icon />} />
                        <ListItem title="Уведомления" icon={<Icon />} />
                        <ListItem title="Настройки" icon={<Icon />} />
                    </List>
                : "" }
                {user.isMe===true?
                    <List>
                        <ListItem title="Выйти" type="danger" icon={<LogoutIcon />} />
                    </List>
                : "" }
                
            </div>
        </Layout>
    )
}