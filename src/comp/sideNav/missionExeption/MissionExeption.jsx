import LocalPrintshopRoundedIcon from "@mui/icons-material/LocalPrintshopRounded";
import React, { useContext, useEffect, useRef, useState } from "react";
import "./missionExeption.css";
import { useReactToPrint } from "react-to-print";
import { MyContext } from "../../../App";
import { CircularProgress } from "@mui/material";
import * as XLSX from "xlsx/xlsx.mjs";
import { AiOutlineFilePdf } from "react-icons/ai";
import { GrDocumentExcel } from "react-icons/gr";

export default function MissionExeption() {
  const { missions, daysOff, endAtChanged, loading, currentUser } =
    useContext(MyContext);
  const componentToPrint = useRef();
  const [ToExcel, setToExcel] = useState([]);
  let [dataExMission, setData] = useState([]);

  useEffect(() => {
    let temp = missions.map((mission) => {
      return daysOff(mission.endedAt, mission.status) < 0 ? mission : "";
      //  return mission.status=="בחריגה"?mission:""
    });
    setData(temp?.filter((item) => item != ""));
  }, [missions]);

  useEffect(() => {
    setToExcel(
      dataExMission.map((item) => {
        return {
          מסד: item["missionId"],
          כותרת_הפגישה: item["title"],
          פירוט_הפגישה: item["details"],
          תגב: item["endedAt"],
          מסגרת: item["responsibility"].toString(),
          ימי_חריגה: Math.abs(daysOff(item.endedAt)),
        };
      })
    );
  }, [dataExMission]);

  console.log(ToExcel);

  const handlePrintEx = useReactToPrint({
    content: () => componentToPrint.current,
  });

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

  return (
    <>
      {!loading && currentUser.username ? (
        <div className="container-fluid linear font-family-Ex">
          <div ref={componentToPrint} className="mt-5 p-0">
            <div className="d-flex justify-content-between  mx-4">
              <div className="d-flex chat_name">
                <h4>משימות בחריגה</h4>
              </div>
              <div className="d-flex mx-5 align-items-center">
                {/* <p className="numOfExMission ">סה"כ משימות בחריגה: {dataExMission.length} </p> */}
                <div className="numOfExMission mx-5 pt-1">
                  סה"כ משימות בחריגה: {dataExMission.length}
                </div>
                <button
                  className="btn bg-success text-light"
                  style={{ width: "100px" }}
                  onClick={() => toExcel()}
                >
                  <samp>
                    <GrDocumentExcel color="white" /> Excel
                  </samp>
                </button>
                <button
                  onClick={handlePrintEx}
                  className="btn  bg-kaka  mx-3 text-light"
                >
                  <LocalPrintshopRoundedIcon /> הדפסה
                </button>
              </div>
            </div>
            <div className="container  table-container-Ex all_table-Ex mt-2  ml-3">
              <span>
                <div className=" d-flex justify-content-center sticky-top">
                  <div className="col-1 top_table-Ex text-center">מס"ד</div>
                  <div className="col-1 top_table-Ex text-center">
                    כותרת הפגישה
                  </div>
                  <div className="col-3 top_table-Ex text-center">
                    פירוט הפגישה
                  </div>
                  <div className="col-1 top_table-Ex text-center">תג"ב</div>
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
                  <div className="col-1 top_table-Ex text-center">
                    ימי חריגה
                  </div>
                </div>
              </span>
              {dataExMission[0] ? (
                dataExMission.map(
                  (
                    mission,
                    i // use state-> to cheak if the table is empty
                  ) => (
                    <div
                      key={mission.id}
                      className="container-fluid d-flex justify-content-center p-0"
                    >
                      <div className="col-1 the_table-Ex text-center">
                        {mission.missionId}
                      </div>
                      <div className="col-1 the_table-Ex text-center">
                        <p
                          className={`p_taskdetail-Ex p-2 ${
                            mission.title.length < 40
                              ? "d-flex align-items-center"
                              : ""
                          }`}
                        >
                          {mission.title}
                        </p>
                      </div>
                      <div className="col-3 the_table-Ex text-center align-missions-center">
                        <p
                          className={`p_taskdetail-Ex p-2 ${
                            mission.details.length < 40
                              ? "d-flex align-items-center"
                              : ""
                          }`}
                        >
                          {mission.details}
                        </p>
                      </div>
                      <div className="col-1 the_table-Ex  text-center">
                        {endAtChanged(mission.endedAt)}
                      </div>
                      <div className="col-1 flex-column the_table-Ex text-center">
                        {mission.levelOne}
                      </div>
                      <div className="col-1 the_table-Ex text-center">
                        {" "}
                        {mission.levelTree}
                      </div>
                      <div className="col-1 the_table-Ex text-center">
                        {" "}
                        {mission.levelFour}
                      </div>
                      <div className="col-1 the_table-Ex text-center">
                        <div
                          className={` p_taskdetail-Ex w-100 py-1 ${
                            mission.responsibility.length < 3
                              ? "d-flex align-items-center flex-column   justify-content-center"
                              : ""
                          }`}
                        >
                          {mission.responsibility?.map((name, i) => {
                            return (
                              <div
                                style={{ fontSize: "0.9rem", marginTop: "3px" }}
                              >
                                {!(i == mission.responsibility.length - 1)
                                  ? name + ","
                                  : name + "."}
                              </div>
                            );
                          })}
                        </div>
                      </div>
                      <div className="col-1 the_table-Ex text-center ">
                        {Math.abs(daysOff(mission.endedAt))}
                      </div>
                    </div>
                  )
                )
              ) : (
                <div className="col-12 the_table-Ex d-flex  text-center  align-missions-center">
                  <h2> אין משימות בחריגה כעת</h2>
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className="container">
          <div className="d-flex justify-content-center align-items-center my-5">
            <CircularProgress />
          </div>
        </div>
      )}
        
    </>
  );
}
