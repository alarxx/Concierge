import React, {useMemo, useState} from 'react';
import {useNavigate} from "react-router-dom";
import F1 from "./steps/F1";
import F2 from "./steps/F2";
import Logger from "../../../internal/Logger";
import {useAppContext} from "../../../context/AppContext";
import MultistepForm from "../../../components/multistep_form/MultistepForm";

const STEPS = [
    F1,
    F2,
];

export default function HotelOrderFlow(){
    /*
     * useMemo(): мемоизирует значение.
     * useCallback(): мемоизирует функцию.
     * memo(): мемоизирует компонент.
     * */
    const logger = useMemo(()=>new Logger('ServiceOrder'), []);

    const navigate = useNavigate();

    const { ordersHandler, authHandler } = useAppContext();
    // const { createOrder } = ordersHandler;
    const { isAuthenticated, userLoading, authenticate } = authHandler;

    // const {data, setData, isFilledBefore} = _useFilled()
    const [data, setData] = useState();
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState([]);


    async function onSubmit(){
        // Убеждаемся, что пользователь авторизован и создаем заказ
        if (!isAuthenticated) {
            logger.error("Not authenticated");
            // Сохраняем состояние и навигируем на страницу аутентификации, точнее вызываем authenticate();
        }
        else {

            logger.log("Submitted order on ServiceOrder", data);
            // Как отлавливать ошибку и если что перенаправлять пользователя обратно, чтобы исправить ошибку?
            // Получается мы должны дождаться выполнения функции createOrder и потом
            // createOrder(order); // Как создать?
            // navigate(-1); // Куда потом перенаправлять? Просто назад нельзя, а вдруг по URL пришли на эту страницу
        }
    }

    return (<>
        {/* Это тоже лучше занести в MultistepForm */}
        {loading && <p>loading...</p>}

        {!loading &&
            <MultistepForm
                forms={STEPS}
                data={data}
                setData={setData}
                errors={errors}
                setErrors={setErrors}
                loading={loading}
                setLoading={setLoading}
                onSubmit={onSubmit}
                onClose={() => logger.log('close button clicked')}
                submitButtonName={"Оставить заявку"}
            />
        }
    </>);
}