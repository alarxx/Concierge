import React, {useState} from 'react';
import FormWrapper from "../../../components/form/FormWrapper";

import Search from "../../../components/form/Search";
import CardItem from "../../../components/cards/CardItem";
import Cards from "../../../components/cards/Cards";
import ServiceItem from "../../../components/form/ServiceItem";
import HouseSVG from "../../../assets/icons/house.svg";
import Checkbox from "../../../components/form/Checkbox";
import InputForm from "../../../components/form/InputForm";

export default function F7_Transport({conversation_name, updateFields=f=>f}){
    return (
        <>
            <FormWrapper title={"Название для услуги"}>
                <InputForm
                    placeHolder={"Как вы хотите назвать услугу?"}
                    updateFields={updateFields}
                    field_key={"conversation_name"}
                    value={conversation_name}
                />
            </FormWrapper>
        </>
    );
}
