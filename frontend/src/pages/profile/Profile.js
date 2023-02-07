import React from 'react'

import AdminIcon from '../../assets/icons/admin.svg'
import AuthIcon from '../../assets/icons/auth.svg'
import ChatIcon from '../../assets/icons/chat.svg'
import DetailsIcon from '../../assets/icons/details.svg'
import LogOutIcon from '../../assets/icons/log out.svg'
import MainIcon from '../../assets/icons/main.svg'
import OrderIcon from '../../assets/icons/order.svg'
import PartnerIcon from '../../assets/icons/partner.svg'
import ProfileIcon from '../../assets/strangeIcons/profile.svg'

import Menu from "../../components/phone/Menu";
import Workspace from "../../components/phone/Workspace";
import Workflow from "../../components/phone/Workflow";
import {useNavigate} from "react-router-dom";
import {useAppContext} from "../../context/AppContext";

function MyLink({
                    title="Page",
                    onClick=f=>f,
                    icon=f=>f}){
    return (
        <div className="push" onClick={onClick}>
            <div className="push__icon">{icon}</div>
            <div className="push__info">
                <div className="push__title">{title}</div>
            </div>
        </div>
    );
}

export default function Profile(){

    const navigate = useNavigate()

    const {authHandler, socketHandler, adaptiveHandler} = useAppContext();
    const {user, userLoading, userError, isAuthenticated} = authHandler;
    const {isConnected} = socketHandler;

    const { device } = adaptiveHandler;

    return (
        <Workflow>

            <Workspace>
                <h2>{device}</h2>

                {!userLoading && isAuthenticated() && <h2>{user.email}</h2>}
                {!userLoading && !isAuthenticated() && !isConnected && <h2>Disconnected</h2>}
                {userError?.error && <h2>{userError.error}</h2>}
                {userLoading && <p>loading...</p>}

                <div className="profile__pushs">
                    <MyLink title={"Home page"} onClick={e => navigate('/')} icon={<MainIcon />}/>
                    <MyLink title={"Admin page"} onClick={e => navigate('/admin')} icon={<AdminIcon />}/>

                    <MyLink title={"Profile page"} onClick={e => navigate('/profile')} icon={<ProfileIcon />}/>
                    <MyLink title={"Main page"} onClick={e => navigate('/main')} icon={<MainIcon />}/>

                    <MyLink title={"Auth page"} onClick={e => navigate('/authenticate')} icon={<AuthIcon />}/>
                    <MyLink title={"Log Out page"} onClick={e => navigate('/logout')} icon={<LogOutIcon />}/>

                    <MyLink title={"Chat page"} onClick={e => navigate('/chat')} icon={<ChatIcon />}/>
                    <MyLink title={"Order page"} onClick={e => navigate('/order')} icon={<OrderIcon />}/>

                    <MyLink title={"Partners page"} onClick={e => navigate('/partners')} icon={<PartnerIcon />}/>
                    <MyLink title={"Details page"} onClick={e => navigate('/details')} icon={<DetailsIcon />}/>
                </div>
            </Workspace>

            <Menu />
        </Workflow>
    );
}