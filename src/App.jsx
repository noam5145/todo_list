import React, { createContext, useEffect, useState } from "react";
import MainSite from "./comp/MainSite";
import axios from 'axios';
import AppRoutes from "./routes/AppRoutes";
const base_url = 'https://server-todolist-xr2q.onrender.com/';
import Login from "./comp/Login";

export const MyContext = createContext();


export default function App() {
  const [currentUser, setCurrentUser] = useState();
  const [missions, setMissions] = useState([]);

  const newMission = async(mission)=>{
    let res = await axios.post('http://localhost:5174/' + 'mission/setMission', mission);
    if(res.data.err){
      return;
    }
    setMissions([...missions, res.data]);
  }

  const getAllMissions = async ()=>{
    let res = await axios.get(base_url + 'mission/getAllMissions', {params: {token: currentUser?.token}});
    if(res.data.err){
      return;
    }
    setMissions(res.data);
  }

  const setNewUser = async (user)=>{
    let user1 = await axios.post(base_url + 'user/setUser', {...user,
      adminToken: currentUser.token,
    });
    if(user.data.err){
      return user.data.err;
    }
    console.log(user.data);
  }

  const getUser = async(user)=>{
    let res = await axios.get(base_url + 'user/getUser', {params: user});
    if(res.data.err){
      return res.data.err;
    }
    setCurrentUser(res.data);
  }

  let flag = true;
  useEffect(()=>{
    if(flag){
      getAllMissions();
      flag=false;
    }
  },[])


  let val = {
    currentUser,
    newMission,
    getUser,
  }


 
  return (
    <div>
      <MyContext.Provider value={val} >
        {/* {!currentUser ? <Login/> : ''}
        {currentUser?.username} */}
        {missions.map((e)=>{
          e.status + "\n" +
          e.daysLeft
        })}
        <AppRoutes />
      </MyContext.Provider>
    </div>
  );
}