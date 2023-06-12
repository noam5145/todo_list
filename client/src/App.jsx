import React, { createContext, useState } from "react";
import MainSite from "./comp/MainSite";



export const MyContext = createContext();


export default function App() {
  let val = {


  const newMission = async (mission)=>{
    // let res = await axios.post(base_url_mission, mission);
    // console.log(res.data);
  }
  const val = {
    currentUser,
    newMission,
  }
  return (
    <div>
      <MyContext.Provider value={val} >
        <MainSite />
      </MyContext.Provider>
    </div>
  );
}
