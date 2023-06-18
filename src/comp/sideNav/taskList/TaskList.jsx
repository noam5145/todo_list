import React, { useContext, useEffect, useState } from "react";
import "./taskList.css";
import UnfoldMoreIcon from "@mui/icons-material/UnfoldMore";
import SettingsIcon from "@mui/icons-material/Settings";
import AssignmentIcon from '@mui/icons-material/Assignment';
import ChatIcon from '@mui/icons-material/Chat';
import SendIcon from '@mui/icons-material/Send';
import { FaPencilAlt } from "react-icons/fa";
import { MyContext } from "../../../App";
import TheChat from "../chat/TheChat";
import { Badge, Dialog } from "@mui/material";
import AddMissions from "../addMissions/AddMissions";

export default function TaskList() {

  const { missions } = useContext(MyContext)
  const [opemId, setOpemId] = useState(false);
  const [open, setOpenDialog] = React.useState(false);
  const [allDataShow, setAllDataShow] = useState([]);
  const [chatOpen, setChatOpen] = useState(false);
  const [table, setTable] = useState({
    missionId: true,
    starteAt: true,
    title: true,
    details: true,
    responsibility: true,
    endedAt: true,
    daysLeft: true,
    status: true,
  });


  const openDialog = () => {
    setOpenDialog(true);
  };
  const closeDialog = () => {
    setOpenDialog(false);
  };


  useEffect(() => {
    let newMissions = [...missions];
    setAllDataShow(newMissions)
  }, [missions])



  // const SortByHighAndLow = (field) => {

  //   function comm(a,b){
  //     return a[field]-b[field]
  //   }

  //   let  newSort = [...missions]?.sort(comm);
  //   setAllDataShow(newSort)
  // }




  const SortNumberByHighAndLow = (field) => {
    let newSort;
    const compareHigh = (a,b)=>{
      return a[field]-b[field]
    }
    const compareLow = (a,b) => {
      return b[field]-a[field]
    }

    if (table[field]) {
      const newTable = { ...table };
      newTable[field] = !table[field];
      setTable(newTable);

      console.log(table[field]);
      newSort = [...missions]?.sort(compareHigh) 
      setAllDataShow(newSort)
    } else {
      const newTable = { ...table };
      newTable[field] = !table[field];
      setTable(newTable);
      console.log(table[field]);
      newSort = [...missions].sort(compareLow)
      setAllDataShow(newSort)
    }
  }

  // const SortTaxtByHighAndLow = (field) => {
  //   constvcoomNME = (a,b) => a.field.localCompare(b.field);
   
  //    let newSort = [...missions]?.sort(a, b)
  //           setAllDataShow(newSort)
  
  // }


  const SortTaxtByHighAndLow = (field) => {
    let newSort;
    if (table[field]) {
      const newTable = { ...table };
      newTable[field] = !table[field];
      setTable(newTable);
      console.log(table[field]);
      newSort = [...missions]?.sort((a, b) => {
        if (a[field] < b[field]) {
          return -1;
        }
        if (a[field] > b[field]) {
          return 1;
        }
        return 0;
      });
      setAllDataShow(newSort)
    } else {
      const newTable = { ...table };
      newTable[field] = !table[field];
      setTable(newTable);
      console.log(table[field]);
      newSort = [...missions].sort((a, b) => {
        if (a[field] < b[field]) {
          return 1;
        }
        if (a[field] > b[field]) {
          return -1;
        }
        return 0;
      });
      setAllDataShow(newSort)
    }
  }

  useEffect(() => {
    console.log(allDataShow);
  }, [allDataShow])

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
            <button className="btn bg-secondary mx-3 text-light" onClick={openDialog}> הוסף משימה +</button>
            <div className="row">
            <Dialog
              open={open}
              className="row"
              onClose={closeDialog}>
                <AddMissions />
            </Dialog></div>
          </span>
        </div>
        <div className="container all_table mt-3">
          <span className="sticky-top">
            <div className=" d-flex justify-content-center">
              <div className="col-1 top_table text-center">
                מזהה <span title="מיין לפי גדול/קטן"><UnfoldMoreIcon id="missionId" onClick={(e) => SortNumberByHighAndLow(e.currentTarget.id)} className="cursor" /></span>
              </div>
              <div className="col-1 top_table text-center" >
                מועד משימה <span title="מיין לפי גדול/קטן"><UnfoldMoreIcon id="starteAt" onClick={(e) => SortTaxtByHighAndLow(e.currentTarget.id)} className="cursor" /></span>
              </div>
              <div className="col-1 top_table text-center">
                כותרת משימה <span title="מיין לפי גדול/קטן"><UnfoldMoreIcon id="title" onClick={(e) => SortTaxtByHighAndLow(e.currentTarget.id)} className="cursor" /></span>
              </div>
              <div className="col-3 top_table text-center">
                פירוט משימה <span title="מיין לפי גדול/קטן"><UnfoldMoreIcon id="details" onClick={(e) => SortTaxtByHighAndLow(e.currentTarget.id)} className="cursor" /></span>
              </div>
              <div className="col-1 top_table text-center">
                מסמכים מצורפים
              </div>
              <div className="col-1 top_table text-center">
                אחריות <span title="מיין לפי גדול/קטן"><UnfoldMoreIcon id="responsibility" onClick={(e) => SortTaxtByHighAndLow(e.currentTarget.id)} className="cursor" /></span>
              </div>
              <div className="col-1 top_table text-center">
                תג"ב <span title="מיין לפי גדול/קטן"><UnfoldMoreIcon id="endedAt" onClick={(e) => SortTaxtByHighAndLow(e.currentTarget.id)} className="cursor" /></span>
              </div>
              <div className="col-1 top_table text-center">
                ימים שנותרו <span title="מיין לפי גדול/קטן"><UnfoldMoreIcon id="daysLeft" onClick={(e) => SortTaxtByHighAndLow(e.currentTarget.id)} className="cursor" /></span>
              </div>
              <div className="col-1 top_table text-center">
                סטאטוס <span title="מיין לפי גדול/קטן"><UnfoldMoreIcon id="status" onClick={(e) => SortTaxtByHighAndLow(e.currentTarget.id)} className="cursor" /></span>
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
          {allDataShow?.map((item, i) => (
            <div key={i} className="container d-flex justify-content-center p-0">
              <div className="col-1 the_table text-center">{item.missionId}</div>
              <div className="col-1 the_table text-center">{item.startedAt}</div>
              <div className="col-1 the_table text-center">{item.title}</div>
              <div className="col-3 the_table text-center align-items-center">
                <p className="p_taskdetail p-2 ">
                  {item.details}
                </p>
              </div>
              <div className="col-1 the_table_file text-center" title="לחץ להורדת מסמך" onClick={ConfirmDownload}>
                <div className="mt-4">
                  <div> הורדת מסמך</div>
                  <AssignmentIcon /></div>
              </div>
              <div className="col-1 the_table text-center"><samp className="p_taskdetail p-2 d-flex justify-content-center align-items-center">{item.responsibility}</samp></div>
              <div className="col-1 the_table text-center">{item.endedAt}</div>
              <div className="col-1 the_table text-center">{item.daysLeft}</div>
              <div className="col-1 the_table text-center">⭕{item.status}</div>
              <div className="col-1 the_table text-center">
                <div>
                  <div className="row div_chat_fan_icon mx-1">
                    <div className="cursor col-6" title="פתח צא'ט משימה" onClick={() => setChatOpen(!chatOpen)}>
                      <Badge badgeContent={2} color="primary">
                        < ChatIcon color="action" />
                      </Badge></div>
                    <div className="cursor col-6" title="ערוך משימה"><FaPencilAlt size={18} /></div>
                  </div>
                  <div className="row div_send_icon mx-1">
                    <div className="cursor p-1 border-dark" title="שלח לאישור סיום"><SendIcon className="icon_send" /></div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        {chatOpen && <div className="the_chat"><TheChat setChatOpen={setChatOpen} chatOpen={chatOpen} /></div>}
      </div>
    </>
  );
}