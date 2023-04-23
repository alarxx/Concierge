import React from 'react';

import Navigation from '../widgets/navigation/Navigation';

export default function Layout({children}){

    return (
            <div className="section section-profile">
                {children}
                <Navigation />
            </div>
    )
}