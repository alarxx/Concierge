import React, {useEffect, useState} from 'react';

export default function useAuth(socket){
    const [user, setUser] = useState();
    const [userLoading, setUserLoading] = useState(true);
    const [userError, setUserError] = useState();

    useEffect(()=>{
        // Нужно как-нибудь добавить listener на socket, потому что пользователь может удалиться во время сеанса с другого сеанса
        check()
        setInterval(()=>check(), 1000*60*60); // раз в 5 минут перепроверять пользователя
    }, [])

    useEffect(()=>{
        if(user)
            console.log(user)
    }, [user])

    const userFetch = (url, opt={}) => {
        (async ()=>{
            setUserLoading(true);
            try{
                if(opt.body && typeof opt.body !== 'string')
                    opt.body = JSON.stringify(opt.body);

                const res = await fetch(url, {
                    headers: {
                        'Content-Type': 'application/json'
                        // 'Content-Type': 'application/x-www-form-urlencoded',
                    },
                    ...opt
                });
                const user = await res.json();
                setUserLoading(false);
                setUserError(null);
                setUser({...user, id: 1}); // id в продакшене не меняем!
            }catch (err){
                setUserLoading(false);
                setUserError(err.message);
            }
        })();
    }

    const login = (body) => userFetch('/auth/login', {method: 'POST', body})

    const register = (body) => userFetch('/auth/register', {method: 'POST', body})

    const check = () => userFetch('/auth')

    const logout = () => userFetch('/auth/logout', {method: 'DELETE'})

    return {
        user, userLoading, userError,
        login,
        register,
        check,
        logout,
        isAuthenticated: () => Boolean(user?.email),
    };
}
