import React from 'react';

import Navigation from '../widgets/navigation_panel/NavigationPanel';

export default function Layout({children}){

    return (
            <div className="section section-profile">
                {children}
                <Navigation />
            </div>
    )
}