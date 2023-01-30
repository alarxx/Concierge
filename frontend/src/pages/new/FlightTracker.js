import React, { useState, useEffect } from 'react';
import {useAppContext} from "../../context/AppContext";
import Header from "./Header";
import Table from "../../components/ui/Table";
import Modal from "../../components/ui/Modal";

export default function Admin(){

    const {authHandler} = useAppContext();
    const {user} = authHandler;

    const [flights, setFlights] = useState([]);
    const [TimeResultsCurrent, setDate] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetch("https://alaport.com/Home/getCurrentFlights")
            .then(response => response.json())
            .then(result => {
                setFlights(result.data.flights);
                setDate(result.data.currentTime);
                setIsLoading(false);
            });
        
    }, []);

    const handleUpdate = async () => {
        setIsLoading(true);
        fetch("https://alaport.com/Home/getCurrentFlights")
            .then(response => response.json())
            .then(result => {
                setFlights(result.data.flights);
                setDate(result.data.currentTime);
                setIsLoading(false);
            });
        
    };

    console.log(TimeResultsCurrent)


    const [selectedId, setSelectedId] = useState(null);

    const handleRowClick = (id) => setSelectedId(id);
    const handleModalClose = () => setSelectedId(null);

    
    // const [filteredData, setFilteredData] = useState(null);
    // const [searchTerm, setSearchTerm] = useState('');
    // useEffect(() => {
    //     setFilteredData(
    //       flights.filter(row =>
    //         Object.values(row).some(val =>
    //           val.toString().toLowerCase().includes(searchTerm.toLowerCase())
    //         )
    //       )
    //     );
    //   }, [searchTerm, flights]);

    return (
        <div className="admin">
            <Header user={user} pageName="flightracker"></Header>

            <div className="workflow">
                <div className="container2">
                    <div className="workflow__wrapper">
                        <div className="title-admin">
                            Таблица рейсов
                            <span> {TimeResultsCurrent}</span>
                            { isLoading ? '' : <span><button onClick={handleUpdate}>Update</button></span>}
                        </div>
                        
                        {/* <input
                            type="text"
                            placeholder="Search"
                            value={searchTerm}
                            onChange={e => setSearchTerm(e.target.value)}
                        /> */}

                        <div className="table" id="managers">
                            <div className="table__body">
                                <table>
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
                                        {isLoading ? (
                                            <tr>
                                                <td colSpan="7">Loading...</td>
                                            </tr>
                                        ) : flights.map( item => (
                                            <tr key={item.afskey}>
                                                <td>{item.stad.split(" ")[0]}</td>
                                                <td>{item.stad.split(" ")[1]}</td>
                                                <td>{item.etad.split(" ")[1]}</td>
                                                <td>{item.airlineName}</td>
                                                <td>{item.path.origin.originEn}</td>
                                                <td>{item.path.destination.destinationEn}</td>
                                                <td>{item.airlineIata + " " + item.flightNumber}</td>
                                                <td>{item.remark.remarkEn}</td>
                                                <td><button onClick={() => handleRowClick(item.airlineIata + item.flightNumber)}>See a track</button></td>
                                            </tr>
                                        )) }
                                    </tbody>
                                </table>
                                {selectedId !== null && (
                                    <Modal id={selectedId} onClose={handleModalClose}> 
                                        <iframe 
                                            scrolling="no" 
                                            onLoad={ () => setIsMapLoading(false)} 
                                            src={`https://flighttrack.tavtechnologies.aero/flight_track?flight=${selectedId}`} 
                                        ></iframe>
                                    </Modal>
                                )}
                            </div>
                        </div>
                    </div>
                    
                </div>
            </div>

        </div>
    );
}