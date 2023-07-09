// import LayoutMissionExeption from "./LayoutMissionExeption/LayoutMissionExeption";
import LocalPrintshopRoundedIcon from "@mui/icons-material/LocalPrintshopRounded";
import React, { useContext, useEffect, useRef, useState } from "react";
import "./missionExeption.css";
import { useReactToPrint } from "react-to-print";
import { MyContext } from "../../../App";
import { CircularProgress } from "@mui/material";




export default function MissionExeption() {

  const { missions, daysOff, endAtChanged, loading,currentUser } = useContext(MyContext);
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


  const sortMsgByCommand = (mission)=>{
    let messages = mission.chat.messages.msg.split('\n');
    messages = messages.reverse();
    let noteCommand = '---';
    messages.map((msg, i)=>{
      if((mission.responsibility.find((resp)=> resp !== msg.split('}')[0].slice(1)))){
        noteCommand = msg.split('}')[1];
      }
    })
    if (!noteCommand) {
      noteCommand="---"; 
     
    }
    return noteCommand;
  }

  const sortMsgByUser = (mission)=>{
    let messages = mission.chat.messages.msg.split('\n');
    messages = messages.reverse();
    let noteResponsibility = '---';
    messages.map((msg, i)=>{
      if((mission.responsibility.find((resp)=> resp === msg.split('}')[0].slice(1)))){
        noteResponsibility = msg.split('}')[1];
      }
    })
    if (!noteResponsibility) {
      noteResponsibility="---"; 
     
    }
    return noteResponsibility;
  }



  return (
    <>
      {!loading&& currentUser.username ? (<div className="container-fluid linear font-family-Ex">

        <div ref={componentToPrint} className="mt-5 p-0">
          <div className="d-flex justify-content-between  mx-4">
            <div className="d-flex chat_name">
              <h4 >משימות בחריגה</h4> 
              </div>
                <div className="d-flex mx-5 align-items-center">
                {/* <p className="numOfExMission ">סה"כ משימות בחריגה: {dataExMission.length} </p> */}
                <div className="numOfExMission mx-5 pt-1">סה"כ משימות בחריגה: {dataExMission.length}</div>

                <button onClick={handlePrintEx} className="btn  bg-secondary text-light"><LocalPrintshopRoundedIcon /> הדפסה</button>
              </div>
           
          </div>
          <div className="container  table-container-Ex all_table-Ex mt-3  ml-3">
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
                    <p className={`p_taskdetail-Ex p-2 ${sortMsgByUser(mission)?.length< 40 ? "d-flex align-items-center" : ""}`}>

                        {sortMsgByUser(mission)}
                      </p>
                    </div>
                    <div className="col-2 the_table-Ex  text-center  align-missions-center">
                    <p className={`p_taskdetail-Ex p-2 ${sortMsgByCommand(mission)?.length<40 ? "d-flex align-items-center" : ""}`}>
                        {sortMsgByCommand(mission)}
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