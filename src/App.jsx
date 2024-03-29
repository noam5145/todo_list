import React, { createContext, useEffect, useState } from "react";
import MainSite from "./comp/MainSite";
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import io from 'socket.io-client';
import AppRoutes from "./routes/AppRoutes";
// const base_url = 'https://server-todolist-xr2q.onrender.com/';
const base_url = 'http://localhost:5174/';
// import Login from "./comp/Login";
export const MyContext = createContext();
var MISSIONS;

export default function App() {

  const [currentUser, setCurrentUser] = useState();
  const [missions, setMissions] = useState([]);
  const [archive, setArchive] = useState([]);
  const [users, setUsers] = useState([]);
  const [newMissions, setNewMissions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [socketIo, setSocketIo] = useState();
  let flag = true;

  useEffect(()=>{
    if(currentUser?.username){
      setSocketIo(io(base_url, {
        transports: ["websocket", 'polling'],
      }));
    }
 
}, [currentUser])

useEffect(() => {
 if(socketIo){
    socketIo.on('login', ()=>{
      socketIo.emit("username", currentUser.username);
    })

    socketIo.on('getMessage', () =>  {
       getAllMissions(currentUser.token);
    });

    socketIo.on('connected', (user)=>{
        // console.log(user);
    })

    socketIo.on('updatedNewMission', ()=>{
      getUser({token: currentUser.token});
    })

    socketIo.on('getArchive', ()=>{
      getAllArchives(currentUser.token);
    })

    socketIo.on('getNewUser', ()=>{
      getAllUsers(currentUser);
    })

    socketIo.on('getConfirmMission', ()=>{
      getAllMissions(currentUser.token);
    })

    socketIo.on('updatedUser', ()=>{
      getAllUsers(currentUser);
    })

    // socketIo.on('disconnected', (id)=>{
    //     console.log(id);
    // })
  }
}, [socketIo])

  const newMission = async(mission, token)=>{
    // setLoading(true)
    let res = await axios.post(base_url + 'mission/setMission', {...mission, adminToken: token});
    if(res.data.err){
      return console.log(res.data.err);
    }
    socketIo.emit('updateNewMission',{});
    // setLoading(false);
  }
  const getAllMissions = async (token)=>{
    // setLoading(true)
    let res = await axios.get( base_url + 'mission', {params: {token: token}});
    if(res.data.err){
      return console.log(res.data.err);
    }
    setMissions(res.data);
    // setLoading(false);
  }
  const getAllArchives = async (adminToken)=>{
    setLoading(true)
    let res = await axios.get( base_url + 'mission/getArchive', {params: {adminToken: adminToken}});
    if(res.data.err){
      return console.log(res.data.err);
    }
    setArchive(res.data);
    setLoading(false);
  }
  const sendToArchives = async (_id , adminToken)=>{
    let res = await axios.post( base_url + 'mission/sendToArchive', {adminToken: adminToken, _id: _id});
    if(res.data.err){
      return console.log(res.data.err);
    }
    socketIo.emit('sendToArchive', adminToken);
    setMissions(missions.filter((m)=> m._id !== _id));
  }
 
  function endAtChanged(endTime) {
    const partsStartTime = endTime.split("-");
    const reversStartendTime = partsStartTime.reverse().join("/");
    return reversStartendTime;
  }

  function daysOff(endTime) {
    endTime = endAtChanged(endTime);
    let day = Number(endTime[0] + endTime[1]);
    let month = Number(endTime[3] + endTime[4]) - 1;
    let year = Number(endTime[6] + endTime[7] + endTime[8] + endTime[9]);
    var targetDate = new Date(year, month, day);
    var today = new Date();
    var timeDiff = targetDate.getTime() - today.getTime();
    var daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
    return daysDiff;
  }

  const changeStatus = (item) =>{
    if(daysOff(item) < 0 ){
      return "בחריגה";
    }
    else{
      return item;    }

  }


  const getNewMissions = async (missions)=>{
    setLoading(true)
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
      setLoading(false);
    }
  }
  useEffect(()=>{
    if(missions[0]){
      getNewMissions(missions);
      change(missions);
    }
  }, [missions])

  
  const setNewUser = async (user)=>{
    setLoading(true)
    let user1 = await axios.post(base_url + 'user/setNewUser', {...user, adminToken: currentUser?.token});
    if(user1.data.err){
      return console.log(user1.data.err);
    }
    socketIo.emit('setNewUser', {});
    setLoading(false);
  }
  const getUser = async(user)=>{
    setLoading(true)
    let res = await axios.get(base_url + 'user/getUser', {params: user});
    if(res.data.err){
      return console.log(res.data.err);
    }
    setCurrentUser(res.data);
    setLoading(false);
    document.cookie = "T_L_T=" + res.data.token;
    getAllMissions(res.data.token);
    if(res.data.access === 'admin'){
      getAllUsers(res.data);
      getAllArchives(res.data.token);
    }
   }
  const getAllUsers = async (user)=>{
    setLoading(true)
    let res = await axios.get(base_url + 'user/getAllUsers', {params : user});
    if(res.data.err){
      return console.log(res.data.err);
    }
    setUsers(res.data);
    setLoading(false);
  }
  const updateUser = async (user, adminToken)=>{
    let res = await axios.put(base_url + 'user/updateUser', {...user, adminToken: adminToken});
    if(res.data.err){
      return console.log(res.data.err);
    }
    socketIo.emit('updateUser', {});
  }
  const updateMission = async (mission, adminToken)=>{
    let res = await axios.put(base_url + 'mission/updateMission', {...mission, adminToken: adminToken});
    if(res.data.err){
      return console.log(res.data.err);
    }
    getAllMissions(currentUser.token);
  }

  const sendToConfirm = async (mission, uToken)=>{
    mission.changeStatus = currentUser.username;
    let res = await axios.put(base_url + 'mission/sendToConfirm', {...mission, uToken: uToken});

    if(res.data.err){
      return console.log(res.data.err);
    }
    socketIo.emit('sendToConfirm', {});
  }

  const updateChat = async (mission, token)=>{
    let res = await axios.put(base_url + 'mission/updateChat', {...mission, token: token});
    if(res.data.err){
      return console.log(res.data.err);
    } 
  }


  const deleteUser = async (_id, adminToken) =>{   
    setLoading(true)
    let res = await axios.delete(base_url + 'user/deleteUser', {params: {
      _id: _id,
      adminToken: adminToken,
    }});
    if(res.data.err){
      return console.log(res.data.err);
    }
    setUsers(users.filter((user)=> user._id !== _id));
    setLoading(false);
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



  function getDaysDifference(startDate, endDate) {
    const startParts = startDate.split('/');
    const endParts = endDate.split('/');
  
    // Creating Date objects from the input dates
    const start = new Date(startParts[2], startParts[1] - 1, startParts[0]);
    const end = new Date(endParts[2], endParts[1] - 1, endParts[0]);
  
    // Calculating the difference in milliseconds
    const differenceInMs = end.getTime() - start.getTime();
  
    // Converting the difference to days
    const differenceInDays = Math.floor(differenceInMs / (1000 * 60 * 60 * 24));
  
    return differenceInDays;
  }



  const change = (missions)=>{
    let newMissions = [];
const date = new Date();
const options = { day: 'numeric', month: 'numeric', year: 'numeric' };
const formattedDate = date.toLocaleDateString('en-GB', options); // Adjust the locale as needed



    if (missions[0]) {
      newMissions = [...missions];
      newMissions?.map((item, i) => {
        console.log();
        item.endedAt = endAtChanged(item.endedAt);
        item.startedAt = endAtChanged(item.startedAt);
        const resultDate = getDaysDifference( formattedDate,item.endedAt )
        // item.endedAt = getDaysDifference( formattedDate,item.endedAt );
        if (resultDate < 0 && item.status !== "בוצע") {
          item.status = "בחריגה";
        }})}


      }


  let val = {
    currentUser,
    newMission,
    getUser,
    setNewUser,
    missions,
    setMissions,
    users,
    deleteUser,
    deleteMission,
    newMissions,
    updateMission,
    sendToConfirm,
    updateChat,
    updateUser,
    setNewMissions,
    daysOff,
    changeStatus,
    endAtChanged,
    sendToArchives,
    archive,
    loading,
    setArchive,
    getDaysDifference,
    socketIo



  }
  return (
    <div>
      <MyContext.Provider value={val} >
        <AppRoutes />
      </MyContext.Provider>
    </div>
  );
}







