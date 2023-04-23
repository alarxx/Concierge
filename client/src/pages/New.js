import React, { Fragment, useState, useEffect } from 'react';

import Card from '../ui/card/Card';
import CardHeader from '../ui/card/CardHeader';
import Logo from '../ui/logo/Logo';
import CardBody from '../ui/card/CardBody';
import CardFooter from '../ui/card/CardFooter';
import Button from '../ui/button/Button';
import CircleButton from '../ui/circle_button/CircleButton';
import GroupButtons from '../ui/group_buttons/GroupButtons';

import NewHotelOrder from '../entities/order/new_hotel_order/NewHotelOrder'
import NewTransferOrder from '../entities/order/new_transfer_order/NewTransferOrder'

export default function New({}){

    const [isActiveTab, setIsActiveTab] = useState(false)
    const [activeTab, setActiveTab] = useState(null)
    const [activeEl, setActiveEl] = useState(null)

    // useEffect(()=> {
    //     if 
    // }, [isSignup])

    useEffect(() => {
        console.log("activeTab", activeTab)
        switch (activeTab) {
            case 'hotel':
                setActiveEl(<NewHotelOrder />)
                break;
            case 'transfer':
                setActiveEl(<NewTransferOrder />)
                break;
            default:
                setActiveEl(null)
                break;
          }
      }, [activeTab]);

    const handleClick = (activeTab) => {
        setActiveTab(activeTab)
        setIsActiveTab(true);
    };

    return (
        <Fragment>
            {isActiveTab && activeEl 
                ? <CircleButton onClick={()=>handleClick('')}>Назад</CircleButton>
                : ""
            }
            <Card>
                <CardHeader>
                    <Logo />
                </CardHeader>
                <CardBody>
                    {isActiveTab && activeEl
                        ? activeEl
                        : <GroupButtons>
                            <Button onClick={()=>handleClick('hotel')}>Найти отель</Button>
                            <Button onClick={()=>handleClick('transfer')}>Найти трансфер</Button>
                            <Button onClick={()=>handleClick()}>Найти билеты</Button>
                        </GroupButtons>
                    }
                    
                </CardBody>
                <CardFooter>
                    {/* {isSignup 
                        ? <TextWithLink text="Уже есть аккаунт?" linktext="Авторизация" onClick={() => handleClick(false)} />
                        : <TextWithLink text="Нет аккаунта?" linktext="Регистрация" onClick={() => handleClick(true)} />
                    }
                    */}
                </CardFooter>
            </Card>
        </Fragment>
    )
}