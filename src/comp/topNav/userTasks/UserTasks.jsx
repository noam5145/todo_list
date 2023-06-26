import React, { useState, useEffect } from "react";
import { useContext } from "react";
import { MyContext } from "../../../App";
import "./userTasks.css";

export default function UserTasks() {
  const { missions, currentUser,daysOff , endAtChanged} = useContext(MyContext);
  const [listUserMissions, setListUserMissions] = useState([]);

  useEffect(() => {
    console.log(missions);
    if (missions[0]) {
      setListUserMissions(
        missions.filter((m) => m.token.find((t)=> t === currentUser.token))
      );
   

    }
  }, [missions]);
  console.log(listUserMissions);

  return (
    <div className="container mt-5">
      <h2>המשימות שלי </h2>

      {!listUserMissions[0] ? (
        <div className="d-flex justify-content-center mt-5">
          <h4 className="text-secondary">אין משימות להצגה</h4>
        </div>
      ) : (
        <>
          <div className=" row d-flex justify-content-center mt-5">
            <div className="col-1 top_table text-center">מסד</div>
            <div className="col-1 top_table text-center">מועד משימה </div>
            <div className="col-1 top_table text-center">כותרת משימה </div>
            <div className="col-3 top_table text-center">פירוט משימה </div>
            <div className="col-1 top_table text-center">מסמכים מצורפים</div>
            <div className="col-1 top_table text-center">אחריות </div>
            <div className="col-1 top_table text-center">תג"ב </div>
            <div className="col-1 top_table text-center">ימים שנותרו </div>
            <div className="col-1 top_table text-center">סטאטוס </div>
          </div>
          {listUserMissions.map((mission, index) => (
            <div className="row d-flex justify-content-center">
              <div className="col-1  the_table d-flex justify-content-center ">
                {mission.missionId}
              </div>
              <div className="col-1  the_table d-flex justify-content-center text-center ">
                {endAtChanged(mission.startedAt)}
              </div>
              <div className="col-1  the_table d-flex justify-content-center text-center ">
                {mission.title}
              </div>
              <div className="col-3 col-1 the_table  d-flex justify-content-center text-center ">
                {mission.details}
              </div>
              <div className="col-1  the_table d-flex justify-content-center text-center ">
              ---
              </div>
              
                <div className="col-1 the_table text-center d-flex align-items-center p-0">
                  <div
                    className={`p_task_responsibility ${
                      mission.responsibility.length < 4
                        ? "d-flex align-items-center"
                        : ""
                    }`}
                  >
                    <div>
                      {mission.responsibility.map((name, i) => (
                        <div key={i}>
                          {!(i == mission.responsibility.length - 1)
                            ? name + ","
                            : name + "."}
                        </div>
                      ))}
                    </div>
                  
                </div>
              </div>
              <div className="col-1  the_table d-flex justify-content-center text-center ">
                {endAtChanged(mission.endedAt)}
              </div>
              <div className="col-1  the_table d-flex justify-content-center text-center ">
              {daysOff(mission.endedAt) < 0 ? (Math.abs(daysOff(mission.endedAt))  + "-"):(daysOff(mission.endedAt))}
              </div>
              <div className="col-1  the_table d-flex justify-content-center text-center ">
                {mission.status}{" "}
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  );
}
