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
  const [users, setUsers] = useState([]);
  const newMission = async(mission)=>{
    let res = await axios.post(base_url + 'mission/setMission', mission);
    if(res.data.err){
      return;
    }
    setMissions([...missions, res.data]);
  }

  const getAllMissions = async (token)=>{
    let res = await axios.get( base_url + 'mission', {params: {token: token}});
    if(res.data.err){
      return;
    }
    setMissions(res.data);
  }

  const setNewUser = async (user)=>{
    let user1 = await axios.post(base_url + 'user/setNewUser', {...user,
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
      console.log(res.data);

      return res.data.err;
    }
   setCurrentUser(res.data);
    localStorage.setItem('token', res.data.token);
    getAllMissions(res.data.token);
  }

  let flag = true;
  useEffect(()=>{
    if(flag){
      let t = localStorage.getItem('token');
      if(t){
        getUser({token: t});
        // getAllMissions();
      }
      flag=false;
    }
  },[])


  let val = {
    currentUser,
    newMission,
    getUser,
    setNewUser,
    missions
  }


 
  return (
    <div>
      <MyContext.Provider value={val} >
        {/* {!currentUser ? <Login/> : ''}
         {currentUser?.username}  */}
        <AppRoutes />
      </MyContext.Provider>
    </div>
  );
}