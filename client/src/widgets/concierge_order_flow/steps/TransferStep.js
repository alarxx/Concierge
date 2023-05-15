import React from 'react';

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
        <h1>Transfer</h1>
    </>);
}