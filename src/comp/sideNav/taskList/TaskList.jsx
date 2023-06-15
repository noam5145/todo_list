import React, { useContext, useEffect, useState } from "react";
import "./taskList.css";
import UnfoldMoreIcon from "@mui/icons-material/UnfoldMore";
import SettingsIcon from "@mui/icons-material/Settings";
import AssignmentIcon from '@mui/icons-material/Assignment';
import ChatIcon from '@mui/icons-material/Chat';
import SendIcon from '@mui/icons-material/Send';
import { FaPencilAlt } from "react-icons/fa";
import { MyContext } from "../../../App";

export default function TaskList() {

  const {missions} = useContext(MyContext)
  const [opemId, setOpemId] = useState(false);
  const [allDataShow, setAllDataShow] = useState();

  const table = {
    missionId: false,
    starteAt: false,
    title: false,
    details: false,
    responsibility: false,
    endedAt: false,
    daysLeft: false,
    status: false,
  }

  console.log(missions + " momo");

  const SortByHighAndLow = (title) => {
    if (table[title]) {


      table[title] = !table[title];
    } else {

      table[title] = !table[title];
    }
    // console.log(title);
    // console.log(table[title]);
  }

  const SortByContentFound = (content) => {
    // let newTable = allDataShow.filter((taible) => table.includes(content)
    console.log(content);
  }
  // filter((recipe) => recipe.name.includes(filter)

  useEffect(() => {
    window.addEventListener("click", () => {
      setOpemId(false)
    })
  }, [])

  const ConfirmDownload = () => {
    let dal = window.confirm(" האם אתה בטוח רוצה להוריד מסמך  ?");
    if (dal) {
      alert("בסדר 😃")
    }
  }

  return (
    <>
      <div className="container-fluid mt-5">
        <div className="d-flex justify-content-between mx-5">
          <h4 className="">מאגר משימות</h4>
          <span className="">
            <button className="btn bg-secondary text-light" style={{ width: "100px" }}><samp>PDF</samp></button>
            <button className="btn bg-secondary mx-3 text-light"> הוסף משימה +</button>
          </span>
        </div>
        <div className="container all_table mt-5">
          <span className="sticky-top">
            <div className=" d-flex justify-content-center">
              <div className="col-1 top_table text-center">
                מזהה <span title="מיין לפי גדול/קטן"><UnfoldMoreIcon id="missionId" onClick={(e) => SortByHighAndLow(e.currentTarget.id)} className="cursor" /></span>
              </div>
              <div className="col-1 top_table text-center" >
                מועד משימה <span title="מיין לפי גדול/קטן"><UnfoldMoreIcon id="starteAt" onClick={(e) => SortByHighAndLow(e.currentTarget.id)} className="cursor" /></span>
              </div>
              <div className="col-1 top_table text-center">
                כותרת משימה <span title="מיין לפי גדול/קטן"><UnfoldMoreIcon id="title" onClick={(e) => SortByHighAndLow(e.currentTarget.id)} className="cursor" /></span>
              </div>
              <div className="col-3 top_table text-center">
                פירוט משימה <span title="מיין לפי גדול/קטן"><UnfoldMoreIcon id="details" onClick={(e) => SortByHighAndLow(e.currentTarget.id)} className="cursor" /></span>
              </div>
              <div className="col-1 top_table text-center">
                מסמכים מצורפים
              </div>
              <div className="col-1 top_table text-center">
                אחריות <span title="מיין לפי גדול/קטן"><UnfoldMoreIcon id="responsibility" onClick={(e) => SortByHighAndLow(e.currentTarget.id)} className="cursor" /></span>
              </div>
              <div className="col-1 top_table text-center">
                תג"ב <span title="מיין לפי גדול/קטן"><UnfoldMoreIcon id="endedAt" onClick={(e) => SortByHighAndLow(e.currentTarget.id)} className="cursor" /></span>
              </div>
              <div className="col-1 top_table text-center">
                ימים שנותרו <span title="מיין לפי גדול/קטן"><UnfoldMoreIcon id="daysLeft" onClick={(e) => SortByHighAndLow(e.currentTarget.id)} className="cursor" /></span>
              </div>
              <div className="col-1 top_table text-center">
                סטאטוס <span title="מיין לפי גדול/קטן"><UnfoldMoreIcon id="status" onClick={(e) => SortByHighAndLow(e.currentTarget.id)} className="cursor" /></span>
              </div>
              <div className="col-1 top_table text-center">
                <span title="עריכה"><SettingsIcon className="cursor" size={35} color="primary" /></span>
              </div>
            </div>
            <div className="container d-flex justify-content-center p-0">
              <input className="col-1 the_table_search bg-light" placeholder=" הכנס מספר..." type="number" onChange={(e) => SortByContentFound(e.target.value)} />
              <input className="col-1 the_table_search bg-light p-1" type="date" onChange={(e) => SortByContentFound(e.target.value)} />
              <input className="col-1 the_table_search bg-light" placeholder=" הכנס טקסט..." type="text" onChange={(e) => SortByContentFound(e.target.value)} />
              <input className="col-3 the_table_search bg-light" placeholder=" הכנס טקסט..." type="text" onChange={(e) => SortByContentFound(e.target.value)} />
              <div className="col-1 the_table_search bg-light">----</div>
              <input className="col-1 the_table_search bg-light" placeholder=" הכנס טקסט..." type="text" onChange={(e) => SortByContentFound(e.target.value)} />
              <input className="col-1 the_table_search bg-light p-1" type="date" />
              <div className="col-1 the_table_search bg-light">----</div>
              <div className="col-1 the_table_search bg-light" style={{ border: "none" }} onChange={(e) => SortByContentFound(e.target.value)}>
                <select className="form-select" onChange={(e) => SortByContentFound(e.target.value)}>
                  <option value="done">בוצע</option>
                  <option value="deviation">חריגה</option>
                  <option value="process">בתהליך</option>
                  <option value="approval">ממתין לאישור</option>
                </select>
              </div>
              <div className="col-1 the_table_search bg-light">----</div>
            </div></span>
          {/* {Array(10)
            .fill(null)
            .map((i, item) => (
              <div key={i} className="container d-flex justify-content-center p-0">
                <div className="col-1 the_table text-center">135</div>
                <div className="col-1 the_table text-center">02/22/2023</div>
                <div className="col-1 the_table text-center">kjturyetr</div>
                <div className="col-3 the_table text-center align-items-center">
                  <p className="p_taskdetail p-2 ">
                    Lorem ipsum dolor sit amet consectetur adipisicing elitoiouhjghfds.
                    Provident odit quas rem. Accusantium, ducimus voluptatibus.
                    Maiores eveniet at exercitationem ut iusto, dolorum
                    voluptatibus aut eum rem labore sapiente facere consectetur!
                  </p>
                </div>
                <div className="col-1 the_table_file text-center" title="לחץ להורדת מסמך" onClick={ConfirmDownload}>
                  <div className="mt-4">
                    <div> הורדת מסמך</div>
                    <AssignmentIcon /></div>
                </div>
                <div className="col-1 the_table text-center"><samp className="p_taskdetail p-2 d-flex justify-content-center align-items-center">ק,אג"ם ק,א"גם</samp></div>
                <div className="col-1 the_table text-center">56</div>
                <div className="col-1 the_table text-center">8</div>
                <div className="col-1 the_table text-center">⭕ בחריגה</div>
                <div className="col-1 the_table text-center">
                  <div className="p-2">
                    <div className="cursor border btn p-1 mx-1 my-1"><ChatIcon /></div>
                    <div className="cursor border btn p-1 mx-1 my-1"><FaPencilAlt /></div>
                    <div className="cursor border btn p-1  mx-1"><SendIcon /></div>
                  </div>
                </div>
              </div>
            ))} */}
        </div>
      </div>
    </>
  );
}