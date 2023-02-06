import {useEffect, useState} from "react";

export default function useAdaptive(){
    const [width, setWidth] = useState(window.innerWidth);
    const [device, setDevice] = useState('');

    useEffect(() => {
        const handleResize = () => {
            // console.log(window.innerWidth);
            setWidth(window.innerWidth);
        }
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    useEffect(()=>{
        if(width < 596)
            setDevice('mobile')
        else if(width < 768)
            setDevice('tablet')
        else
            setDevice('desktop')
    }, [width]);

    return { width, device }
}