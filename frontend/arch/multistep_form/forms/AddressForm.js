import FormWrapper from "../FormWrapper";
import React from "react";

export default function AddressForm({state, city, street, updateFields}){
    return (
        <FormWrapper title={"Address"}>
            <label>State</label>
            <input autoFocus required type='text' value={state} onChange={e=>updateFields({state: e.target.value})}/>
            <label>City</label>
            <input required type='text' value={city} onChange={e=>updateFields({city: e.target.value})}/>
            <label>Street</label>
            <input required type='text' value={street} onChange={e=>updateFields({street: e.target.value})}/>
        </FormWrapper>
    );
}