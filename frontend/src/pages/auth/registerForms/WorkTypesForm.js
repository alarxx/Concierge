import React, {useEffect, useState} from 'react';

import FormWrapper from "../../../components/form/FormWrapper";

import People from '../../../assets/icons/people.svg';
import Profile from '../../../assets/icons/profile.svg';

function WortTypes({children}){
    return (
        <div className="worktypes">
            {children}
        </div>
    );
}

function WorkCard({
                      caption, description, icon=<div></div>,
                      active=false,
                      onClick=f=>f
}){
    return (
        <div className={`work-card ${active?'work-card-active':''}`} onClick={onClick}>
            <div className="work-card__icon">
                {icon}
            </div>
            <div className="work-card__caption">{caption}</div>
            <div className="work-card__descr">{description}</div>
        </div>
    );
}

export default function WorkTypesForm({entity, updateFields=f=>f }){
    return (
        <FormWrapper title={"Выберите подходящий вариант"}>
            <WortTypes>
                <WorkCard caption={"Физ. лицо"} description={"Командировка за счет своих средств"} icon={<Profile/>}
                          active={entity === "individual"}
                          onClick={e => updateFields({entity: "individual"})}

                />
                <WorkCard caption={"Юр. лицо"} description={"Командировка за счет средств компании"} icon={<People/>}
                          active={entity === "juridical"}
                          onClick={e => updateFields({entity: "juridical"})}
                />
            </WortTypes>
        </FormWrapper>
    );
}