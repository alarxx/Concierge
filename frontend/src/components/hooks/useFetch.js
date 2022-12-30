import React, {useState, useEffect} from 'react';

export default function useFetch(resource, options){
    const [data, setData] = useState();
    const [error, setError] = useState();
    const [loading, setLoading] = useState(true);

    useEffect(()=>{
        if(!resource) return;
        setLoading(true);

        (async () => {
            try{
                const response = await fetch(resource, options);
                const userData = await response.json();

                if(response.status !== 200)
                    throw new Error(userData.message);

                setLoading(false);
                setData(userData);
            }
            catch(err){
                setLoading(false);
                setError(err);
            }
        })();

    }, [resource]);

    return {loading, data, error};
}
