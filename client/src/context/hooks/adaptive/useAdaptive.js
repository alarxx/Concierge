import {useEffect, useState} from 'react';
import Logger from '../../../internal/Logger';
const logger = new Logger('useAdaptive');

export default function useAdaptive(){
    const [width, setWidth] = useState(window.innerWidth);
    const [device, setDevice] = useState('');

    function changeDevice(d){
        if(device === d) return;
        logger.log(`device changed(${d})`);
        setDevice(d);
    }

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
        if(width < 596) {
            changeDevice('mobile')
        }
        else if(width < 768){
            changeDevice('tablet')
        }
        else {
            changeDevice('desktop')
        }
    }, [width]);

    return { width, device }
}