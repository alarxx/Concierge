import React from 'react';

export default function NeedsStep({
                                      data={},
                                      upsertFields=f=>f,

                                      next=f=>f,
                                      back=f=>f,

                                      submit=f=>f,
                                      close=f=>f,

                                      isFirstStep=false,
                                      isLastStep=false,
                              }){

    const { needs } = data;

    return (<>
        <h1>Needs</h1>
        <input type={'text'} value={needs?needs:''} onChange={e => upsertFields({ needs: e.target.value}) }/>]

        <button onClick={next}>Next</button>
        <button onClick={back}>Back</button>
    </>);
}