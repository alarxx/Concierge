import React, {useEffect, useState} from "react";
import Table from "../../../shared/ui/table/Table";
import TableHead from "../../../shared/ui/table/TableHead";
import TableBody from "../../../shared/ui/table/TableBody";
import Loader from "../../../shared/ui/loader/Loader";
import TableRow from "../../../shared/ui/table/TableRow";
import HotelCrudAction from "../hotel_crud_action/HotelCrudAction";


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
                <TableRow isHead={true}>Действие</TableRow>
                {/*<TableRow isHead={true}>Звездность</TableRow>*/}
                {/*<TableRow isHead={true}>Контакты</TableRow>*/}
                {/*<TableRow isHead={true}>Город</TableRow>*/}
                {/*<TableRow isHead={true}>Адрес</TableRow>*/}
                {/*<TableRow isHead={true}>Кол-во номеров</TableRow>*/}
            </TableHead>
            <TableBody Loader={<Loader color={'black'}/>} isLoading={isLoading}>
                { hotels.map( item => (
                    <>
                        <TableRow key={item.id}>
                            <td>{item.id}</td>
                            <td>{item.name}</td>
                            <td><HotelCrudAction item={item}/></td>
                        </TableRow>
                    </>
                ))}
            </TableBody>
        </Table>
    </>)
}