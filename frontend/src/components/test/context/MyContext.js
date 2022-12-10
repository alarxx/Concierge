import React, {createContext, useContext, useState} from 'react'

const Context = createContext();

export const useMyContext = () => useContext(Context);

export function MyProvider({children}){
    const [a, setA] = useState();

    const sayHi = () => console.log('Hi!');

    return (
        <Context.Provider value={{
            a,
            setA,
            sayHi
        }}>
            {children}
        </Context.Provider>
    );
}