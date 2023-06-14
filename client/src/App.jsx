import React, { createContext, useEffect, useState } from "react";
import MainSite from "./comp/MainSite";
import axios from 'axios';
import AppRoutes from "./routes/AppRoutes";
import Login from "./comp/Login";
const base_url = 'https://server-todolist-xr2q.onrender.com/';

export const MyContext = createContext();


export default function App() {
  const [currentUser, setCurrentUser] = useState();

  const newMission = async(mission)=>{
    let res = await axios.get(base_url + 'mission', {params: mission});
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
    let res = await axios.get('http://localhost:5174/user/getUser', {params: user});
    if(res.data.err){
      return res.data.err;
    }
    setCurrentUser(res.data);
  }

  let flag = true;
  useEffect(()=>{
    if(flag){
      // getUser()
      console.log("M")
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
        {!currentUser ? <Login/> : ''}
        {currentUser?.username}
        <AppRoutes />
      </MyContext.Provider>
    </div>
  );
}
