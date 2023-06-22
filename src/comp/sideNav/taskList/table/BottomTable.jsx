import React, { useContext, useEffect, useState, useRef } from "react";
import "../taskList.css";
import AssignmentIcon from '@mui/icons-material/Assignment';
import ChatIcon from '@mui/icons-material/Chat';
import SendIcon from '@mui/icons-material/Send';
import { FaPencilAlt } from "react-icons/fa";
import { MyContext } from "../../../../App";
import { Badge } from "@mui/material";
import Brightness1Icon from '@mui/icons-material/Brightness1';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { AiOutlineFilePdf } from "react-icons/ai";


export default function BottomTable({ item, i, openDialog, setEditSingleMission, setIForChat, setChatOpen, chatOpen, notifyDel, notifySend }) {
  const { deleteMission, currentUser } = useContext(MyContext)
  const [anchorEl, setAnchorEl] = React.useState(null);
  const openSettings = Boolean(anchorEl);

  const OpenSettings = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const closeSettings = () => {
    setAnchorEl(null);
  };


  const editMission = (item) => {
    openDialog()
    setEditSingleMission(item);
  }

  const SubmitMission = () => {


    notifySend()
  };

  const delMission = (_id, token) => {
    let del = window.confirm(" האם אתה בטוח רוצה למחוק משימה  ?");
    if (del) {
      deleteMission(_id, token)
      setTimeout(() => {
        notifyDel()
      }, 1000);
    }
  }

  const ConfirmDownload = () => {
    let dal = window.confirm(" האם אתה בטוח רוצה להוריד מסמך  ?");
    if (dal) {

    }
  }

  useEffect(() => {
    window.addEventListener("click", () => {
      closeSettings()
    })
  }, [])

  return (
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
        <div className="mt-4"><div> הורדת מסמך</div><AiOutlineFilePdf size={25} /></div>
      </div>
      <div className="col-1 the_table text-center"><samp className="p_taskdetail p-2 d-flex justify-content-center align-items-center">{item.responsibility}</samp></div>
      <div className="col-1 the_table text-center">{item.endedAt}</div>
      <div className="col-1 the_table text-center">{item.daysLeft}</div>
      <div className="col-1 the_table text-center">
        <div className="mx-1"><Brightness1Icon
          color={item.status == "בתהליך" ? "warning"
            : item.status == "בחריגה" ? "error"
              : item.status == "בוצע" ? "success"
                : item.status == "ממתין לאישור" ? "info" : "dark"} />
        </div>
        <div className="">{item.status}</div>
      </div>
      <div className="col-1 the_table text-center">
        <div className="d-flex align-items-center">
          <div className="row div_chat_fan_icon mx-1">
            <div className="cursor col-6 p-0" title="פתח צא'ט משימה" onClick={(e) => { e.stopPropagation(); setChatOpen(!chatOpen) }}>
              <Badge badgeContent={2} color="primary">
                < ChatIcon color="action" onClick={() => setIForChat(i)} />
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
              <MenuItem onClick={() => { closeSettings(); editMission(item); }} title="ערוך משימה"><div className="d-flex justify-content-center"><FaPencilAlt size={18} className="mx-3" />ערוך משימה</div></MenuItem>
              <MenuItem onClick={() => { closeSettings(); SubmitMission(); }}  title="שלח לאישור סיום"><div className="d-flex justify-content-center icon_send"><SendIcon className="mx-2" /></div>שלח לאישור משימה</MenuItem>
              <MenuItem onClick={() => { closeSettings(); delMission(item._id, currentUser.token) }}  title="מחק משימה"><div className="d-flex justify-content-center"><DeleteOutlineIcon className="mx-3" /></div>מחק משימה</MenuItem>
            </Menu>
          </div>
        </div>
      </div>
    </div>
  )
}
