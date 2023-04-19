import React from 'react';

export default function OrderProgress({ n=0, currentStepIndex=0, goTo=f=>f }){
    return (
        <div className="progress-order">
            <div className='progress-order__wrapper'>
                {[...new Array(n)].map((el, i)=>{
                    return (<>
                        <div key={i} onClick={e => goTo(i)} className={`progress-order__point ${currentStepIndex===i?'progress-order__point-active':''}`}>
                            { i + 1 }
                        </div>
                    </>)
                })}

            </div>
        </div>
    );
}

