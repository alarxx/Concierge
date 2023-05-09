import React from 'react';


export default function Layout({ children }){

    return (
        <>
        {/* <header>
            <div class="container">
                <nav>
                    <div class="nav__left"><span class="title title-mini">Профиль</span></div>
                    <div class="nav__center"></div>
                    <div class="nav__right"></div>
                </nav>
            </div>
        </header> */}
        <main>
            <div>{/*className="container"*/}
                { children }
            </div>
        </main>
        </>
    );
}

