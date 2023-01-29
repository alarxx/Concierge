import React, { useState, useEffect } from 'react';

export default function Table(props){
    return (
        <table>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Имя менеджера</th>
                    <th>Эл. почта</th>
                    <th>Направление</th>
                    <th>Кол-во партнеров</th>
                    <th>Общ. сумма</th>
                    <th>Статус</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>984561</td>
                    <td>Имя Фамилия</td>
                    <td>sample_mail@mail.ru</td>
                    <td>Консультант</td>
                    <td>3</td>
                    <td>120 000тг</td>
                    <td className="color-success">Свободен</td>
                    <td>
                        {/*<!-- svg more -->*/}

                        <ul className="context-menu">
                            <li className="context-menu__li">Полная информация</li>
                            <li className="context-menu__li">Удалить</li>
                        </ul>
                    </td>
                </tr>
            </tbody>
        </table>
    )
}