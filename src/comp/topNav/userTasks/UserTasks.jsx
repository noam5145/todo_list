import React, { useState, useEffect } from "react";
import { useContext } from "react";
import { MyContext } from "../../../App";
import "./userTasks.css";

export default function UserTasks() {
  const { missions, users, currentUser } = useContext(MyContext);
  const [listUserMissions, setListUserMissions] = useState([]);

  useEffect(() => {
    if (missions[0]) {
      setListUserMissions(
        missions.filter((m) => m.token === currentUser.token)
      );
    }
  }, [missions]);
  console.log(missions);

  return (
    <div className="container mt-5">
      <h2>המשימות שלי </h2>

      <div className=" row d-flex justify-content-center mt-5">
        <div className="col-1 top_table text-center">מזהה</div>
        <div className="col-1 top_table text-center">מועד משימה </div>
        <div className="col-1 top_table text-center">כותרת משימה </div>
        <div className="col-3 top_table text-center">פירוט משימה </div>
        <div className="col-1 top_table text-center">מסמכים מצורפים</div>
        <div className="col-1 top_table text-center">אחריות </div>
        <div className="col-1 top_table text-center">תג"ב </div>
        <div className="col-1 top_table text-center">ימים שנותרו </div>
        <div className="col-1 top_table text-center">סטאטוס </div>
      </div>
      {/* {
        listUserMissions.map((mission, i)=>(
          <div>
            {mission.title}
          </div>
        ))
      } */}
      {missions.map((mission, index)=>{
        if(currentUser.token == mission.token){
          return(
            <div className="row d-flex justify-content-center">
            <div className="col-1 border d-flex justify-content-center table_h">
            {mission.missionId}
            </div>
            <div className="col-1 border d-flex justify-content-center text-center table_h">{mission.startedAt}</div>
            <div className="col-1 border d-flex justify-content-center text-center table_h">{mission.title}</div>
            <div className="col-3 col-1 border d-flex justify-content-center text-center table_h">{mission.details}</div>
            <div className="col-1 border d-flex justify-content-center text-center table_h">---</div>
            <div className="col-1 border d-flex justify-content-center text-center table_h">{mission.responsibility} </div>
            <div className="col-1 border d-flex justify-content-center text-center table_h">{mission.endedAt}</div>
            <div className="col-1 border d-flex justify-content-center text-center table_h">---</div>
            <div className="col-1 border d-flex justify-content-center text-center table_h">{mission.status} </div>
          </div>
          )
        }
      })}
    </div>
  );
}
