import React from 'react'
import Workflow from "../../components/phone/Workflow";
import Workspace from "../../components/phone/Workspace";
import Menu from "../../components/phone/Menu";
import {Link, useNavigate} from "react-router-dom";
import {useAppContext} from "../../context/AppContext";
import Icon from "../../assets/icons/add.svg";

function MyLink({title="Page", onClick=f=>f}){
    return (
        <div className="push" onClick={onClick}>
            <div className="push__icon"><Icon /></div>
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
                    <MyLink title={"Home page"} onClick={e => navigate('/')}/>
                    <MyLink title={"Admin page"} onClick={e => navigate('/admin')}/>

                    <MyLink title={"Profile page"} onClick={e => navigate('/profile')}/>
                    <MyLink title={"Main page"} onClick={e => navigate('/main')}/>

                    <MyLink title={"Auth page"} onClick={e => navigate('/authenticate')}/>
                    <MyLink title={"Log Out page"} onClick={e => navigate('/logout')}/>

                    <MyLink title={"Chat page"} onClick={e => navigate('/chat')}/>
                    <MyLink title={"Order page"} onClick={e => navigate('/order')}/>

                    <MyLink title={"Partners page"} onClick={e => navigate('/partners')}/>
                    <MyLink title={"Details page"} onClick={e => navigate('/details')}/>
                </div>
            </Workspace>

            <Menu />
        </Workflow>
    );
}