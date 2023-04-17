import React, {useEffect, useMemo, useState} from 'react';
import {Navigate, useLocation, useNavigate, useSearchParams} from "react-router-dom";

import useLastPage from "./useLastPage";
import Logger from '../../../internal/Logger';

import fetchJSON from "../../../internal/fetchJSON";

export default function useAuth({ socketHandler }){

    const logger = useMemo(() => new Logger('useAuth'), []);

    const location = useLocation();
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    const {socket, reconnect, isConnected} = socketHandler;

    const {saveLastPage, navigateLastPage} = useLastPage();

    const [user, setUserState] = useState({});
    const [userLoading, setUserLoading] = useState(true);
    const [userError, setUserError] = useState(null);
    /**
     * Вызов setUser означает что пользователь загрузился без ошибки.
     *
     * Зачем нужна глубокая проверка перед назначением нового объекта пользователя?
     * Для хуков, которые ставят в зависимость объект пользователя. Хуки проверяют ссылку объекта.
     * */
    function setUser(obj){
        setUserLoading(false);
        setUserError(null);
        if(JSON.stringify(obj) !== JSON.stringify(user)) { // типа глубокое сравнение объектов
            setUserState(obj);
        }
        else {
            logger.log("trying to set the same user")
        }
    }


    useEffect(()=>{
        logger.log("userLoading:", userLoading, "isConnected:", isConnected);
    }, [userLoading]);

    useEffect(()=>{
        logger.log("user changed", user);
    }, [user]);

    /**
     * На сколько я сейчас понимаю connect_error будет прилетать
     * либо когда пользователь не аутентифицирован,
     * либо когда не удается подключиться к серверу,
     * что может быть из-за отсутствия интернета у клиента или отключенного сервер.
     * */
    useEffect(()=>{
        socket.on("connect_error", (err) => {
            logger.error(err.message);
            setUser({});
            setUserError(err);
        });
    }, []);


    /**
     * Основа поддержки актуального состояния пользователя на клиенте.
     *
     * socket подключается только когда пользователь имеет сессию,
     * он не может подключиться в ином случае и всегда будет показывать isConnected=false.
     *
     * Если же socket все таки подключился, то мы отправляем запрос на whoami для получения информации о пользователе.
     * Здесь есть важный момент, что необязательно отправлять fetch запрос, лучше было бы воспользоваться socket,
     * так как задержка в таком случае была бы меньше, но здесь есть нюансы связанные с состоянием гонки этих запросов.
     * Для решения проблемы гонки с fetch, я пользую AbortController и запрос, который больше не нужен, не исполняется.
     *
     * userLoading всегда true в моменты неопределенности - на старте приложения, тогда, когда сокет почему-то разъединился или пока не пришел ответ от whoami.
     *
     * // Так мы понимаем, что произошел reconnect и перезагружаем пользователя.
     *  */
    useEffect(()=>{
        // ...isConnected из-за начального промежуточного ПО socket.io - показатель аутентификации пользователя

        // Даже если мы и пропускаем при отключенном socket-е, мы все равно говорим, что пользователь грузится.
        setUserLoading(true);

        // Не выполнять whoami, может быть просто потеряна связь
        if(!isConnected) {
            return logger.log('Не выполнять whoami, может быть просто потеряна связь');
        }

        logger.log("check /whoami");

        const abortController = new AbortController();

        const url = '/auth/whoami';

        fetch(url, {signal: abortController.signal})
            .then(async (res) => {

                // logger.log("response:", url, res);

                if(res.status === 200){
                    const json = await res.json();
                    setUser(json.user);
                }
                else {
                    // Это никогда не будет выполняться, потому что в начале идет проверка на подключение socket.isConnected
                    logger.error('Выполнилось невыполнимое')
                    setUser({}); // Сбрасываем юзера
                    throw new Error('Unauthorized');
                }
            })
            .catch((err)=>{
                setUserError(err);
            })
            .finally(()=>{
                setUserLoading(false);
            })

        return () => {
            logger.log("abortController.abort()");
            abortController.abort();
        }

    }, [isConnected]);


    /**
     * Любое действие которое требует перехода на аутентификацию должно выполняться так, а не напрямую через navigate('/authn')
     * */
    function authenticate(){
        if(userLoading){
            return logger.error('Please wait for the user to connect');
        }
        if(isAuthenticated) {
            return logger.error('Already authenticated');
        }
        if(location.pathname.startsWith('/authn')) {
            return logger.error(`Cannot call the authenticate() method from the '/authn' path`);
        }

        saveLastPage();
        // Здесь я ставлю replace.
        // Например, неаутентифицированный пользователь проходит: /home -> /protected -> /authn
        // Не захотел логиниться, хочет вернуться обратно, и его должно перебросить на /home
        navigate('/authn', {replace:true});
    }

    /**
     * Нужно в хуках с зависимостью от URL. Чтобы не было вечных циклов.
     * */
    function safeNavigate(link){
        if(location.pathname !== link){
            navigate(link);
        }
    }

    /**
     * Проверка статуса и перенаправление на другие страницы.
     * Нужно перенаправлять на /banned, /activation и так далее в зависимости от статуса.
     *
     * Не знаю как разделить на модули этот участок, здесь много логики и дело в том, что она связанна друг с другом.
     * Если выполнилось одно не должно выполняться другое.
     * */
    useEffect(()=>{
        // Здесь в любом случае должны navigate-ить с replace, и searchParams соответственно удаляется
        if(searchParams.has('activation_token')){
            const activation_token = searchParams.get('activation_token');

            logger.log(`redirect to /activation with activation_token ${activation_token}`);

            /*
            * Нужно по тестировать и возможно добавить включение сокета где-нибудь,
            * хотя после activation, я сразу закрываю окно.
            * */
            socket.disconnect();

            return navigate('/authn/activation', {
                state: {
                    activation_token
                },
                replace: true,
            });
        }
        else if(searchParams.has('reset_password_token')){
            const reset_password_token = searchParams.get('reset_password_token');

            logger.log(`redirect to /authn/reset with activation_token ${reset_password_token}`);

            /*
            * Нужно по тестировать и возможно добавить включение сокета где-нибудь,
            * хотя после activation, я сразу закрываю окно.
            * */
            socket.disconnect();

            return navigate('/authn/reset', {
                state: {
                    reset_password_token
                },
                replace: true,
            });
        }
        else if(searchParams.has('authenticated')) {

            const authenticated = JSON.parse(searchParams.get('authenticated'));

            if(authenticated){
                logger.log('?authenticated=true');
                if(!isAuthenticated) { // Дожидаемся пока пользователь загрузится, ничего не делаем
                    return;
                }
                if(user.status === 'ok' && user.name){
                    logger.log('authenticated');
                    return navigateLastPage();
                }
            }
            else {
                logger.log('?authenticated=false')
                // здесь 100% isAuthenticated = false
                // Можно было бы поставить эту проверку после !isAuthenticated, но эта ошибка тогда никогда не будет достижима
                const message = 'Something went wrong, failed to authenticate'; //'Not authenticated for some reason';
                logger.error(message);
                return navigate('/authn', { replace: true, state: { message } });
            }
        }

        /*
        * Если пользователь аутентифицирован, то он никак не попадет на страницы статуса, а вот если иначе, то эти страницы уже сами должны себя защищать,
        * иначе здесь будет слишком много проверок, эти проверки ведь достаточно часто будут пробегать.
        * */
        if(!isAuthenticated) {
            return;
        }

        if(user.status === 'banned'){
            return safeNavigate('/authn/banned');
        }
        else if(!user.name){
            return safeNavigate('/authn/no_name');
        }
        else if(location.pathname === '/authn/banned' || location.pathname === '/authn/activation' || location.pathname === '/authn/no_name'){
            /* То есть если все с пользователем хорошо, но он почему-то находится на этих страницах перенаправляем его на lastPage or home */
            return navigateLastPage();
        }
        // else {
        //     logger.error("Shit happens: when is this going to happen? When nothing from above worked");
        // }

    }, [user, location.pathname]);


    /**
     * userFetch во время fetch запроса объявляет userLoading и, если статус кода не успешный, назначает ответ как userError.
     * */
    async function userFetch(url, opt={}){
        setUserLoading(true);

        const json = await fetchJSON(url, opt);

        if(json.status < 200 && json.status >= 300){
            setUserError(json);
        }

        setUserLoading(false);

        return json;
    }

    /**
     * */
    async function logout(){
        setUser({});
        const json = await userFetch('/auth/logout', { method: 'DELETE' })

        if(json.status === 200){
            localStorage.clear();
            reconnect();
        }

        return json;
    }

    /**
     * signin может выдать как json, так и перенаправить.
     * Здесь реализуется эта логика.
     * */
    async function signin({ email, password }){
        const response = await fetch('/auth/local/signin', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        })

        // в случае успеха должен прилететь редирект
        if(response.redirected && window){
            // window.location.href = response.url;
            window.location.replace(response.url);
            return;
        }

        const json = await response.json();

        return ({ ...json, status: response.status });
    }


    /**
     * */
    async function activation({ activation_token, name, password }){
        return await fetchJSON('/auth/local/activation', {
            method: 'POST',
            body: { activation_token, name, password }
        });
    }

    /**
     *
     * */
    async function sendActivationMail({ email }){
        // Эта функция должна работать при отключенном сокете, потому что мы отключаем его
        return await fetchJSON('/auth/local/send-activation', {
            method: 'POST',
            body: { email }
        });
    }

    /**
     * Возможно есть смысл здесь не делать userFetch, а использовать fetchJSON обычный?
     * */
    async function assignName({ name }){
        if(userLoading){
            return logger.error('Please wait for the user to connect');
        }
        if(!isAuthenticated) {
            return logger.error('Authentication is required to assignName');
        }
        return await userFetch('/auth/name', {
            method: "PATCH",
            body: { name }
        });
        /*
        logger.log(json)
        Авто reconnect с socket user-observer
        if(json.status === 200){
            reconnect();
        }*/
    }


    /**
     * Зачем я здесь оборачиваю в функцию?
     * */
    const isAuthenticated = (() => Boolean(user.email))();


    /**
     * */
    async function resetPassword({ reset_password_token, password }){
        return await fetchJSON('/auth/password/reset', {
            method: 'POST',
            body: { reset_password_token, password }
        });
    }


    /**
     *
     * */
    async function sendResetPasswordMail({ email }){
        // Эта функция должна работать при отключенном сокете, потому что мы отключаем его
        return await fetchJSON('/auth/password/send-reset', {
            method: 'POST',
            body: { email }
        });
    }


    return ({
        user, userLoading, userError,
        sendActivationMail,
        activation,
        signin,
        logout,
        isAuthenticated,
        authenticate,
        assignName,
        resetPassword,
        sendResetPasswordMail
    });

}

/*
▄───▄
█▀█▀█
█▄█▄█
─███──▄▄
─████▐█─█
─████───█
─▀▀▀▀▀▀▀
*/
