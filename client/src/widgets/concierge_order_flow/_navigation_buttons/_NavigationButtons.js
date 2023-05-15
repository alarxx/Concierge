import React from "react";
import CardBody from "../../../shared/ui/card/CardBody";
import GroupFlex from "../../../shared/ui/group_flex/GroupFlex";
import Block from "../../../shared/ui/block/Block";
import ButtonIconic from "../../../shared/ui/button_iconic/ButtonIconic";
import ArrowLeft from "../../../assets/icons/backbtn_icon.svg";
import Typography from "../../../shared/ui/typography/Typography";
import Button from "../../../shared/ui/button/Button";

export default function _NavigationButtons({
       back=f=>f,
       isFirstStep=false,
       isLastStep=false,
   }) {

    return(<>
        <CardBody>
            <GroupFlex justify={isFirstStep ? 'jce' : 'jcsb'}>
                { !isFirstStep &&
                    <Block width={'auto'}>
                        <ButtonIconic inText={true} onClick={back}>
                            <ArrowLeft />
                            <Typography size={16} weight={500} color={'grey'}>Назад</Typography>
                        </ButtonIconic>
                    </Block>
                }

                <Block width={'auto'}>
                    <Button type={'submit'}>
                        {isLastStep ? 'Отправить' : 'Вперёд'}
                    </Button>
                </Block>
            </GroupFlex>
        </CardBody>
    </>)
}