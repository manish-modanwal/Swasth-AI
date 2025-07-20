import React from 'react';
import { doctors } from '../assets/assets';
export const AppContext = React.createContext();

const AppContextProvider =(props)=>{



    const value={
        doctors
    }

    return (
        <AppContext.Provider value={value}>
              {props.children}
        </AppContext.Provider>
    )

}

export default AppContextProvider;