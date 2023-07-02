import React, { useContext, useEffect, useState, useRef } from "react";
import "./taskList.css";
import { MyContext } from "../../../App";
import TheChat from "./chat/TheChat";
import { CircularProgress, Dialog } from "@mui/material";
import AddMissions from "../addMissions/AddMissions";
import ReportGmailerrorredIcon from "@mui/icons-material/ReportGmailerrorred";
import BottomTable from "./table/BottomTable";
import TopTable from "./table/TopTable";
import FilterTable from "./table/FilterTable";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { notifyDel } from "./notify";
import { notifySend } from "./notify";
import { notifyadd } from "./notify";
import { notifyedit } from "./notify";
import * as XLSX from "xlsx/xlsx.mjs";
import { GrDocumentExcel } from "react-icons/gr";

export default function TaskList() {
  const { missions, daysOff, loading } = useContext(MyContext);
  const [open, setOpenDialog] = React.useState(false);
  const [allDataShow, setAllDataShow] = useState([]);
  const [chatOpen, setChatOpen] = useState(false);
  const [iForChat, setIForChat] = useState();
  const [editSingleMission, setEditSingleMission] = useState();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [ToExcel, setToExcel] = useState([]);

  const openDialog = () => {
    setOpenDialog(true);
  };
  const closeDialog = () => {
    setOpenDialog(false);
  };

  useEffect(() => {
    let newMissions = [];


    if (missions[0]) {
      newMissions = [...missions];
      // newMissions?.map((item, i) => {
      //   const endTime = new Date(item.endedAt);
      //   if (endTime < nowTime && item.status !== "בוצע") {
      //     item.status = "בחריגה";
      //   }

      //   // startedAt
      //   const partsStartTime = item?.startedAt.split('-');
      //   const reversStartendTime = partsStartTime.reverse().join('-');
      //   item.startedAt = reversStartendTime;

      //   // endedAt
      //   const partsEndTime = item?.endedAt.split('-');
      //   const reversedEndTime = partsEndTime.reverse().join('-');
      //   item.endedAt = reversedEndTime;
      // });
      setAllDataShow(newMissions);
    } else {
      setAllDataShow([]);
    }
  }, [missions]);

  useEffect(() => {
    const excelMissions = JSON.parse(JSON.stringify(missions));
    console.log("🚀 ~ file: TaskList.jsx:67 ~ useEffect ~ excelMissions:", excelMissions)
    for (let i = 0; i < excelMissions.length; i++) {
      delete excelMissions[i]._id;
      delete excelMissions[i].chat;
      delete excelMissions[i].token;
      delete excelMissions[i].__v;
      delete excelMissions[i].noteCommander;
      excelMissions[i]["מס'ד"] = excelMissions[i].missionId;
      delete excelMissions[i].missionId;
      excelMissions[i]["מועד משימה"] = excelMissions[i].endedAt;
      delete excelMissions[i].endedAt;
      excelMissions[i]["כותרת המשימה"] = excelMissions[i].title;
      delete excelMissions[i].title;
      excelMissions[i]["פרטי משימה"] = excelMissions[i].details;
      delete excelMissions[i].details;
      excelMissions[i]["אחריות"] = excelMissions[i].responsibility;
      delete excelMissions[i].responsibility;
      excelMissions[i]["אחריות"] = excelMissions[i]["אחריות"].toString();
      excelMissions[i]['תג"מ'] = excelMissions[i].startedAt;
      delete excelMissions[i].startedAt;
      excelMissions[i]["ימים שנותרו"] = excelMissions[i].daysLeft;
      delete excelMissions[i].daysLeft;
      excelMissions[i]["סטאטוס"] = excelMissions[i].status;
      delete excelMissions[i].status;
      // excelMissions[i]["הערות מפקד"] = excelMissions[i].noteCommander;
      // delete excelMissions[i].noteCommander;
    }
    setToExcel(excelMissions);
  }, [missions]);

  console.log(ToExcel);
  const toExcel = () => {
    let dow = window.confirm(" האם אתה בטוח רוצה להוריד לאקסל ?");
    if (dow) {
      setTimeout(() => {
        const wb = XLSX.utils.book_new();
        const ws = XLSX.utils.json_to_sheet(ToExcel);
        XLSX.utils.book_append_sheet(wb, ws, "mySheet1");
        XLSX.writeFile(wb, "TableMissions .xlsx");
      }, 1000);
  
    }
  };

  useEffect(() => {
    window.addEventListener("click", () => {
      setChatOpen(false);
    });
  }, []);

  useEffect(() => {
    if (editSingleMission) {
      let res = editSingleMission.startedAt?.split("-");
      res = res.reverse().join("-");
      editSingleMission.startedAt = res;
      res = editSingleMission.endedAt?.split("-");
      res = res.reverse().join("-");
      editSingleMission.endedAt = res;
    }
  }, [editSingleMission]);

  return (
    <>
   {!loading ? (   <div className="container-fluid linear">
        <div className="mt-5 p-0">
          <div className="d-flex justify-content-between mx-5">
            <h4 className="">מאגר משימות</h4>
            <span className="d-flex">
              <div className="mx-5 pt-2">סה"כ משימות: {allDataShow.length}</div>
              <button
                className="btn bg-secondary text-light"
                style={{ width: "100px" }}
                onClick={() => toExcel()}
              >
                <samp>
                  <GrDocumentExcel color="white" /> Excel
                </samp>
              </button>

              <button
                className="btn bg-secondary mx-3 text-light"
                onClick={() => {
                  openDialog();
                  setEditSingleMission("");
                }}
              >
                {" "}
                הוסף משימה +
              </button>
              <div className="row">
                <Dialog open={open} className="row" onClose={closeDialog}>
                  <AddMissions
                    editSingleMission={editSingleMission}
                    closeDialog={closeDialog}
                    notifyadd={notifyadd}
                    notifyedit={notifyedit}
                  />
                </Dialog>
              </div>
            </span>
          </div>
          <div className="container all_table mt-3">
            <span className="sticky-top">
              <TopTable setAllDataShow={setAllDataShow} />
              <FilterTable setAllDataShow={setAllDataShow} />
            </span>
            
            { allDataShow[0] ? 
            allDataShow?.map((item, i) => (
              <BottomTable
                key={i}
                item={item}
                i={i}
                openDialog={openDialog}
                setEditSingleMission={setEditSingleMission}
                setIForChat={setIForChat}
                setChatOpen={setChatOpen}
                chatOpen={chatOpen}
                notifyDel={notifyDel}
                notifySend={notifySend}
              />
            )) : (
              <div className="container d-flex justify-content-center mt-5">
                  <div className="fs-5"><ReportGmailerrorredIcon /></div>
                  <h3 className="mx-1">התוכן לא נמצא</h3>
                </div>
            )}
          </div>
          <div className=" Total_tasks">
            <ToastContainer
              position="bottom-right"
              autoClose={5000}
              closeOnClick
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="light"
            />
          </div>
          {chatOpen && (
            <div
              onClick={(e) => {
                e.stopPropagation();
              }}
              className="the_chat"
            >
              <TheChat
                setChatOpen={setChatOpen}
                chatOpen={chatOpen}
                iForChat={iForChat}
              />
            </div>
          )}
        </div>
      </div>) : (
          <div className="container">
          <div className="d-flex justify-content-center align-items-center my-5">
            <CircularProgress />
          </div>
        </div>
      )}
    </>
  );
}
