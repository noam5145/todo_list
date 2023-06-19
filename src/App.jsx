import React, { createContext, useEffect, useState } from "react";
import MainSite from "./comp/MainSite";
import axios from 'axios';
import AppRoutes from "./routes/AppRoutes";
const base_url = 'https://server-todolist-xr2q.onrender.com/';
// import Login from "./comp/Login";

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
    let user1 = await axios.post(base_url + 'user/setNewUser', {...user, adminToken: currentUser?.token});
    if(user1.data.err){
      return user1.data.err;
    }
    setUsers([...users, user1.data]);
  }

  const getUser = async(user)=>{
    let res = await axios.get(base_url + 'user/getUser', {params: user});
    if(res.data.err){
      return res.data.err;
    }
    setCurrentUser(res.data);
    localStorage.setItem('token', res.data.token);
    getAllMissions(res.data.token);
    getAllUsers(res.data);
   }

  const getAllUsers = async (user)=>{
    let res = await axios.get(base_url + 'user/getAllUsers', {params : user});
    if(res.data.err){
      return res.data.err;
    }
    setUsers(res.data);
  }
 
  const updateUser = async (user)=>{
    let res = await axios.put(base_url + 'user/updateUser');
    if(res.data.err){
      return res.data.err;
    }
    getAllUsers(currentUser);
  }

  const updatePost = async (post)=>{
    let res = await axios.put(base_url + 'user/updateUser', post);
    if(res.data.err){
      return res.data.err;
    }
    console.log(res.data);
  }

  const deleteUser = async (_id, adminToken) =>{
    let res = await axios.delete(base_url + 'user/deleteUser', {params: {
      _id: _id,
      adminToken: adminToken,
    }});
    if(res.data.err){
      return res.data.err;
    }
    setUsers(users.filter((user)=> user._id !== _id));
  }

  const deleteMission = async (_id, adminToken) =>{
    let res = await axios.delete(base_url + 'mission/deleteMission', {params: {
      _id: _id,
      adminToken: adminToken,
    }});
    if(res.data.err){
      console.log(res.data.err);
    }
    setMissions(missions.filter((mission)=> mission._id !== _id));
  }

  let flag = true;
  useEffect(()=>{
    if(flag){
      let t = localStorage.getItem('token');
      if(t){
        getUser({token: t});
      }
      flag=false
    }
  },[])

  let val = {
    currentUser,
    newMission,
    getUser,
    setNewUser,
    missions,
    users,
    deleteUser,
    deleteMission,
  }


 
  return (
    <div>
      <MyContext.Provider value={val} >
        <AppRoutes />
      </MyContext.Provider>
    </div>
  );
}