import React from "react";

import styles from './table.module.css';
export default function Table({children, Loader, isLoading}) {

    return (<>
        <div className="table" id="managers">
            <div className="table__body">
                <table className={styles['table']}>

                    <thead>
                        <tr>
                            <th>Дата</th>
                            <th>План</th>
                            <th>Факт</th>
                            <th>Авиакомпания</th>
                            <th>Отправление</th>
                            <th>Прибытие</th>
                            <th>Рейс</th>
                            <th>Статус</th>
                            <th></th>
                        </tr>
                    </thead>

                    <tbody id="flightsBody">
                        {/*{isLoading ? (*/}
                        {/*    <tr>*/}
                        {/*        <td colSpan="7">{Loader}</td>*/}
                        {/*    </tr>*/}
                        {/*) : flights.map( item => (*/}
                        {/*    <tr key={item.afskey}>*/}
                        {/*        <td>{item.stad.split(" ")[0]}</td>*/}
                        {/*        <td>{item.stad.split(" ")[1]}</td>*/}
                        {/*        <td>{item.etad.split(" ")[1]}</td>*/}
                        {/*        <td>{item.airlineName}</td>*/}
                        {/*        <td>{item.path.origin.originEn}</td>*/}
                        {/*        <td>{item.path.destination.destinationEn}</td>*/}
                        {/*        <td>{item.airlineIata + " " + item.flightNumber}</td>*/}
                        {/*        <td>{item.remark.remarkEn}</td>*/}
                        {/*        <td><button onClick={() => handleRowClick(item.airlineIata + item.flightNumber)}>See a track</button></td>*/}
                        {/*    </tr>*/}
                        {/*)) }*/}
                    </tbody>
                </table>

            </div>
        </div>
    </>)
}