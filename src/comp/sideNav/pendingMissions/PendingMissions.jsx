import LocalPrintshopRoundedIcon from "@mui/icons-material/LocalPrintshopRounded";
import React, { useContext, useEffect, useRef, useState } from "react";
import "./pendingMissions.css";
import { useReactToPrint } from "react-to-print";
import { AiOutlineFilePdf, AiOutlineLike } from "react-icons/ai";
import { MyContext } from "../../../App";
import { ToastContainer } from "react-toastify";
import { Oval } from "react-loader-spinner";
import * as XLSX from "xlsx/xlsx.mjs";
import { NotifyNotConfirm, NotifyConfirm } from "../taskList/notify";
import { GrDocumentExcel } from "react-icons/gr";

export default function PendingMissions() {
  const { missions, updateMission, sendToArchives, currentUser, loading } =
    useContext(MyContext);
  const [ToExcelPen, setToExcelPen] = useState([]);
  const componentToPrint = useRef();

  let [dataPenMission, setData] = useState([]);

  let [render, setRender] = useState(false);

  function resetSelect() {
    // Get the select element by its ID
    var selectElement = document.getElementById("mySelect");
    
    // Set the selectedIndex to 0 to reset to the default option
    selectElement.selectedIndex = 0;
  }

  useEffect(() => {
    if (missions[0]) {
      let temp = missions.filter(
        (mission) => mission.status === "ממתין לאישור"
      );
      setData(temp);
    }
  }, [missions]);

  useEffect(() => {
    setToExcelPen(
      dataPenMission.map((item) => {
        return {
          מסד: item["missionId"],
          כותרת_הפגישה: item["title"],
          פירוט_הפגישה: item["details"],
          מועד_קבלת_משימה: item["startedAt"],
          תגב: item["endedAt"],
          מסגרת: item["responsibility"].toString(),
        };
      })
    );
  }, [dataPenMission]);

  const handlePrintEx = useReactToPrint({
    content: () => componentToPrint.current,
  });

  const aprrove = (id, value) => {
    resetSelect();
    let tempMission = missions.find((mission) => {
      return mission._id == id;
    });
    if (value === "true" && tempMission) {
      NotifyConfirm();
      tempMission.status = "בוצע";
      updateMission(tempMission, currentUser.token);
      sendToArchives(tempMission._id, currentUser.token);
    } else if (value === "false") {
      NotifyNotConfirm();
      tempMission.status = "בתהליך";
      updateMission(tempMission, currentUser.token);
    }
  };

  const toExcel = () => {
    let dow = window.confirm(" האם אתה בטוח רוצה להוריד לאקסל ?");
    if (dow) {
      setTimeout(() => {
        const wb = XLSX.utils.book_new();
        const ws = XLSX.utils.json_to_sheet(ToExcelPen);
        XLSX.utils.book_append_sheet(wb, ws, "mySheet1");
        XLSX.writeFile(wb, "TableMissions .xlsx");
      }, 1000);
    }
  };

  return (
    <>
      <div className="container-fluid  linear">
        <div className="mt-5 pt-0" ref={componentToPrint}>
          <div className="d-flex justify-content-between mx-5 ">
              <h4 className="chat_name">משימות בהמתנה לאישור</h4>
            <div className="d-flex h-100 align-items-center">
              <p className="pt-2 mx-5">
                סה"כ משימות בהמתנה לאישור: {dataPenMission.length}{" "}
              </p>
              <button
                      className="btn  bg-success text-light"
                      style={{ width: "100px",height:'48px' }}
                      onClick={() => toExcel()}
                    >
                      <samp>
                        <GrDocumentExcel color="white" /> Excel
                      </samp>
                    </button>
              <button
                onClick={handlePrintEx}
                className="btn   bg-kaka text-light  me-3"
                style={{ width: "110px",height:'48px' }}
              >
                <LocalPrintshopRoundedIcon /> הדפסה
              </button>
            </div>
          </div>

          <div className="container   all_table-pen mt-3  ">
            <span>
              <div className=" d-flex justify-content-center sticky-top">
                <div className="col-1 top_table-pen text-center">
                  מס"ד <span title="מיין לפי גדול/קטן"></span>
                </div>
                <div className="col-1 top_table-pen text-center">
                  מועד משימה<span title="מיין לפי גדול/קטן"></span>
                </div>
               
                <div className="col-1 top_table-pen text-center">
                  כותרת הפגישה <span title="מיין לפי גדול/קטן"></span>
                </div>
                <div className="col-2 top_table-pen text-center">
                  פירוט הפגישה <span title="מיין לפי גדול/קטן"></span>
                </div>
                <div className="col-4 ">
          <div className="respon text-center">
            אחריות{" "}
            
          </div>
        <div className=" d-flex col-12">
        <div className="col-3 top_table text-center levels">רמה 1</div>{" "}
          <div className="col-3 top_table text-center levels">רמה 2</div>{" "}
          <div className="col-3 top_table text-center levels">רמה 3</div>{" "}
          <div className="col-3 top_table text-center levels">רמה 4</div>
        </div>
        </div>
                <div className="col-1 top_table-pen text-center">
                  תג"ב<span title="מיין לפי גדול/קטן"></span>
                </div>
                {/* <div className="col-1 top_table-pen text-center">
                  ימי חריגה<span title="מיין לפי גדול/קטן"></span>
                </div> */}
                <div className="col-1 top_table-pen text-center">
                  נשלח על ידי<span title="מיין לפי גדול/קטן"></span>
                </div>

                <div className="col-1 top_table-pen text-center">
                  האם לאשר?<span title="מיין לפי גדול/קטן"></span>
                </div>
              </div>
            </span>
            {dataPenMission[0] ? (
              dataPenMission.map((mission, i) => (
                <div
                  key={mission.id}
                  className="container-fluid pen-mission-row d-flex justify-content-center p-0"
                >
                  <div className="col-1 the_table-pen text-center">
                    {mission.missionId}
                  </div>
                  <div className="col-1 the_table-pen text-center">
                    {mission.startedAt}
                  </div>
                 
                  <div className="col-1 the_table-pen text-center">
                    {mission.title}
                  </div>
                  <div className="col-2 the_table-pen text-center align-missions-center">
                    <p
                      className={`p_taskdetail-pen p-2 ${
                        mission.details.length < 40
                          ? "d-flex align-items-center"
                          : ""
                      }`}
                    >
                      {mission.details}
                    </p>
                  </div>
                  <div className="col-1 flex-column the_table-pen text-center">{mission.levelOne}</div>
                  <div className="col-1 flex-column the_table-pen text-center">{mission.levelThree}</div>
                  <div className="col-1 flex-column the_table-pen text-center">{mission.levelFour}</div>
                  <div className="col-1 flex-column the_table-pen text-center">
                    <div
                      className={` p_taskdetail-pen w-100 py-1 ${
                        mission.responsibility.length < 3
                          ? "d-flex align-items-center flex-column   justify-content-center"
                          : ""
                      }`}
                    >
                      {mission.responsibility?.map((name, i) => {
                        return (
                          <div>
                            {!(i == mission.responsibility.length - 1)
                              ? name + ","
                              : name + "."}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                  <div className="col-1 the_table-pen  text-center">
                    {mission.endedAt}
                  </div>

                  <div className="col-1 the_table-pen  text-center align-missions-center ">
                    {mission.changeStatus}
                  </div>

                  <div className="col-1 align-missions-center  the_table-pen text-center">
                    {/* <button
                          onClick={() => aprrove(mission._id)}
                          style={{ background: "none", border: "none" }}
                        >
                          <AiOutlineLike size={25} />
                        </button> */}
                    <select
                    id="mySelect"
                    className="selectConfirm w-50"
                      onClick={(e) =>
                        aprrove(mission._id, e.currentTarget.value)
                      }
                      dir="rtl"
                
                
                    >
                      <option className="confirmOp" >בחר...</option>
                      <option
                        value={true}
                        className="confirmOp"
                        // onClick={(e) => aprrove(mission._id, e.target.value)}
                      >
                        אשר
                      </option>
                      <option
                      className="confirmOp"
                        // onClick={(e) => aprrove(mission._id, e.target.value)}
                        value={false}
                      >
                        אל תאשר
                      </option>
                    </select>
                    <ToastContainer
                      position="bottom-right"
                      autoClose={5000}
                      hideProgressBar={false}
                      newestOnTop={false}
                      closeOnClick
                      rtl={false}
                      pauseOnFocusLoss
                      draggable
                      pauseOnHover
                      theme="dark"
                    />
                  </div>
                </div>
              ))
            ) : (
              <div className="col-12  the_table-pen d-flex  text-center  align-missions-center">
                <h2>אין משימות בהמתנה לאישור כרגע</h2>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
