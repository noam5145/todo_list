import React, { useContext, useEffect, useState, useRef } from "react";
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
import TripOriginIcon from '@mui/icons-material/TripOrigin';
import ReportGmailerrorredIcon from '@mui/icons-material/ReportGmailerrorred';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { useReactToPrint } from "react-to-print";

export default function TaskList() {

  const { missions, deleteMission } = useContext(MyContext)
  const [open, setOpenDialog] = React.useState(false);
  const [allDataShow, setAllDataShow] = useState([]);
  const [chatOpen, setChatOpen] = useState(false);
  const [iForChat, setIForChat] = useState();
  const [seePrint, setSeeprint] = useState(true);
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
  const [anchorEl, setAnchorEl] = React.useState(null);
  const openSettings = Boolean(anchorEl);
  const toPrintRef = useRef()

  const OpenSettings = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const closeSettings = () => {
    setAnchorEl(null);
  };

  const openDialog = () => {
    setOpenDialog(true);
  };
  const closeDialog = () => {
    setOpenDialog(false);
  };


  useEffect(() => {
    let newMissions;
    const nowTime = new Date();

    if (missions[0]) {
      newMissions = [...missions];
      newMissions?.map((item, i) => {
        const endTime = new Date(item.endedAt);
        if (endTime.getTime() < nowTime.getTime() && item.status !== "בוצע") {
          item.status = "בחריגה"
        }
      });
      setAllDataShow(newMissions);
    }
  }, [missions])

  const SortNumberByHighAndLow = (field) => {
    let newSort;
    const compareHigh = (a, b) => {
      return a[field] - b[field]
    }
    const compareLow = (a, b) => {
      return b[field] - a[field]
    }

    if (table[field]) {
      const newTable = { ...table };
      newTable[field] = !table[field];
      setTable(newTable);
      newSort = [...missions]?.sort(compareHigh)
      setAllDataShow(newSort)
    } else {
      const newTable = { ...table };
      newTable[field] = !table[field];
      setTable(newTable);
      newSort = [...missions].sort(compareLow)
      setAllDataShow(newSort)
    }
  }

  const SortTaxtByHighAndLow = (field) => {
    let newSort;
    if (table[field]) {
      const newTable = { ...table };
      newTable[field] = !table[field];
      setTable(newTable);
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

  const SortByContentFound = (content, field) => {
    const newFilter = missions.filter(item => item[field].includes(content));
    setAllDataShow(newFilter);
  };
  const SortByContentSelect = (content,) => {
    const newFilter = missions.filter(item => item.status.includes(content));
    setAllDataShow(newFilter);
  };

  const handlePrint = useReactToPrint({
    content: () => toPrintRef.current,
  });
  
  const editMissions = () => {
    closeSettings()  // של איקונים menu  סוגר את 

    console.log("edit");
  }

  const confirmedMissions = () => {
    closeSettings()  // של איקונים menu  סוגר את 

    console.log("confrirmed");
  }
  
  
  

  useEffect(() => {
    // console.log(allDataShow);
    // console.log(notFound);
    // console.log(toPrintRef);
  }, [allDataShow])

  useEffect(() => {
    window.addEventListener("click", () => {
      setChatOpen(false)
      closeSettings()
    })
  }, [])

  const ConfirmDownload = () => {
    let dow = window.confirm(" האם אתה בטוח רוצה להוריד מסמך  ?");
    if (dow) {
      alert("בסדר 😃")
    }
  }

  return (
    <>
      <div className="container-fluid mt-5">
        <div className="d-flex justify-content-between mx-5">
          <h4 className="">מאגר משימות</h4>
          <span className="">
            <button className="btn bg-secondary text-light" style={{ width: "100px" }} onClick={() => { setSeeprint(!seePrint); setTimeout(handlePrint(), 10000); }}><samp>PDF</samp></button>
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
        <div className="container all_table mt-3 Ex">
          <span className="sticky-top">
            <div className=" d-flex justify-content-center">
              <div className="col-1 top_table text-center">
                מזהה <span title="מיין לפי גדול/קטן"><UnfoldMoreIcon id="missionId" onClick={(e) => SortNumberByHighAndLow(e.currentTarget.id)} className="cursor" /></span>
              </div>
              <div className="col-1 top_table text-center" >
                מועד משימה <span title="מיין לפי גדול/קטן"><UnfoldMoreIcon id="startedAt" onClick={(e) => SortTaxtByHighAndLow(e.currentTarget.id)} className="cursor" /></span>
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
              <input className="col-1 the_table_search bg-light" placeholder=" הכנס מספר..." type="number" id="missionId" onChange={(e) => SortByContentFound(e.target.value, e.currentTarget.id)} />
              <input className="col-1 the_table_search bg-light p-1" type="date" id="startedAt" onChange={(e) => SortByContentFound(e.target.value, e.currentTarget.id)} />
              <input className="col-1 the_table_search bg-light" placeholder=" הכנס טקסט..." id="title" type="text" onChange={(e) => SortByContentFound(e.target.value, e.currentTarget.id)} />
              <input className="col-3 the_table_search bg-light" placeholder=" הכנס טקסט..." id="details" type="text" onChange={(e) => SortByContentFound(e.target.value, e.currentTarget.id)} />
              <div className="col-1 the_table_search bg-light">----</div>
              <input className="col-1 the_table_search bg-light" placeholder=" הכנס טקסט..." id="responsibility" type="text" onChange={(e) => SortByContentFound(e.target.value, e.currentTarget.id)} />
              <input className="col-1 the_table_search bg-light p-1" placeholder=" הכנס תאריך..." id="endedAt" type="date" onChange={(e) => SortByContentFound(e.target.value, e.currentTarget.id)} />
              <input className="col-1 the_table_search bg-light p-1" placeholder=" הכנס מספר..." id="daysLeft" type="number" onChange={(e) => SortByContentFound(e.target.value, e.currentTarget.id)} />
              <div className="col-1 the_table_search bg-light" style={{ border: "none" }}>
                <select className="form-select" style={{ cursor: "pointer" }} onChange={(e) => SortByContentSelect(e.target.value, e.currentTarget.id)}>
                  <option value="בוצע">בוצע</option>
                  <option value="חריגה">חריגה</option>
                  <option value="בתהליך">בתהליך</option>
                  <option value="ממתין לאישור">ממתין לאישור</option>
                </select>
              </div>
              <div className="col-1 the_table_search bg-light">----</div>
            </div></span>
          {allDataShow?.length != 0 ?
            allDataShow?.map((item, i) => (
              <div key={i} className="container d-flex justify-content-center p-0">
                <div className="col-1 the_table text-center">{item.missionId}</div>
                <div className="col-1 the_table text-center">{item.startedAt}</div>
                <div className="col-1 the_table text-center">{item.title}</div>
                <div className="col-3 the_table text-center">
                  <p className="p_taskdetail p-2 text-center">
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
                <div className="col-1 the_table text-center">
                  <div className="mx-1"><TripOriginIcon
                    color={item.status === "בתהליך" ? "warning"
                      : item.status === "בחריגה" ? "error"
                        : item.status === "בוצע" ? "success"
                          : item.status === "ממתין לאישור" ? "info" : ""} />
                  </div>
                  <div className="">{item.status}</div>
                </div>
                <div className="col-1 the_table text-center">
                  <div className="d-flex align-items-center">
                    <div className="row div_chat_fan_icon mx-1">
                      <div className="cursor col-6 p-0" title="פתח צא'ט משימה" onClick={(e) => { e.stopPropagation(); setChatOpen(!chatOpen); setIForChat(i) }}>
                        <Badge badgeContent={2} color="primary">
                          < ChatIcon color="action" />
                        </Badge></div>
                      <div className="cursor col-6 p-0" onClick={(e) => { e.stopPropagation(); }}>
                        <MoreVertIcon
                          id="demo-positioned-button"
                          onClick={OpenSettings}
                        /></div>
                      <Menu
                        id="demo-positioned-menu"
                        anchorEl={anchorEl}
                        open={openSettings}
                        PaperProps={{
                          style: {
                            boxShadow: '1px 1px 3px rgba(0, 0, 0, 0.3)',
                          },
                        }}>
                        <MenuItem onClick={editMissions}><div className="d-flex justify-content-center" title="ערוך משימה"><FaPencilAlt size={18} className="mx-3" />ערוך משימה</div></MenuItem>
                        <MenuItem onClick={confirmedMissions}><div className="d-flex justify-content-center" title="שלח לאישור סיום"><SendIcon className="mx-2 icon_send" /></div>שלח לאישור משימה</MenuItem>
                        <MenuItem onClick={() => delMissions(item._id,item.token)}><div className="d-flex justify-content-center" title="מחק משימה"><DeleteOutlineIcon className="mx-3" /></div>מחק משימה</MenuItem>
                      </Menu>
                    </div>
                  </div>
                </div>
              </div>
            ))
            : <div className="container d-flex justify-content-center mt-5">
              <div className="fs-5"><ReportGmailerrorredIcon /></div>
              <h3 className="mx-1">המשימה לא נמצאה</h3>
            </div>}

          {/* {allDataShow?.map((item, i) => (
            <div key={i} ref={toPrintRef} className={seePrint ?"d-flex d-none justify-content-start mt-2" : "d-flex justify-content-start mt-2"} dir="rtl">
              <ul className="col-7 list-unstyled">
                <h3 className="">{item?.title}</h3>
                <li className="d-flex"><samp className="h5"> מזהה: </samp><b>{item?.missionId}</b> </li>
                <li><samp className="h5"> תאריך התחלת משימה: </samp><b>{item?.endedAt}</b></li>
                <li><samp className="h5"> תאריך סיום משימה: </samp><b>{item?.startedAt}</b></li>
                <li><samp className="h5"> ימים שנותרו למשימה: </samp><b>{item?.daysLeft}</b></li>
                <li><samp className="h5"> אחריות המשימה: </samp><b>{item?.responsibility}</b></li>
                <li><samp className="h5"> פרטי משימה: </samp><div><b>{item?.details}</b></div></li>
                <li><samp className="h5"> סטאטוס משימה: </samp><b>{item?.status}</b></li>
              </ul>
            </div>
          ))} */}
        </div>
        <div className="mx-5">סה"כ משימות: {allDataShow?.length}</div>
        {chatOpen && <div onClick={(e) => {
          e.stopPropagation()
        }} className="the_chat"><TheChat setChatOpen={setChatOpen} chatOpen={chatOpen} iForChat={iForChat} /></div>}
      </div>
    </>
  );
}