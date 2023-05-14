import React from "react";
import HotelCrudAction from "../../widgets/manager/hotel_crud_action/HotelCrudAction";
import HotelListTable from "../../widgets/manager/hotel_list_table/HotelListTable";

export default function HotelAdminPage() {
    return(<>
        <HotelCrudAction />
        <HotelListTable />
    </>)
}