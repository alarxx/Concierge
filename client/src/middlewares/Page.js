import React, {Fragment, useEffect, useMemo} from 'react';

import {useAppContext} from "../context/AppContext";

import Logger from '../internal/Logger';
import Alert from "../shared/ui/alert/Alert";
import Loader from "../shared/ui/loader/Loader";
import Block from "../shared/ui/block/Block";
import Overlay from "../shared/ui/overlay/Overlay";
import Loading from "../shared/loading/Loading";
import ComingSoon from "../features/order/coming_soon/ComingSoon";
import Modal from "../shared/ui/modal/Modal";
import LogoutForm from "../features/auth/logout/LogoutForm";
import Typography from "../shared/ui/typography/Typography";
import GroupButtons from "../shared/ui/group_buttons/GroupButtons";
import Button from "../shared/ui/button/Button";

/**
 * Скопировано из ProtectedPage.js
 * */
export default function Page({ children }){

    const logger = useMemo(()=>new Logger('ProtectedPage'), []);

    const { authHandler, adaptiveHandler } = useAppContext();
    const { user, isAuthenticated, userLoading, isOffline } = authHandler;
    const { device } = adaptiveHandler;

    // if(device !== 'mobile' && (!isAuthenticated || isAuthenticated && user.role !== 'admin')){
    //     return <>
    //         <Modal minWidth={360} maxWidth={400}>
    //             <Block isAlignCenter={true}>
    //                 <Typography weight={700} size={24} bottom={12}>Адаптация в разработке</Typography>
    //                 <Typography weight={500} size={16} color={'#65727D'} align={'center'}>Пожалуйста, перейдите на ваше мобильное устройство, чтобы воспользоваться всеми функциями.</Typography>
    //             </Block>
    //         </Modal>
    //     </>
    // }

    // Если был залогинен, то мы не дергаем страницу.
    if(isOffline){
        // pop-up окно должно быть
        return (<>
            <Alert variant={'danger'}>
                <p>Соединение потеряно</p>
            </Alert>
            {children}
        </>);
    }
    else if(userLoading){
        console.log("Page.js: user loading")
        // pop-up
        return (<>
            <Loading />
            {children}
        </>);
    }
    else {
        return (<>
            {children}
        </>);
    }

}