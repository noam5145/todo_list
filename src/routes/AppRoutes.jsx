import React, { useContext, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { MyContext } from "../App";
import UserTasks from '../comp/topNav/userTasks/UserTasks'
import NotFound from "../NotFound";
import AddMissions from "../comp/sideNav/addMissions/AddMissions";
import Dashboard from "../comp/sideNav/dashboard/Dashboard";
import MissionExeption from "../comp/sideNav/missionExeption/MissionExeption";
import PendingMissions from "../comp/sideNav/pendingMissions/PendingMissions";
import TaskList from "../comp/sideNav/taskList/TaskList";
import Alerts from "../comp/topNav/alerts/Alerts";
import Settings from "../comp/topNav/settings/Settings";
import SideNav from "../comp/sideNav/SideNav";
import TopNav from "../comp/topNav/TopNav";
import MainSite from "../comp/MainSite";
import CompletedTasks from "../comp/sideNav/completedTasks/CompletedTasks";
import TheChat from "../comp/sideNav/taskList/chat/TheChat";
import Login from '../comp/Login';



export default function AppRoutes() {
  const {currentUser} = useContext(MyContext);


  return (
    <>
    <div className="" style={{height:"100vh", width:"100%"}}>
      {/* {currentUser?.username ? <> */}
      <TopNav/>
      <div className="d-flex bg-light">
      <SideNav/>
      <Routes>
        {currentUser.access !== 'admin'  ? <>
        <Route path="/" element={<MainSite />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/chat" element={<TheChat />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/taskList" element={<TaskList />} />
        <Route path="/alerts" element={<Alerts />} />
        <Route path="/UserTasks" element={<UserTasks />} />
        </> : <>
        <Route path="/" element={<MainSite />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/chat" element={<TheChat />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/taskList" element={<TaskList />} />
        <Route path="/alerts" element={<Alerts />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/UserTasks" element={<UserTasks />} />
        <Route path="/archives" element={<CompletedTasks />} />
        <Route path="/addMissions" element={<AddMissions />} />
        <Route path="/PendingMissions" element={<PendingMissions />} />
        <Route path="/missionExeption" element={<MissionExeption />} />
        </>}
      </Routes>
      </div>
      {/* </>
      :  <Login />} */}
      </div>
    </>
  );
}
