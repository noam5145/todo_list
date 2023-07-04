// import LayoutMissionExeption from "./LayoutMissionExeption/LayoutMissionExeption";
import LocalPrintshopRoundedIcon from "@mui/icons-material/LocalPrintshopRounded";
import React, { useContext, useEffect, useRef, useState } from "react";
import "./missionExeption.css";
import { useReactToPrint } from "react-to-print";
import { MyContext } from "../../../App";
import { CircularProgress } from "@mui/material";




export default function MissionExeption() {

  const { missions, daysOff, endAtChanged, loading } = useContext(MyContext);
  const componentToPrint = useRef();
  let [dataExMission, setData] = useState([]);



  useEffect(() => {
    let temp = missions.map((mission) => {
      return daysOff(mission.endedAt, mission.status) < 0 ? mission : ""
      //  return mission.status=="בחריגה"?mission:""

    })

    setData(temp?.filter((item) => item != ""));
  }, [missions])

  const handlePrintEx = useReactToPrint({
    content: () => componentToPrint.current,
  });


  return (
    <>
      {!loading ? (<div className="container-fluid linear font-family-Ex">
        <div ref={componentToPrint} className="mt-5 p-0 container">
          <div className="d-flex justify-content-between  mx-5">
            <div className="p-title-pen-div">
              <h4 >משימות בחריגה</h4>
                <div className="d-flex">
                <div className="numOfExMission mx-5 pt-1">סה"כ משימות בחריגה: {dataExMission.length}</div>
                <button onClick={handlePrintEx} className="btn  bg-secondary text-light"><LocalPrintshopRoundedIcon /> הדפסה</button>
              </div>
            </div>
          </div>
          <div className="container  table-container-Ex all_table-Ex  ml-3">
            <span>
              <div className=" d-flex justify-content-center sticky-top">
                <div className="col-1 top_table-Ex text-center">
                  מס"ד 
                </div>
                <div className="col-1 top_table-Ex text-center">
                  כותרת הפגישה 
                </div>
                <div className="col-3 top_table-Ex text-center">
                  פירוט הפגישה 
                </div>
                <div className="col-1 top_table-Ex text-center">
                  תג"ב
                </div>
                <div className="col-1 top_table-Ex text-center">
                  אחריות
                </div>
                <div className="col-1 top_table-Ex text-center">
                  ימי חריגה
                </div>
                <div className="col-2 top_table-Ex text-center">
                  הערות אחראי
                </div>
                <div className="col-2 top_table-Ex text-center">
                  הערות מפקד
                </div>
              </div>
            </span>
            {
              dataExMission[0] ?
                dataExMission.map((mission, i) =>
                (// use state-> to cheak if the table is empty
                  <div
                    key={mission.id}
                    className="container-fluid d-flex justify-content-center p-0"
                  >
                    <div className="col-1 the_table-Ex text-center">
                      {mission.missionId}
                    </div>
                    <div className="col-1 the_table-Ex text-center">
                      {mission.title}
                    </div>
                    <div className="col-3 the_table-Ex text-center align-missions-center">
                      <p className={`p_taskdetail-Ex p-2 ${mission.details.length < 40 ? "d-flex align-items-center" : ""}`}>
                        {mission.details}
                      </p>
                    </div>
                    <div className="col-1 the_table-Ex  text-center">
                      {endAtChanged(mission.endedAt)}
                    </div>
                    <div className="col-1 flex-column the_table-Ex text-center">
                      <div className={` p_taskdetail-Ex w-100 py-1 ${mission.responsibility.length < 3
                        ? "d-flex align-items-center flex-column   justify-content-center"
                        : ""}`}   >
                        {mission.responsibility?.map((name, i) => { return <div style={{ fontSize: "0.9rem", marginTop: "3px" }}>{!(i == mission.responsibility.length - 1) ? name + ',' : name + '.'}</div> })}
                      </div>

                    </div>
                    <div className="col-1 the_table-Ex text-center ">
                      {Math.abs(daysOff(mission.endedAt))}
                    </div>
                    <div className="col-2 the_table-Ex  text-center align-missions-center ">
                      <p className="p_taskdetail-Ex p-2 ">
                        {mission.noteResponsibility}
                      </p>
                    </div>
                    <div className="col-2 the_table-Ex  text-center  align-missions-center">
                      <p className="p_taskdetail-Ex p-2 ">
                        {mission.noteCommand}
                      </p>
                    </div>
                  </div>
                )
                )

                : <div className="col-12 the_table-Ex d-flex  text-center  align-missions-center">
                  <h2 > אין משימות בחריגה כעת</h2></div>}
          </div>
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

