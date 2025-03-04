import React, { createContext, useReducer } from 'react'

export const ParentContext=createContext()
function DataProvider({children,reducer,initialState}) {

    
  return (
    <ParentContext.Provider value={useReducer(reducer,initialState)}>
      {children}
    </ParentContext.Provider>
  )
}


export default DataProvider
