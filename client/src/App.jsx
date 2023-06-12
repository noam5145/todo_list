import React, { createContext, useState } from "react";
import MainSite from "./comp/MainSite";
import AppRoutes from "./routes/AppRoutes";
import axios from 'axios';


const base_url_mission = 'http://localhost:5174/mission';

export const MyContext = createContext();


export default function App() {
  const [currentUser, setCurrentUser]= useState({namg:''});


  const newMission = async (mission)=>{
    let res = await axios.post(base_url_mission, mission);
    console.log(res.data);
  }
  const val = {
    currentUser,
    newMission,
  }
  return (
    <div>
      <MyContext.Provider value={val} >
      <AppRoutes/>
      </MyContext.Provider>
    </div>
  );
}
