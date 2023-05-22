import React, {useEffect, useState} from "react";

import styles from './kidsBox.module.css'
import useToggle from "../../hooks/useToggle";
import Modal from "../ui/modal/Modal";
import Block from "../ui/block/Block";
import Button from "../ui/button/Button";
import Typography from "../ui/typography/Typography";

const KIDS_AGES = [
    {value: 0, label: '0 лет'},
    {value: 1, label: '1 год'},
    {value: 2, label: '2 года'},
    {value: 3, label: '3 года'},
    {value: 4, label: '4 года'},
    {value: 5, label: '5 лет'},
    {value: 6, label: '6 лет'},
    {value: 7, label: '7 лет'},
    {value: 8, label: '8 лет'},
    {value: 9, label: '9 лет'},
    {value: 10, label: '10 лет'},
    {value: 11, label: '11 лет'},
    {value: 12, label: '12 лет'},
    {value: 13, label: '13 лет'},
    {value: 14, label: '14 лет'},
    {value: 15, label: '15 лет'},
    {value: 16, label: '16 лет'},
    {value: 17, label: '17 лет'},
]
function KidsAddButton({caption, onChangeSelect=f=>f}) {


    const [isModal, toggle] = useToggle();

    function onClick(age) {
        toggle()
        onChangeSelect(age)
    }

    return (<div className={styles['kidsBox-item']}>
        <button type={'button'} className={styles['kidsBox-button']} onClick={toggle}>{caption}</button>
        {isModal &&
            <Modal minWidth={360} maxWidth={400} onClose={toggle}>
                <Block bottom={10} isAlignCenter={true}>
                    <Typography size={18} weight={600}>Добавить ребёнка</Typography>
                </Block>
                <div className={styles['kidsBox-select']}>
                    {KIDS_AGES.map( (kidsAge, index) => (
                        <button type={'button'} className={styles['kidsBox-select-item']} onClick={e => onClick(kidsAge.value)} key={index}>{kidsAge.label}</button>
                    ))}
                </div>
                <Block top={10}>
                    <Button variant={'cancel'} onClick={toggle}>Отмена</Button>
                </Block>
            </Modal>
        }
    </div>)
}
export default function KidsBox({onChangeKids=f=>f}) {

    const [kids, setKids] = useState([]);

    useEffect(() => {
        onChangeKids(kids)
        console.log('kids', kids);
    }, [kids])
    function onAddKid(age) {
        const optionValue = age;
        console.log('optionValue', age);
        setKids((prevArray) => [...prevArray, optionValue]);
    }

    function removeKid(kidIndex) {
        const newKids = kids.filter((kid, index) => index !== kidIndex );
        setKids(newKids);
    }

    return(
        <div className={styles['kidsBox-wrapper']}>
            {kids.length > 0 && <>
                    {kids.map((kid, index) => {

                        return (
                                <div className={`${styles['kidsBox-item']} ${styles['kidsBox-item--selected']}`} key={index}>
                                    <div className={styles['kidsBox-item__text']}>
                                        {KIDS_AGES.find((kid_age) => kid_age.value === kid)?.label}
                                    </div>
                                    <button type={'button'} className={styles['kidsBox-item__close']} onClick={e => removeKid(index)}>
                                        ✖
                                    </button>
                                </div>
                        )
                    })}
            </>}
            {(kids.length > 0 && kids.length < 6) && <KidsAddButton caption={'+'} onChangeSelect={onAddKid} />}
            {(kids.length === 0) && <KidsAddButton caption={'Добавить ребёнка'} onChangeSelect={onAddKid} />}
        </div>
    )
}