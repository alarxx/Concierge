import React, {useState} from 'react'

export default function useOrder(socket){
    const [orders, setOrders] = useState();
    const [userLoading, setUserLoading] = useState(true);
    const [userError, setUserError] = useState();

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
                console.log(user)
                setUserLoading(false);
                setUserError(null);
                setUser(user);
            }catch (err){
                setUserLoading(false);
                setUserError(err.message);
            }
        })();
    }
}