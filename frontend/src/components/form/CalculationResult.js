import React from 'react';

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
                            <svg width="10" height="10" viewBox="0 0 24 24" fill="none"
                                 xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22Z"
                                    stroke="#292D32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                <path d="M12 8V13" stroke="#292D32" stroke-width="1.5" stroke-linecap="round"
                                      stroke-linejoin="round"/>
                                <path d="M11.9945 16H12.0035" stroke="#292D32" stroke-width="2" stroke-linecap="round"
                                      stroke-linejoin="round"/>
                            </svg>
                        </span>
                {`В сумме были учитаны ${employeeMeals}$ на питание сотрудников. Сумма на питание не покрывается скидкой`}
            </div>

        </div>
    );
}