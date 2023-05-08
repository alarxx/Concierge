import React, {useState} from 'react';

export default function useLoading(){
    const [loading, setLoading] = useState(false);
    return ({
        loading,
        setLoading
    });
}