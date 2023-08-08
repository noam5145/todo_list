import React, { useContext, useEffect, useState, useRef } from "react";
import "../taskList.css";
import AssignmentIcon from "@mui/icons-material/Assignment";
import ChatIcon from "@mui/icons-material/Chat";
import SendIcon from "@mui/icons-material/Send";
import { FaPencilAlt } from "react-icons/fa";
import { MyContext } from "../../../../App";
import { Badge } from "@mui/material";
import Brightness1Icon from "@mui/icons-material/Brightness1";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { AiOutlineFilePdf } from "react-icons/ai";

export default function BottomTable({
  item,
  i,
  openDialog,
  setEditSingleMission,
  setIForChat,
  setChatOpen,
  chatOpen,
  notifyDel,
  notifySend,
  allDataShow
}) {
  const { deleteMission, currentUser, daysOff, missions, sendToConfirm } = useContext(MyContext);
  const [numMsg, setNumMsg] = useState([]);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const openSettings = Boolean(anchorEl);

  const OpenSettings = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const closeSettings = () => {
    setAnchorEl(null);
  };

  const editMission = (item) => {
    openDialog();
    setEditSingleMission(item);
  };

  const SubmitMission = (item) => {
    item.status = "ממתין לאישור";
    sendToConfirm(item, currentUser.token);
    notifySend();
  };

  const delMission = (_id, token) => {
    let del = window.confirm(" האם אתה בטוח רוצה למחוק משימה ?");
    if (del) {
      deleteMission(_id, token);
      setTimeout(() => {
        notifyDel();
      }, 1000);
    }
  };

  const ConfirmDownload = () => {
    let dal = window.confirm(" האם אתה בטוח רוצה להוריד מסמך  ?");
    if (dal) {
    }
  };

  useEffect(() => {
    window.addEventListener("click", () => {
      closeSettings();
    });
  }, []);

  useEffect(()=>{
    if(allDataShow[0]){
      let arr = Array(item.chat.messages.readed?.length).fill(0);
      item.chat.messages.readed?.map((read, i)=>{
        if(!read && !(item.chat.messages.msg.split('\n')[i]?.split('}')[0].slice(1) === currentUser.username)){
          arr[i]++;
        }
      })
      let num =0;
      arr.map((item)=>{
        if(item != 0){
          num++;
        }
      })
      setNumMsg(num);
    }
  }, [allDataShow]);

  return (<>
    {item ? (
    <div key={i} className="container d-flex justify-content-center p-0">
      <div className="col-1 the_table text-center">{item.missionId}</div>
      <div className="col-1 the_table text-center">{item.startedAt}</div>
      <div className="col-1 the_table text-center">{item.title}</div>
      <div className="col-1 the_table text-center">{item.details}</div>
     
      <div
        className="col-1 the_table_file the_table"
        title="לחץ להורדת מסמך"
        onClick={ConfirmDownload}
      >
       
         <AiOutlineFilePdf size={20} />
          
       
      </div>
      <div className="col-1 the_table text-center d-flex align-items-center"></div>
      <div className="col-1 the_table text-center d-flex align-items-center"></div>
      <div className="col-1 the_table text-center d-flex align-items-center"></div>
      {/* <div className="col-1 responsibility text-center d-flex align-items-center"> */}
        <div
          className={`col-1 the_table text-center d-flex align-items-center${
            item.responsibility.length < 4 ? "d-flex align-items-center" : ""
          }`}
        >
          <div className="">
            {item.responsibility.map((name, i) => (
              <div className="my-1" key={i}>
                {!(i == item.responsibility.length - 1)
                  ? name + ","
                  : name + "."}
              </div>
            ))}
          {/* </div> */}
        </div>
      </div>
      <div className="col-1 the_table text-center">{item.endedAt}</div>
      {/* <div className="col-1 the_table text-center">
        
      </div> */}
      <div className="col-1 the_table text-center d-flex justify-content-start">
        <div className="mx-1">
          <Brightness1Icon
            color={
              item.status == "בתהליך"
                ? "warning"
                : item.status == "בחריגה"
                ? "error"
                : item.status == "בוצע"
                ? "success"
                : item.status == "ממתין לאישור"
                ? "info"
                : "dark"
            }
          />
        </div>
        <div className="fontSizeTable">{item.status}</div>
        <div className="fontSizeTable">
        <span className="">(</span>
        <span className="">{daysOff(item.endedAt) < 0
          ? Math.abs(daysOff(item.endedAt)) + "-"
          : daysOff(item.endedAt)}</span>
        <span>)</span>
        </div>

      </div>
      <div className="col-1 the_table text-center">
        <div className="d-flex align-items-center">
          <div className="row div_chat_fan_icon mx-1">
          {currentUser.access !== 'admin' && item.token.find((t)=> t === currentUser.token) ?  <>
            <div className="cursor col-6 p-0" title="פתח צא'ט משימה" onClick={(e) => { e.stopPropagation(); setChatOpen(!chatOpen); setIForChat(i) }}>
              <Badge badgeContent={numMsg != 0 ? numMsg : null } color="primary">
                < ChatIcon color="action" />
              </Badge></div>
              <div className="cursor col-6 p-0" onClick={(e) => { e.stopPropagation(); }}>
              <MoreVertIcon
                id="demo-positioned-button"
                onClick={OpenSettings}
              />
            </div>
              <Menu
              id="demo-positioned-menu"
              anchorEl={anchorEl}
              open={openSettings}
              PaperProps={{
                style: {
                  boxShadow: "1px 1px 3px rgba(0, 0, 0, 0.3)",
                },
              }}
            >
              {item.status == 'ממתין לאישור' || item.status == 'בחריגה' ? (
                 <MenuItem
                 onClick={() => {
                   closeSettings();
                 }}
                 disabled={true}
               >
                 <div className="d-flex justify-content-center icon_send">
                   <SendIcon className="mx-2" />
                 </div>
                 שלח לאישור משימה
               </MenuItem>
              ) : (
                <MenuItem
                onClick={() => {
                  closeSettings();
                  SubmitMission(item);
                }}
                title="שלח לאישור סיום"
              >
                <div className="d-flex justify-content-center icon_send">
                  <SendIcon className="mx-2" />
                </div>
                שלח לאישור משימה
              </MenuItem>
              )}
            </Menu>
              </>
              
              : currentUser.access !== 'admin' ? '---' : '' }
            { currentUser.access === 'admin' ? <>
            <div className="cursor col-6 p-0" title="פתח צא'ט משימה" onClick={(e) => { e.stopPropagation(); setChatOpen(!chatOpen); setIForChat(i) }}>
              <Badge badgeContent={numMsg != 0 ? numMsg : null } color="primary">
                < ChatIcon color="action" />
              </Badge></div>
            <div className="cursor col-6 p-0" onClick={(e) => { e.stopPropagation(); }}>
              <MoreVertIcon
                id="demo-positioned-button"
                onClick={OpenSettings}
              />
            </div>
            <Menu
              id="demo-positioned-menu"
              anchorEl={anchorEl}
              open={openSettings}
              PaperProps={{
                style: {
                  boxShadow: "1px 1px 3px rgba(0, 0, 0, 0.3)",
                },
              }}
            >

              
              <MenuItem
                onClick={() => {
                  closeSettings();
                  editMission(item);
                }}
                title="ערוך משימה"
              >
                <div className="d-flex justify-content-center">
                  <FaPencilAlt size={18} className="mx-3" />
                  ערוך משימה
                </div>
              </MenuItem>
              {item.status == 'ממתין לאישור' || item.status == 'בחריגה' ? (
                 <MenuItem
                 onClick={() => {
                   closeSettings();
                 }}
                 disabled={true}
               >
                 <div className="d-flex justify-content-center icon_send">
                   <SendIcon className="mx-2" />
                 </div>
                 שלח לאישור משימה
               </MenuItem>
              ) : (
                <MenuItem
                onClick={() => {
                  closeSettings();
                  SubmitMission(item);
                }}
                title="שלח לאישור סיום"
              >
                <div className="d-flex justify-content-center icon_send">
                  <SendIcon className="mx-2" />
                </div>
                שלח לאישור משימה
              </MenuItem>
              )}
              <MenuItem
                onClick={() => {
                  closeSettings();
                  delMission(item._id, currentUser.token);
                }}
                title="מחק משימה"
              >
                <div className="d-flex justify-content-center">
                  <DeleteOutlineIcon className="mx-3" />
                </div>
                מחק משימה
              </MenuItem>
            </Menu>
            </> : ''}
          </div>
        </div>
      </div>
    </div> ) : ''}</>
  );
}
