import React from 'react';

import FormWrapper from "../../../formComponents/FormWrapper";

import People from '../../../../icons/people.svg';
import Profile from '../../../../icons/profile.svg';

export default function WorkTypes({ }){
    return (
        <FormWrapper title={"Выберите подходящий вариант"}>
            <div className="worktypes">

                <div className="work-card">
                    <div className="work-card__icon">
                        <Profile />
                    </div>
                    <div className="work-card__caption">Физ. лицо</div>
                    <div className="work-card__descr">Командировка за счет своих средств</div>
                </div>

                <div className="work-card">
                    <div className="work-card__icon">
                        <People />
                    </div>
                    <div className="work-card__caption">Юр. лицо</div>
                    <div className="work-card__descr">Командировка за счет средств компании</div>
                </div>
            </div>

        </FormWrapper>
    );
}