import React from 'react'

export default function Workflow({isOverflowBg, children}){
    return (
        <div className={`phone_workflow ${isOverflowBg ?  'phone_workflow-bg' : ''}`}>
            {children}
        </div>
    )
}