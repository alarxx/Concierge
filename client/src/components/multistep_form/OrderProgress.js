import React from 'react';

export default function OrderProgress({ n=0, currentStepIndex=0, goTo=f=>f }){
    return (
        <div>{/*className="progress-order"*/}

            {/*className='progress-order__wrapper'*/}
            <div>
                {
                    [...new Array(n)].map((el, i)=>(
                        <>
                            {/*className={`progress-order__point ${currentStepIndex===i?'progress-order__point-active':''}`}*/}
                            <div key={i} onClick={e => goTo(i)}>
                                { i + 1 }
                            </div>
                        </>
                    ))
                }

            </div>

        </div>
    );
}

