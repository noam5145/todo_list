
// import LayoutMissionExeption from "./LayoutMissionExeption/LayoutMissionExeption";
import LocalPrintshopRoundedIcon from "@mui/icons-material/LocalPrintshopRounded";
import React, { useContext, useEffect, useRef, useState } from "react";
import "./completedtasks.css";
import { useReactToPrint } from "react-to-print";
import { MyContext } from "../../../App";

export default function CompletedTasks() {

  const { missions } = useContext(MyContext);
  const componentToPrint = useRef();
  let [completeMissions,setcompleteMissions]=useState([]);
  

  useEffect(()=>{
     let temp=missions.filter((mission)=>{
      console.log(mission);
      if (cheakStatus(mission.status)) {
        return mission;
      }
     })
     setcompleteMissions(temp);
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
     
        <div className="container  mb-2">
          <div >
            <div className="btn  justify-content-end d-flex   text-light ">
              <button
                className="btn   bg-secondary text-light mx-3"
                onClick={handlePrintEx}
              >
                <LocalPrintshopRoundedIcon sx={{ fontSize: 50 }} />
              </button>
            </div>
          </div>
          <div  ref={componentToPrint}>
          <div  className="d-flex justify-content-between mx-5">
            <div className="p-title-Archive-div">
              <h2 className="p-title-Archive">ארכיון משימות</h2>
              <h2 className="p-title-Archive">
              </h2>
            </div>
  
            <span></span>
          </div>
          <div className="container  table-container-Archive all_table-Archive">
            <span>
              <div className=" d-flex justify-content-center sticky-top">
                <div className="col-1 top_table-Archive text-center">
              מסד <span title="מיין לפי גדול/קטן"></span>
                </div>
                <div className="col-1 top_table-Archive text-center">
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
                {/* <div className="col-1 top_table-Archive text-center">
                  ימי חריגה<span title="מיין לפי גדול/קטן"></span>
                </div> */}
                <div className="col-2 top_table-Archive text-center">
                  הערות אחראי<span title="מיין לפי גדול/קטן"></span>
                </div>
                <div className="col-2 top_table-Archive text-center">
                  הערות מפקד<span title="מיין לפי גדול/קטן"></span>
                </div>
              </div>
            </span>
            {completeMissions.length > 0 ? (
              completeMissions.map((mission, i) => 
               (
                <div
                  key={i}
               
                  className="container-fluid d-flex justify-content-center p-0"
                >
                  <div className="col-1 the_table-Archive text-center">
                    {mission.missionId}
                  </div>
                  <div className="col-1 the_table-Archive text-center">
                    {mission.responsibility}
                  </div>
                  <div className="col-1 the_table-Archive text-center">
                    {mission.title}
                  </div>
                  <div className="col-3 the_table-Archive text-center align-missions-center">
                    <p className="p_taskdetail-Archive p-2 ">{mission.details}</p>
                  </div>
                  <div className="col-1 the_table-Archive  text-center">
                    {mission.endedAt}
                  </div>
                  {/* <div className="col-1 the_table-Archive text-center ">
                    {mission.endedAt}
                  </div> */}
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
              <div className="col-11 d-flex the_table-Archive container justify-content-center  ">
                <h2 style={{ fontSize: "40px" }}>אין משימות בארכיון כרגע</h2>
              </div>
            )}
          </div>
          <div>
          <h2 className="numOfCompleteMission">סה"כ משימות בארכיון: {completeMissions.length} </h2>
        </div>
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
    
  }
};



