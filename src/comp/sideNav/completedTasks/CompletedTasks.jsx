import LocalPrintshopRoundedIcon from "@mui/icons-material/LocalPrintshopRounded";
import React, { useContext, useEffect, useRef, useState } from "react";
import "./completedtasks.css";
import { useReactToPrint } from "react-to-print";
import { MyContext } from "../../../App";
export default function CompletedTasks() {
  const { missions,archive } = useContext(MyContext);
  const componentToPrint = useRef();

  useEffect(()=>{
     let temp=missions.filter((mission)=>{
      
      if (cheakStatus(mission.status)) {
        return mission;
      }
     })
  },[missions])

  const handlePrintEx = useReactToPrint({
    content: () => componentToPrint.current,
  });
  
  function cheakStatus(status) {
    if (status!="בוצע") {
      return false
    }
    else{
      return true;
    }
  }
  if (missions) {
      return (
      <>
        <div className="container mb-2">
         
          <div  ref={componentToPrint}>
          <div className="d-flex justify-content-between mt-4">
            <div className="p-title-pen-div">
              <h4 >משימות בארכיון</h4>
             <div className="d-flex h-100 align-items-center" >
          <p className="numOfExMission m-2">סה"כ משימות בארכיון:  {archive.length} </p>
         <button onClick={handlePrintEx} className="btn   bg-secondary text-light  m-3"><LocalPrintshopRoundedIcon/> הדפסה</button>
        </div>
         
            </div>

            <span></span>
          </div>
          <div className="container  table-container-Archive all_table-Archive">
            <span>
              <div className=" d-flex justify-content-center sticky-top">
                <div className="col-1 top_table-Archive text-center">
              מס"ד <span title="מיין לפי גדול/קטן"></span>
                </div>
                <div className="col-2 top_table-Archive text-center">
                  אחריות<span title="מיין לפי גדול/קטן"></span>
                </div>
                <div className="col-1 top_table-Archive text-center">
                  כותרת הפגישה <span title="מיין לפי גדול/קטן"></span>
                </div>
                <div className="col-3 top_table-Archive text-center">
                  פירוט הפגישה <span title="מיין לפי גדול/קטן"></span>
                </div>
                <div className="col-1 top_table-Archive text-center">
                  תג"ב<span title="מיין לפי גדול/קטן"></span>
                </div>
                <div className="col-2 top_table-Archive text-center">
                  הערות אחראי<span title="מיין לפי גדול/קטן"></span>
                </div>
                <div className="col-2 top_table-Archive text-center">
                  הערות מפקד<span title="מיין לפי גדול/קטן"></span>
                </div>
              </div>
            </span>
            {archive.length != 0 ? (
              archive.map((mission, i) =>
               (
                
                <div
                key={mission.id}
                  className="container-fluid completed-mission-row d-flex justify-content-center p-0"
                >
                  <div className="col-1 the_table-Archive text-center">
                    {mission.missionId}
                  </div>
                  <div className="col-2 flex-column the_table-Archive text-center">
                  <div className={` p_taskdetail-Archive w-100 py-1 ${ mission.responsibility.length < 3
                        ? "d-flex align-items-center flex-column   justify-content-center"
                        : ""}`}   >
                      {mission.responsibility?.map((name, i) =>{return <div className="fs-6" >   {!(i == mission.responsibility.length -1) ? name + ',' : name + '.'}</div>})}
                    </div>
                  </div>
                  <div className="col-1 the_table-Archive text-center">
                    {mission.title}
                  </div>
                  <div className="col-3 the_table-Archive text-center align-missions-center">
                    <div className={`p_taskdetail-Archive p-2 ${mission.details.length<40?"d-flex align-items-center":""}` }>
                      {mission.details}</div>
                  </div>
                  <div className="col-1 the_table-Archive  text-center">
                    {mission.endedAt}
                  </div>
                  <div className="col-2 the_table-Archive  text-center align-missions-center ">
                    <p className="p_taskdetail-Archive p-2 ">
                      {mission.noteResponsibility}
                    </p>
                  </div>
                  <div className="col-2 the_table-Archive  text-center  align-missions-center">
                    <p className="p_taskdetail-Archive p-2 ">
                      {mission.noteCommand}
                    </p>
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
      </>
    );
  }
  else{
    return(
      <div className="col-12 d-flex justify-content-center mt-5 ">
       <h1 className="loader-complete-table"> </h1>
    </div>
    )
  }}