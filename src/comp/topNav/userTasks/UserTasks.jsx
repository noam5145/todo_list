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

  return (
    <div>
      {/* {
        listUserMissions.map((mission, i)=>(
          <div>
            {mission.title}
          </div>
        ))
      } */}
      <div className=" d-flex justify-content-center">
        <div className="col-1 top_table text-center">מזהה</div>
        <div className="col-1 top_table text-center">
          מועד משימה{" "}
        
        </div>
        <div className="col-1 top_table text-center">
          כותרת משימה{" "}
         
        </div>
        <div className="col-3 top_table text-center">
          פירוט משימה{" "}
          
        </div>
        <div className="col-1 top_table text-center">מסמכים מצורפים</div>
        <div className="col-1 top_table text-center">
          אחריות{" "}
          
        </div>
        <div className="col-1 top_table text-center">
          תג"ב{" "}
          
        </div>
        <div className="col-1 top_table text-center">
          ימים שנותרו{" "}
         
        </div>
        <div className="col-1 top_table text-center">
          סטאטוס{" "}
       
        </div>
      </div>
    </div>
  );
}
