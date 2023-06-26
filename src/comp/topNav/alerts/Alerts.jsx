import React, { useEffect, useContext, useState } from "react";
import "./alerts.css"
import { MyContext } from "../../../App";
import { FcApproval } from "react-icons/fc";
import { IoMdCheckmarkCircle } from "react-icons/io";

export default function Message() {
  const {
    newMissions,
    currentUser,
    updateUser,
    setNewMissions,
    daysOff,
    changeStatus,
    endAtChanged,
    setMissions,
    missions
  } = useContext(MyContext);
  const [alert, setAlert] = useState([]);

  useEffect(() => {
    if (newMissions[0]) {
      setAlert(newMissions);
    }
  }, [newMissions]);
  


  function deletAletrs(missionId) {
    currentUser.newMissions = alert.filter(
      (mission, i) => mission.missionId !== missionId
    );
    setMissions(missions)
    setAlert(alert.filter((mission, i) => mission.missionId !== missionId));
    updateUser(currentUser, currentUser.token);
    setNewMissions(
      alert.filter((mission, i) => mission.missionId !== missionId)
    );
  }

  return (
    <div className="container d-flex justify-content-center">
      {!alert[0] ? (
        <div className="">
          <h1 className="m-5 text-secondary">אין התראות חדשות</h1>
        </div>
      ) : (
        <div className="container mt-5">
          <h3 className="text-success d-flex justify-content-center">
            התקבלו משימות חדשות עבורך
          </h3>
          <div className="mt-5">
            <div className=" row d-flex justify-content-center">
              <div className="col-1 top_table text-center">מזהה</div>
              <div className="col-1 top_table text-center">מועד משימה </div>
              <div className="col-1 top_table text-center">כותרת משימה </div>
              <div className="col-2 top_table text-center">פירוט משימה </div>
              <div className="col-1 top_table text-center">מסמכים מצורפים</div>
              <div className="col-1 top_table text-center">אחריות </div>
              <div className="col-1 top_table text-center">תג"ב </div>
              <div className="col-1 top_table text-center">ימים שנותרו </div>
              <div className="col-1 top_table text-center">סטאטוס </div>
              <div className="col-1 top_table text-center">אשר קריאה </div>
            </div>
          </div>
          {alert.map((mission, index) => {
            return (
              <div className="row d-flex justify-content-center" key={index}>
                <div className="col-1  the_table d-flex justify-content-center text-center ">
                  {mission.missionId}
                </div>
                <div className="col-1  the_table d-flex justify-content-center text-center ">
                  {endAtChanged(mission.startedAt)}
                </div>
                <div className="col-1  the_table d-flex justify-content-center text-center ">
                  {mission.title}
                </div>
                <div className="col-2 col-1  the_table d-flex justify-content-center text-center ">
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
                <div className="col-1  the_table d-flex justify-content-center text-center">
                  {endAtChanged(mission.endedAt)}
                </div>
                <div className="col-1  the_table d-flex justify-content-center text-center">
                  {daysOff(mission.endedAt)}
                </div>
                <div className="col-1  the_table d-flex justify-content-center text-center">
                  {changeStatus(mission.endedAt)}
                </div>
                <div
                  className="col-1  the_table d-flex justify-content-center text-center  "
                  onClick={() => deletAletrs(mission.missionId)}
                >
                  <IoMdCheckmarkCircle
                    className="cursor"
                    size={25}
                    title="Read Confirmation"
                  />
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
