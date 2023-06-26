// import LayoutMissionExeption from "./LayoutMissionExeption/LayoutMissionExeption";
import LocalPrintshopRoundedIcon from "@mui/icons-material/LocalPrintshopRounded";
import React, { useContext, useEffect, useRef, useState } from "react";
import "./missionExeption.css";
import { useReactToPrint } from "react-to-print";
import { MyContext } from "../../../App";



export default function MissionExeption() {

  const { missions } = useContext(MyContext);
  const componentToPrint = useRef();
  let [dataExMission,setData]=useState(null);
  console.log(missions);


 useEffect(()=>{
   let temp=missions.map((mission)=>{
   return daysOff(mission.endedAt,mission.status)<0?mission:""
})
setData(temp.filter((item)=>item!=""));
},[missions])


function endAtChanged(endTime)
{
 const partsStartTime = endTime.split('-');
    const reversStartendTime = partsStartTime.reverse().join('/');
   return reversStartendTime;
}

  function daysOff(endTime,status) {
    if (status=="בוצע"||status=="ממתין לאישור") {// cheak if the mission has done
      return 1;
    }
   endTime=endAtChanged(endTime);

  

// took the days,months,years from string(endTime)
let day=Number(endTime[0]+endTime[1]);
let month=Number(endTime[3]+endTime[4])-1;// Note: Months are zero-based, so June is represented by 5
let year=Number(endTime[6]+endTime[7]+endTime[8]+endTime[9]);

var targetDate = new Date(year,month,day); 
var today = new Date();

// Calculate the time difference in milliseconds
var timeDiff = targetDate.getTime() - today.getTime();

// Calculate the number of days
var daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
    return daysDiff;
  }
  

  const handlePrintEx = useReactToPrint({
    content: () => componentToPrint.current,
  });

  if (missions&&dataExMission) {
    return (
      <>
        <div  className="container  mb-2">
          <div>
            <div className=" justify-content-end d-flex   text-light ">
              <button
                className="btn   bg-secondary text-light mx-3"
                onClick={handlePrintEx}
              >
                <LocalPrintshopRoundedIcon sx={{ fontSize: 50 }} />
              </button>
            </div>
          </div>
          <div ref={componentToPrint}>
          <div className="d-flex justify-content-between mx-5">
            <div className="exp-title-ex-div">
              <h2 className="exp-title-ex">דו"ח משימות בחריגה</h2>
              <h2 className="exp-title-ex"></h2>
            </div>

            <span></span>
          </div>
          <div className="container  table-container-Ex all_table-Ex  ml-3">
            <span>
              <div className=" d-flex justify-content-center sticky-top">
                <div className="col-1 top_table-Ex text-center">
                  מסד <span title="מיין לפי גדול/קטן"></span>
                </div>
                <div className="col-1 top_table-Ex text-center">
                  אחריות<span title="מיין לפי גדול/קטן"></span>
                </div>
                <div className="col-1 top_table-Ex text-center">
                  כותרת הפגישה <span title="מיין לפי גדול/קטן"></span>
                </div>
                <div className="col-3 top_table-Ex text-center">
                  פירוט הפגישה <span title="מיין לפי גדול/קטן"></span>
                </div>
                <div className="col-1 top_table-Ex text-center">
                  תג"ב<span title="מיין לפי גדול/קטן"></span>
                </div>
                <div className="col-1 top_table-Ex text-center">
                  ימי חריגה<span title="מיין לפי גדול/קטן"></span>
                </div>
                <div className="col-2 top_table-Ex text-center">
                  הערות אחראי<span title="מיין לפי גדול/קטן"></span>
                </div>
                <div className="col-2 top_table-Ex text-center">
                  הערות מפקד<span title="מיין לפי גדול/קטן"></span>
                </div>
              </div>
            </span>
            {
           dataExMission.length != 0 ?
           dataExMission.map((mission, i)  =>
                    (// use state-> to cheak if the table is empty
                      <div
                        key={i}
                        className="container-fluid d-flex justify-content-center p-0"
                      >
                        <div className="col-1 the_table-Ex text-center">
                          {mission.missionId}
                        </div>
                        <div className="col-1 flex-column the_table-Ex text-center">
                        <p className="p_taskdetail-Ex w-100 py-1 ">
                      {mission.responsibility?.map((name, i) =>{return <div style={{fontSize:"0.9rem"}}>{name},</div>})}
                    </p>
                   
                        </div>
                        <div className="col-1 the_table-Ex text-center">
                          {mission.title}
                        </div>
                        <div className="col-3 the_table-Ex text-center align-missions-center">
                          <p className="p_taskdetail-Ex p-2 ">
                            {mission.details}
                          </p>
                        </div>
                        <div className="col-1 the_table-Ex  text-center">
                          { endAtChanged(mission.endedAt)  }
                        </div>
                        <div className="col-1 the_table-Ex text-center ">
                          { Math.abs( daysOff(mission.endedAt))}
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
 <div>
          <h2 className="numOfExMission">סה"כ משימות בחריגה: {dataExMission.length} </h2>
        </div>
        </div>
       
        </div>
      </>
    );
  }
   else {
    return (
      <div className="col-12 d-flex justify-content-center mt-5 ">
       <h1 className="loader-Ex-table"> </h1>
    </div>
    );
  }
}

