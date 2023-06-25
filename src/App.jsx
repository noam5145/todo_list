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
  const [newMissions, setNewMissions] = useState([]);
  let flag = true;

  const newMission = async(mission)=>{
    let res = await axios.post(base_url + 'mission/setMission', mission);
    if(res.data.err){
      return console.log(res.data.err);
    }
    setMissions([...missions, res.data]);
  }

  const getAllMissions = async (token)=>{
    let res = await axios.get( base_url + 'mission', {params: {token: token}});
    if(res.data.err){
      return console.log(res.data.err);
    }
    setMissions(res.data);
  }

  const getNewMissions = async (missions)=>{
    if(currentUser?.newMissions){
      let arr =[];
      for(let i =0 ; i < currentUser.newMissions.length; i++){
        for(let j =0; j < missions.length; j++){
          if(missions[j]._id === currentUser.newMissions[i]){
            arr.push(missions[j]);
          }
        }
      }
      setNewMissions(arr);
    }

  }

  useEffect(()=>{
    if(missions[0]){
      getNewMissions(missions);
    }
  }, [missions])
  
  const setNewUser = async (user)=>{
    let user1 = await axios.post(base_url + 'user/setNewUser', {...user, adminToken: currentUser?.token});
    if(user1.data.err){
      return console.log(user1.data.err);
    }
    setUsers([...users, user1.data]);
  }

  const getUser = async(user)=>{
    let res = await axios.get(base_url + 'user/getUser', {params: user});
    if(res.data.err){
      return console.log(res.data.err);
    }
    setCurrentUser(res.data);
    document.cookie = "T_L_T=" + res.data.token;
    getAllMissions(res.data.token);
    if(res.data.access === 'admin'){
      getAllUsers(res.data);
    }
   }

  const getAllUsers = async (user)=>{
    let res = await axios.get(base_url + 'user/getAllUsers', {params : user});
    if(res.data.err){
      return console.log(res.data.err);
    }
    setUsers(res.data);
  }
 
  const updateUser = async (user, adminToken)=>{
    let res = await axios.put(base_url + 'user/updateUser', {...user, adminToken: adminToken});
    if(res.data.err){
      return console.log(res.data.err);
    }
    getAllUsers(currentUser);
  }

  const updateMission = async (mission, adminToken)=>{
    let res = await axios.put(base_url + 'mission/updateMission', {...mission, adminToken: adminToken});
    if(res.data.err){
      return console.log(res.data.err);
    }
    getAllMissions(currentUser.token);
  }

  const deleteUser = async (_id, adminToken) =>{   
    let res = await axios.delete(base_url + 'user/deleteUser', {params: {
      _id: _id,
      adminToken: adminToken,
    }});
    if(res.data.err){
      return console.log(res.data.err);
    }
    setUsers(users.filter((user)=> user._id !== _id));
  }

  const deleteMission = async (_id, adminToken) =>{
    let res = await axios.delete(base_url + 'mission/deleteMission', {params: {
      _id: _id,
      adminToken: adminToken,
    }});
    if(res.data.err){
      return console.log(res.data.err);
    }
    getAllMissions(adminToken);
  }

  useEffect(()=>{
    if(flag){
      let t = document.cookie.split('T_L_T=')[1]?.split(';')[0]
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
    newMissions,
    updateMission,
  }


 
  return (
    <div>
      <MyContext.Provider value={val} >
        <AppRoutes />
      </MyContext.Provider>
    </div>
  );
}