import React from 'react';
import Block from "../../../shared/ui/block/Block";
import Typography from "../../../shared/ui/typography/Typography";

export default function TransferStep({
                                      data={},
                                      upsertFields=f=>f,

                                      next=f=>f,
                                      back=f=>f,

                                      submit=f=>f,
                                      close=f=>f
                                  }){

    const { } = data;

    return (<>
        <Block isAlignCenter={true} bottom={40}>
            <Typography size={20} weight={700} align={'center'}>Данные по трансферу</Typography>
        </Block>
    </>);
}