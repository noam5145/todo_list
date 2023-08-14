import LocalPrintshopRoundedIcon from "@mui/icons-material/LocalPrintshopRounded";
import React, { useContext, useEffect, useRef, useState } from "react";
import "./completedtasks.css";
import { useReactToPrint } from "react-to-print";
import { MyContext } from "../../../App";
import { Oval } from "react-loader-spinner";
import * as XLSX from "xlsx/xlsx.mjs";
import { GrDocumentExcel } from "react-icons/gr";


export default function CompletedTasks() {
  const { missions, archive, currentUser, loading } = useContext(MyContext);
  const componentToPrint = useRef();
  const [ToExcelArchive, setToExcelArchive] = useState([]);

  useEffect(() => {
    let temp = missions.filter((mission) => {
      if (cheakStatus(mission.status)) {
        return mission;
      }
    });
  }, [missions]);

  const handlePrintEx = useReactToPrint({
    content: () => componentToPrint.current,
  });

  function cheakStatus(status) {
    if (status != "בוצע") {
      return false;
    } else {
      return true;
    }
  }

  useEffect(() => {
    console.log(archive);
    setToExcelArchive(
      archive.map((item) => {
        <div key={item.id}></div>;
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
  }, [archive]);

  const toExcel = () => {
    let dow = window.confirm(" האם אתה בטוח רוצה להוריד לאקסל ?");
    if (dow) {
      setTimeout(() => {
        const wb = XLSX.utils.book_new();
        const ws = XLSX.utils.json_to_sheet(ToExcelArchive);
        XLSX.utils.book_append_sheet(wb, ws, "mySheet1");
        XLSX.writeFile(wb, "TableMissions .xlsx");
      }, 1000);
    }
  };

  return (
    <>
      {!loading ? (
        <div className="container-fluid linear">
          <div className="mt-5 pt-0" ref={componentToPrint}>
            <div className="d-flex justify-content-between mx-5">
                <h4 className="chat_name">משימות בארכיון</h4>
              
              <div className="d-flex h-100 align-items-center">
                <p className="mx-5 pt-2">
                  סה"כ משימות בארכיון: {archive.length}{" "}
                </p>
                <button
                      className="btn bg-success text-light"
                      style={{ width: "100px",height:'48px' }}
                      onClick={() => toExcel()}
                    >
                      <samp>
                        <GrDocumentExcel color="white" /> Excel
                      </samp>
                    </button>

                <button
                  onClick={handlePrintEx}
                  className=" bg-print text-light  me-3"
                  style={{height:'48px',width:'110px'}}
                >
                  <LocalPrintshopRoundedIcon />  הדפסה
                </button>
              </div>
            </div>
            <div className="container   all_table-Archive mt-3">
              <span>
                <div className=" d-flex justify-content-center sticky-top">
                  <div className="col-1 top_table-Archive text-center">
                    מס"ד <span title="מיין לפי גדול/קטן"></span>
                  </div>

                  <div className="col-1 top_table-Archive text-center">
                    כותרת הפגישה <span title="מיין לפי גדול/קטן"></span>
                  </div>
                  <div className="col-3 top_table-Archive text-center">
                    פירוט הפגישה <span title="מיין לפי גדול/קטן"></span>
                  </div>
                  <div className="col-4 ">
                    <div className="respon text-center">אחריות </div>
                    <div className=" d-flex col-12">
                      <div className="col-3 top_table text-center levels">
                        רמה 1
                      </div>{" "}
                      <div className="col-3 top_table text-center levels">
                        רמה 2
                      </div>{" "}
                      <div className="col-3 top_table text-center levels">
                        רמה 3
                      </div>{" "}
                      <div className="col-3 top_table text-center levels">
                        רמה 4
                      </div>
                    </div>
                  </div>
                  <div className="col-1 top_table-Archive text-center">
                    תג"ב<span title="מיין לפי גדול/קטן"></span>
                  </div>
                  <div className="col-2 top_table-Archive text-center">
                    נשלח על ידי<span title="מיין לפי גדול/קטן"></span>
                  </div>
                </div>
              </span>
              {archive.length != 0 ? (
                archive.map((mission, i) => (
                  <div
                    key={mission.id}
                    className="container-fluid completed-mission-row d-flex justify-content-center p-0 e"
                  >
                    <div className="col-1 the_table-Archive text-center">
                      {mission.missionId}
                    </div>

                    <div className="col-1 the_table-Archive text-center">
                      {mission.title}
                    </div>
                    <div className="col-3 the_table-Archive text-center align-missions-center">
                      <div
                        className={`p_taskdetail-Archive p-2 ${
                          mission.details.length < 40
                            ? "d-flex align-items-center"
                            : ""
                        }`}
                      >
                        {mission.details}
                      </div>
                    </div>
                    <div className="col-1 flex-column the_table-pen text-center"> {mission.levelOne}</div>
                    <div className="col-1 flex-column the_table-pen text-center"> {mission.levelThree}</div>
                    <div className="col-1 flex-column the_table-pen text-center"> {mission.levelFour}</div>

                    <div className="col-1 flex-column the_table-Archive text-center">
                      <div
                        className={` p_taskdetail-Archive w-100 py-1 ${
                          mission.responsibility.length < 3
                            ? "d-flex align-items-center flex-column   justify-content-center"
                            : ""
                        }`}
                      >
                        {mission.responsibility?.map((name, i) => {
                          return (
                            <div className="">
                              {" "}
                              {!(i == mission.responsibility.length - 1)
                                ? name + ","
                                : name + "."}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                    <div className="col-1 the_table-Archive  text-center">
                      {mission.endedAt}
                    </div>
                    <div className="col-2 the_table-Archive  text-center align-missions-center ">
                      <p>{mission.changeStatus}</p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-12 d-flex the_table-Archive container justify-content-center  ">
                  <h2 style={{ fontSize: "40px" }}>אין משימות בארכיון כרגע</h2>
                </div>
              )}
            </div>
            {/* <div>

         <h2 className="numOfCompleteMission">סה"כ משימות בארכיון: {archive.length} </h2>
       </div> */}
          </div>
        </div>
      ) : (
        <div className="container">
          <div className="d-flex justify-content-center align-items-center my-5">
            <Oval
              height={80}
              width={80}
              color="#62aeea"
              wrapperStyle={{}}
              wrapperClass=""
              visible={true}
              ariaLabel="oval-loading"
              secondaryColor="#62aeea"
              strokeWidth={2}
              strokeWidthSecondary={2}
            />
          </div>
        </div>
      )}
    </>
  );
}
