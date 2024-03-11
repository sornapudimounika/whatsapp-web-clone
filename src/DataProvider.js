// import React, {createContext, useContext, useReducer} from "react"

// export const StateContext = createContext()

// export const provider = ({reducer, initialState, children}) => (
//     <StateContext.provider value={useReducer(reducer, initialState)}>
//         {children}
//     </StateContext.provider>
// )

// export const useStateValue = () => useContext(StateContext)

import React, { createContext, useContext, useReducer} from 'react';

export const DataContext = createContext();

export const DataProvider = ({ reducer, initialState, children }) => {
  return (
    <DataContext.Provider value={useReducer(reducer, initialState)}>
      {children}
    </DataContext.Provider>
  );
};

export const useStateValue = () => useContext(DataContext)
