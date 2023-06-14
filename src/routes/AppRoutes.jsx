import React from "react";
import { Route, Routes } from "react-router-dom";
import App from "../App";
import NotFound from "../NotFound";
import AddMissions from "../comp/sideNav/addMissions/AddMissions";
import Dashboard from "../comp/sideNav/dashboard/Dashboard";
import MissionExeption from "../comp/sideNav/missionExeption/MissionExeption";
import PendingMissions from "../comp/sideNav/pendingMissions/PendingMissions";
import TaskList from "../comp/sideNav/taskList/TaskList";
import Filter from "../comp/topNav/filter/Filter";
import Message from "../comp/topNav/message/Message";
import PrintFile from "../comp/topNav/printFile/PrintFile";
import Settings from "../comp/topNav/settings/Settings";
import SideNav from "../comp/sideNav/SideNav";
import TopNav from "../comp/topNav/TopNav";
import MainSite from "../comp/MainSite";

export default function AppRoutes() {
  return (
    <>
    <div className="" style={{height:"100vh", width:"100%"}}>
      <TopNav/>
      <div className="d-flex bg-light">
      <SideNav/>
      <Routes>
        <Route path="/" element={<MainSite />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/addMissions" element={<AddMissions />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/missionExeption" element={<MissionExeption />} />
        <Route path="/PendingMissions" element={<PendingMissions />} />
        <Route path="/taskList" element={<TaskList />} />
        <Route path="/filter" element={<Filter />} />
        <Route path="/message" element={<Message />} />
        <Route path="/printFile" element={<PrintFile />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
      </div></div>
    </>
  );
}
