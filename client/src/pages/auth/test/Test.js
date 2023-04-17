import React from 'react';
import {useAppContext} from "../../../context/AppContext";

/**
 * Тестировал возврат на последнюю страницу после аутентификации.
 * */
export default function Test(){
    const {socketHandler, authHandler, URLStateHandler} = useAppContext();
    const {setState, getState, clearState} = URLStateHandler;

    const {user, userLoading, isAuthenticated, authenticate} = authHandler;

    return (<>
        <h1>[Test]</h1>

        {userLoading && <p>loading...</p>}
        <h1>User: {isAuthenticated ? user.email : 'not authenticated'}</h1>

        <button onClick={e => authenticate()}>Authenticate</button><br/>
    </>);
}