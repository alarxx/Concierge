import React, {useEffect, useState} from "react";
import Table from "../../../shared/ui/table/Table";
import TableHead from "../../../shared/ui/table/TableHead";
import TableBody from "../../../shared/ui/table/TableBody";
import Loader from "../../../shared/ui/loader/Loader";
import TableRow from "../../../shared/ui/table/TableRow";
import HotelCrudAction from "../hotel_crud_action/HotelCrudAction";
import useToggle from "../../../hooks/useToggle";
import HotelCrudForm from "../../../features/hotel/hotel_crud_form/HotelCrudForm";
import Link from "../../../shared/ui/link/Link";
import HotelRoomForm from "../../../features/hotel/hotel_room_form/HotelRoomForm";


function HotelTableItem({item, key}){
    const [isActive, toggle] = useToggle(false);
    const [isRoomActive, roomToggle] = useToggle(false);

    return (<>
        <TableRow key={key}>
            { isActive && <HotelCrudForm title={'Информация об отеле'} item={item} onClose={toggle}/> }
            { isRoomActive && <HotelRoomForm title={'Номера'} item={item} onClose={roomToggle}/> }

            <td>{item.id}</td>
            <td>{item.name}</td>
            <td>{item.city}</td>
            <td><Link text={'Подробнее'} onClick={toggle} /></td>
            <td><Link text={'Посмотреть номера'} onClick={roomToggle} /></td>
        </TableRow>
    </>)
}

export default function HotelListTable({children, active}) {

    const [hotels, setHotels] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(()=>{
        fetch('/api/hotel').then(res=> res.json()).then(json => {
            setIsLoading(true)
            console.log(json)
            setHotels(json)
            setIsLoading(false)
        })
    }, [])




    return (<>
        <Table>
            <TableHead>
                <TableRow isHead={true}>id</TableRow>
                <TableRow isHead={true}>Название</TableRow>
                <TableRow isHead={true}>Местоположение</TableRow>
                <TableRow isHead={true}>Действие</TableRow>
                <TableRow isHead={true}>Действие</TableRow>
                {/*<TableRow isHead={true}>Звездность</TableRow>*/}
                {/*<TableRow isHead={true}>Контакты</TableRow>*/}
                {/*<TableRow isHead={true}>Город</TableRow>*/}
                {/*<TableRow isHead={true}>Адрес</TableRow>*/}
                {/*<TableRow isHead={true}>Кол-во номеров</TableRow>*/}
            </TableHead>
            <TableBody Loader={<Loader color={'black'}/>} isLoading={isLoading}>
                { hotels.map( item => (
                    <HotelTableItem key={item.id} item={item}/>
                ))}
            </TableBody>
        </Table>
    </>)
}