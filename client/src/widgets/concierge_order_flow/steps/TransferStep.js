import React from 'react';
import Block from "../../../shared/ui/block/Block";
import Typography from "../../../shared/ui/typography/Typography";
import _NavigationButtons from "../_navigation_buttons/_NavigationButtons";
import CardBody from "../../../shared/ui/card/CardBody";
import Card from "../../../shared/ui/card/Card";

export default function TransferStep({
                                        data={},
                                        upsertFields=f=>f,

                                        next=f=>f,
                                        back=f=>f,

                                        submit=f=>f,
                                        close=f=>f,

                                        isFirstStep=false,
                                        isLastStep=false,
                                    }){

    const { } = data;

    function onSubmitHandler(e) {
        e.preventDefault();

        if (isLastStep) {
            return submit();
        }
        return next();
    }


    return (<>
        <form onSubmit={onSubmitHandler}>
            <Card>
                <CardBody>
                    <Block isAlignCenter={true} bottom={40}>
                        <Typography size={20} weight={700} align={'center'}>Данные по трансферу</Typography>
                    </Block>
                </CardBody>

                <_NavigationButtons isLastStep={isLastStep} isFirstStep={isFirstStep} back={back}/>
            </Card>
        </form>
    </>);
}