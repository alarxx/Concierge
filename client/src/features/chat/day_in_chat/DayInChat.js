import React, {useEffect, useState} from 'react'
import monthName from "./model/monthName";

import styles from './dayInChat.module.css'
export default function DayInChat({ date }){

    const [str, setStr] = useState('')

    // useEffect(()=>{
    //     if(date.getDate() == new Date().getDate())
    //         setStr(`Сегодня`)
    //     else setStr(`${monthName(date.getMonth())} ${date.getDate()}`)
    // }, [date])

    return (
        <>
            <div className={styles.chatDay__wrapper}>
                <div className={styles.chatDay}>
                    {date}
                </div>
            </div>
        </>
    );
}