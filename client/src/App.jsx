import React, { createContext, useEffect, useState } from "react";
import MainSite from "./comp/MainSite";
import axios from 'axios';
import AppRoutes from "./routes/AppRoutes";
const base_url = 'https://server-todolist-xr2q.onrender.com/';

export const MyContext = createContext();


export default function App() {
  const [currentUser, setCurrentUser] = useState();
  let [missions, setMissions]=useState();
  const newMission = async(mission)=>{
      let res = await axios.get(base_url + 'mission', {params: mission});
      setMissions(res.data)
      console.log(missions)
    
  
  }

  const setUser = async (username)=>{
    let user = await axios.get(base_url + 'user/getUser', {params: {username : username}});
    console.log(user.data);
  }


  let val = {
    currentUser,
    newMission,
    missions,

  }


 
  return (
    <div>
      <MyContext.Provider value={val} >
        {currentUser?.username}
        <AppRoutes />
      </MyContext.Provider>
    </div>
  );
}
