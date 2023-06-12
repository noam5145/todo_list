import React, { createContext, useState } from "react";
import MainSite from "./comp/MainSite";



export const MyContext = createContext();


export default function App() {
  let val = {}


 
  return (
    <div>
      <MyContext.Provider value={val} >
        <MainSite />
      </MyContext.Provider>
    </div>
  );
}
