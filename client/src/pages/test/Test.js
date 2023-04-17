import React from 'react';
import {useAppContext} from "../../../context/AppContext";
import {useNavigate} from "react-router-dom";
import useTimer from "../../../hooks/useTimer";
import Layout from "../../../components/layouts/Layout";
import lol from "../../../assets/css/styles.module.css";

/**
 * Тестировал возврат на последнюю страницу после аутентификации.
 * */
export default function Test(){
    const navigate = useNavigate();
    const {socketHandler, authHandler, URLStateHandler} = useAppContext();
    const {setState, getState, clearState} = URLStateHandler;

    const {user, userError, userLoading, isAuthenticated, authenticate} = authHandler;

    const {timer, startTimer, stopTimer, resetTimer} = useTimer(()=>{console.log("Timer ended")}, 3);

    return (
        <Layout>
            <h1>[Landing]</h1>

            {userLoading && <p>loading...</p>}
            <h1>User: {isAuthenticated ? user.email : 'not authenticated'}</h1>
            {userError && <h1>{`Error: ${userError.message}`}</h1>}

            <button onClick={e => authenticate()}>Authenticate</button><br/>
            <button onClick={e => socketHandler.reconnect()}>Reconnect</button><br/>

            <button onClick={e => navigate('/protected')}>Protected</button><br/>
            <button onClick={e => navigate('/authn/logout')}>Logout</button><br/>
            <button onClick={e => navigate('/authn/banned')}>Banned</button><br/>
            <button onClick={e => navigate('/authn/test')}>Test</button><br/>
            <button onClick={e => navigate('/authn/activation')}>Activation</button><br/>

            <button onClick={e => {
                const obj = { page: 'Landing' }
                setState(obj);
                logger.log('setState', obj);
            }}>setState</button><br/>
            <button onClick={e => {
                logger.log(getState())
            }}>getState</button><br/>
            <button onClick={e => {
                clearState();
                logger.log('clearState');
            }}>clearState</button><br/>

            <h1 className={lol.lol}>Book Club</h1>
            <h1 className="lol">Book Fuck</h1>


            <h1>Timer</h1>
            <button onClick={startTimer}>Start</button>
            <button onClick={stopTimer}>Stop</button>
            <button onClick={resetTimer}>Reset</button>
            <p>{timer} seconds</p>
        </Layout>
    )
}