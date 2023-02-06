import {useEffect, useState} from "react";

export default function useAdaptive(){
    const [width, setWidth] = useState(window.innerWidth);
    const [isMobile, setIsMobile] = useState();

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
            setIsMobile(true)
        else
            setIsMobile(false)
    }, [width]);

    return { width, isMobile }
}