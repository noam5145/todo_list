import React, { useContext, useEffect, useState, useRef } from "react";
import "./taskList.css";
import { MyContext } from "../../../App";
import TheChat from "./chat/TheChat";
import { CircularProgress, Dialog } from "@mui/material";
import AddMissions from "../addMissions/AddMissions";
import ReportGmailerrorredIcon from '@mui/icons-material/ReportGmailerrorred';
import { useReactToPrint } from "react-to-print";
import BottomTable from "./table/BottomTable";
import TopTable from "./table/TopTable";
import FilterTable from "./table/FilterTable";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { notifyDel } from "./notify";
import { notifySend } from "./notify";
import Print from "./Print";

export default function TaskList() {

  const { missions } = useContext(MyContext)
  const [open, setOpenDialog] = React.useState(false);
  const [allDataShow, setAllDataShow] = useState([]);
  const [chatOpen, setChatOpen] = useState(false);
  const [iForChat, setIForChat] = useState();
  const [editSingleMission, setEditSingleMission] = useState();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [load, setLoad] = useState(true);
  const toPrintRef = useRef(null)

  const openDialog = () => {
    setOpenDialog(true);
  };
  const closeDialog = () => {
    setOpenDialog(false);
  };

  useEffect(() => {
    setLoad(true)
    let newMissions;
    const time = new Date();
    const nowTime = new Date(time.getTime() - 24 * 60 * 60 * 1000);

    if (missions[0]) {
      newMissions = [...missions];
      newMissions?.map((item, i) => {
        const endTime = new Date(item.endedAt);
        if (endTime < nowTime && item.status !== "בוצע") {
          item.status = "בחריגה";
        }
      });
      setAllDataShow(newMissions);
    } else {
      setAllDataShow([]);
    }
    setTimeout(() => {
      setLoad(false);
    }, 2000);
  }, [missions])


  const handlePrint = useReactToPrint({
    content: () => toPrintRef.current,
  });

  useEffect(() => {
    window.addEventListener("click", () => {
      setChatOpen(false)
    })
  }, [])


  return (
    <>
      <div className="container-fluid mt-5 p-0">
        <div className="linear">
          <div className="d-flex justify-content-between mx-5">
            <h4 className="">מאגר משימות</h4>
            <span className="">
              <button className="btn bg-secondary text-light" style={{ width: "100px" }} onClick={() => handlePrint()}><samp>PDF</samp></button>
              <button className="btn bg-secondary mx-3 text-light" onClick={() => { openDialog(); setEditSingleMission("") }}> הוסף משימה +</button>
              <div className="row">
                <Dialog open={open} className="row" onClose={closeDialog}>
                  <AddMissions editSingleMission={editSingleMission} setEditSingleMission={setEditSingleMission} closeDialog={closeDialog} />
                </Dialog></div>
            </span>
          </div>
          <div className="container all_table mt-3 Ex">
            <span className="sticky-top">
              <TopTable setAllDataShow={setAllDataShow} />
              <FilterTable setAllDataShow={setAllDataShow} />
            </span>
            {allDataShow.length != 0 ?
              allDataShow?.map((item, i) => (
                <BottomTable key={i} item={item} i={i}
                  openDialog={openDialog} setEditSingleMission={setEditSingleMission}
                  setIForChat={setIForChat} setChatOpen={setChatOpen} chatOpen={chatOpen} notifyDel={notifyDel} notifySend={notifySend} />
              ))
              : load ?
                <div className="d-flex justify-content-center my-5">
                  <CircularProgress />
                </div>
                : <div className="container d-flex justify-content-center mt-5">
                  <div className="fs-5"><ReportGmailerrorredIcon /></div>
                  <h3 className="mx-1">התוכן לא נמצא</h3>
                </div>}
                {/* <Print allDataShow={allDataShow} toPrintRef={toPrintRef}/> */}
          </div>
          <div className="mx-5 pt-2 Total_tasks">סה"כ משימות: {allDataShow.length}
            <div>
              <ToastContainer position="bottom-right" autoClose={5000}
                closeOnClick  pauseOnFocusLoss draggable pauseOnHover theme="light" />
            </div>
          </div>
        </div>
        {chatOpen && <div onClick={(e) => {
          e.stopPropagation()
        }} className="the_chat"><TheChat setChatOpen={setChatOpen} chatOpen={chatOpen} iForChat={iForChat} /></div>}

      </div>
    </>
  );
}