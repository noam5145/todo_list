import React, { useEffect, useState } from "react";
import "./taskList.css";
import UnfoldMoreIcon from "@mui/icons-material/UnfoldMore";
import SearchOffIcon from "@mui/icons-material/SearchOff";
import SettingsIcon from "@mui/icons-material/Settings";
import { Button } from "@mui/material";

export default function TaskList() {
  const [opemId, setOpemId] = useState(false);

  useEffect(() => {
    window.addEventListener("click", () => {
      setOpemId(false)
    })
  }, [])



  return (
    <>
      <div className="container-fluid mt-5">
        <div className="d-flex justify-content-between mx-5">
          <h4 className="">מאגר משימות</h4>
          <span className="">
            <button className="btn bg-secondary">+ ייצוא לדוח לבחירה </button>
            <button className="btn bg-secondary mx-3">+ הוסף משימה </button>
          </span>
        </div>
        <div className="container all_table mt-5">
          <span className="sticky-top">
          <div className=" d-flex justify-content-center">
            <div className="col-1 top_table text-center">
              מזהה <span title="מיין לפי גדול/קטן"><UnfoldMoreIcon className="cursor" /></span>
            </div>
            <div className="col-1 top_table text-center" >
              מועד הפגישה <span title="מיין לפי גדול/קטן"><UnfoldMoreIcon className="cursor" /></span>
            </div>
            <div className="col-2 top_table text-center">
              כותרת הפגישה <span title="מיין לפי גדול/קטן"><UnfoldMoreIcon className="cursor" /></span>
            </div>
            <div className="col-3 top_table text-center">
              פירוט הפגישה <span title="מיין לפי גדול/קטן"><UnfoldMoreIcon className="cursor" /></span>
            </div>
            <div className="col-1 top_table text-center">
              אחריות <span title="מיין לפי גדול/קטן"><UnfoldMoreIcon className="cursor" /></span>
            </div>
            <div className="col-1 top_table text-center">
              תג"ב <span title="מיין לפי גדול/קטן"><UnfoldMoreIcon className="cursor" /></span>
            </div>
            <div className="col-1 top_table text-center">
              ימים שנותרו <span title="מיין לפי גדול/קטן"><UnfoldMoreIcon className="cursor" /></span>
            </div>
            <div className="col-1 top_table text-center">
              סטאטוס <span title="מיין לפי גדול/קטן"><UnfoldMoreIcon className="cursor" /></span>
            </div>
            <div className="col-1 top_table text-center">
              <span title="עריכה"><SettingsIcon className="cursor" size={35} color="primary" /></span>
            </div>
          </div>

          <div className="container d-flex justify-content-center p-0">
            <input className="col-1 the_table_search bg-light" placeholder=" הכנס מספר..."  type="number" />
            <input className="col-1 the_table_search bg-light p-1" type="date" />
            <input className="col-2 the_table_search bg-light" placeholder=" הכנס טקסט..."  type="text" />
            <input className="col-3 the_table_search bg-light" placeholder=" הכנס טקסט..."  type="text" />
            <input className="col-1 the_table_search bg-light" placeholder=" הכנס טקסט..."  type="text" />
            <input className="col-1 the_table_search bg-light p-1" type="date" />
            <input className="col-1 the_table_search bg-light" placeholder=" הכנס מספר..."  type="number" />
            <input className="col-1 the_table_search bg-light" placeholder=" הכנס טקסט..."  type="text" />
            <div className="col-1 the_table_search bg-light">----</div>
          </div></span>
          {Array(10)
            .fill(null)
            .map((i, item) => (
              <div key={i} className="container d-flex justify-content-center p-0">
                <div className="col-1 the_table text-center">135</div>
                <div className="col-1 the_table text-center">02/22/2023</div>
                <div className="col-2 the_table text-center">kjturyetr</div>
                <div className="col-3 the_table text-center align-items-center">
                  <p className="p_taskdetail p-2 ">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Provident odit quas rem. Accusantium, ducimus voluptatibus.
                    Maiores eveniet at exercitationem ut iusto, dolorum
                    voluptatibus aut eum rem labore sapiente facere consectetur!
                  </p>
                </div>
                <div className="col-1 the_table text-center">yiutyrt</div>
                <div className="col-1 the_table text-center">56</div>
                <div className="col-1 the_table text-center">8</div>
                <div className="col-1 the_table text-center">⭕ בחריגה</div>
                <div className="col-1 the_table text-center cursor">ערוך🖌️</div>
              </div>
            ))}
        </div>
      </div>
    </>
  );
}
