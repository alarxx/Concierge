import FormWrapper from "../../FormWrapper";
import React from "react";

export default function AccountForm({email, password, updateFields}){
    return (
        <FormWrapper title={"Account"}>
            <label>Email</label>
            <input autoFocus required type='email' value={email} onChange={e=>updateFields({email: e.target.value})}/>
            <label>Password</label>
            <input required type='password' value={password} onChange={e=>updateFields({password: e.target.value})}/>
        </FormWrapper>
    );
}