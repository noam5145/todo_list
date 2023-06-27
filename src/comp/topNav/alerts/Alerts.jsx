import React, { useEffect, useContext, useState } from "react";
import "./alerts.css"
import { MyContext } from "../../../App";
import { FcApproval } from "react-icons/fc";
import { IoMdCheckmarkCircle } from "react-icons/io";
import { CircularProgress } from "@mui/material";

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
    missions,
    loading
  } = useContext(MyContext);
  const [alert, setAlert] = useState([]);

  useEffect(() => {
    if (newMissions[0]) {
      setAlert(newMissions);
    }
  }, [newMissions]);

  useEffect(()=>{

  },[missions])
  


  function deletAletrs(missionId) {
    console.log("aervaer");
    currentUser.newMissions = alert.filter(
      (mission, i) => mission.missionId !== missionId
    );
    setAlert(currentUser.newMissions);
    updateUser(currentUser, currentUser.token);
    setNewMissions(
      alert.filter((mission, i) => mission.missionId !== missionId)
    );
  }

  return (
    <>
    {!loading ? 
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
              <div className="col-1 top_table text-center">מסד</div>
              <div className="col-1 top_table text-center">מועד משימה </div>
              <div className="col-1 top_table text-center">כותרת משימה </div>
              <div className="col-3 top_table text-center">פירוט משימה </div>
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
                <div className="col-1  the_table d-flex justify-content-center text-center p_task_responsibility">
                  {mission.missionId}
                </div>
                <div className="col-1  the_table d-flex justify-content-center text-center p_task_responsibility">
                  {endAtChanged(mission.startedAt)}
                </div>
                <div className="col-1  the_table d-flex justify-content-center text-center p_task_responsibility">
                  {mission.title}
                </div>
                <div className="col-3 col-1  the_table d-flex justify-content-center text-center p_task_responsibility">
                  {mission.details}
                </div>
                <div className="col-1  the_table d-flex justify-content-center text-center p_task_responsibility">
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
                <div className="col-1  the_table d-flex justify-content-center text-center p_task_responsibility">
                  {endAtChanged(mission.endedAt)}
                </div>
                <div className="col-1  the_table d-flex justify-content-center text-center p_task_responsibility">
                {daysOff(mission.endedAt) < 0 ? (Math.abs(daysOff(mission.endedAt))  + "-"):(daysOff(mission.endedAt))}
                </div>
                <div className="col-1  the_table d-flex justify-content-center text-center p_task_responsibility">
                  {mission.status}
                </div>
                <div
                  className="col-1  the_table d-flex justify-content-center text-center p_task_responsibility "
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
    :
    <div className="container">

    <div className="d-flex justify-content-center align-items-center my-5">
    <CircularProgress />
  </div>
  </div>
    }
    </>
  );
}
