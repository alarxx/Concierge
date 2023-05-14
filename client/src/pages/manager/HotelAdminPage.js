import React from "react";
import HotelCrudAction from "../../widgets/manager/hotel_crud_action/HotelCrudAction";
import HotelListTable from "../../widgets/manager/hotel_list_table/HotelListTable";
import Block from "../../shared/ui/block/Block";

export default function HotelAdminPage() {
    return(<>
        <HotelCrudAction />
        <Block top={40}>
            <HotelListTable />
        </Block>
    </>)
}