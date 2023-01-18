import React from 'react';

import InfoCircle from '../../assets/icons/info-circle.svg'

const calculatedSumD = {min: "400 000", max: "480 000"};
const discountedSumD = {min: "360 000", max: "420 000"};
const discountNowD = 30;
const employeeMealsD = 100;

export default function CalculationResult({
                                              calculatedSum=calculatedSumD,
                                              discountedSum=discountedSumD,
                                              discountNow=discountNowD,
                                              employeeMeals=employeeMealsD
                                          }){
    return (
        <div className="result-example">

            <div className="result-example__row">
                Примерная сумма:
                <span>{calculatedSum.min} ~ {calculatedSum.max} Т</span>
            </div>

            <div className="result-example__price">
                {discountedSum.min} ~ {discountedSum.max} T
            </div>

            <div className="result-example__row fw600">
                При оформлении заявки сейчас вы получите скидку на {discountNow}%!
            </div>

            <div className="result-example__dopinfo">
                        <span>
                            <InfoCircle width="10" height="10" viewBox="0 0 24 24"/>
                        </span>
                {`В сумме были учитаны ${employeeMeals}$ на питание сотрудников. Сумма на питание не покрывается скидкой`}
            </div>

        </div>
    );
}