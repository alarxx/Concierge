import React, {useState} from 'react';

import styles from './buttonScrollToBottom.module.css'
export default function ButtonScrollToBottom() {

    const [visible, setVisible] = useState(true)

    const toggleVisible = () => {
        const scrolled = document.documentElement.scrollTop;
        if (scrolled > 0){
            setVisible(false)
        }
        else if (scrolled <= 0){
            setVisible(true)
        }
    };

    const scrollToBottom = () =>{
        window.scrollTo({
            top: document.documentElement.scrollHeight,
            behavior: 'auto'
            /* you can also use 'auto' behaviour
               in place of 'smooth' */
        });
    };

    window.addEventListener('scroll', toggleVisible);

    return (
        <button onClick={scrollToBottom} className={styles['ButtonScrollToBottom']}>
            вниз
        </button>
    );
}