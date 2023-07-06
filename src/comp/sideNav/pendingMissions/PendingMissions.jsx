import LocalPrintshopRoundedIcon from "@mui/icons-material/LocalPrintshopRounded";
import React, { useContext, useEffect, useRef, useState } from "react";
import "./pendingMissions.css";
import { useReactToPrint } from "react-to-print";
import {AiOutlineLike} from "react-icons/ai"
import { MyContext } from "../../../App";
import { CircularProgress } from "@mui/material";




export default function PendingMissions() {

  const { missions ,updateMission,sendToArchives, currentUser, loading} = useContext(MyContext);

  const componentToPrint = useRef();

  let [dataPenMission,setData]=useState([]);

  let[render,setRender]=useState(false);



 useEffect(()=>{
  if(missions[0]){
    let temp=missions.filter((mission)=>mission.status==="ממתין לאישור")
    setData(temp);
    
  }
},[missions])


  const handlePrintEx = useReactToPrint({
    content: () => componentToPrint.current,
  });


  const aprrove=(id)=>{
     
let tempMission=missions.find((mission)=>{
 return mission._id==id
})
    if (confirm("אתה רוצה לאשר?")) {
      // toast('👍 המשימה אושרה בהצלחה ', {
      //   position: "bottom-right",
      //   autoClose: 5000,
      //   hideProgressBar: false,
      //   closeOnClick: true,
      //   pauseOnHover: true,
      //   draggable: true,
      //   progress: undefined,
      //   theme: "light",
      //   });
       
      tempMission.status="בוצע"
      updateMission(tempMission,currentUser.token)
       sendToArchives(tempMission._id,currentUser.token)
     setRender(!render);
        
    }
  }

  const sortMsgByCommand = (mission)=>{
    let messages = mission.chat.messages.msg.split('\n');
    messages = messages.reverse();
    let noteCommand = '---';
    messages.map((msg, i)=>{
      if((mission.responsibility.find((resp)=> resp !== msg.split('}')[0].slice(1)))){
        noteCommand = msg.split('}')[1];
      }
    })
    return noteCommand;
  }

  const sortMsgByUser = (mission)=>{
    let messages = mission.chat.messages.msg.split('\n');
    messages = messages.reverse();
    let noteResponsibility = '---';
    messages.map((msg, i)=>{
      if((mission.responsibility.find((resp)=> resp === msg.split('}')[0].slice(1)))){
        noteResponsibility = msg.split('}')[1];
      }
    })
    return noteResponsibility;
  }


    return (
      <>
       {!loading ? ( <div  className="container-fluid  mb-2">

          <div ref={componentToPrint}>
          <div className="d-flex justify-content-between mt-4">
            <div className="d-flex  ">
              <h4 >משימות בהמתנה לאישור</h4>
               </div>
             <div className="d-flex h-100 align-items-center" >
          <p className="numOfExMission m-2">סה"כ משימות בהמתנה לאישור:  {dataPenMission.length} </p>
         <button onClick={handlePrintEx} className="btn   bg-secondary text-light  m-3"><LocalPrintshopRoundedIcon/>  הדפסה</button>
        </div>
         
        
          </div>
          
          <div className="container  table-container-pen all_table-Ex  ml-3">
            <span>
              <div className=" d-flex justify-content-center sticky-top">
                <div className="col-1 top_table-pen text-center">
                  מס"ד <span title="מיין לפי גדול/קטן"></span>
                </div>
                   <div className="col-1 top_table-pen text-center">
            מועד משימה<span title="מיין לפי גדול/קטן"></span>
                </div> 
                <div className="col-1 top_table-pen text-center">
                  אחריות<span title="מיין לפי גדול/קטן"></span>
                </div>
                <div className="col-1 top_table-pen text-center">
                  כותרת הפגישה <span title="מיין לפי גדול/קטן"></span>
                </div>
                <div className="col-2 top_table-pen text-center">
                  פירוט הפגישה <span title="מיין לפי גדול/קטן"></span>
                </div>
                <div className="col-1 top_table-pen text-center">
                  תג"ב<span title="מיין לפי גדול/קטן"></span>
                </div>
                {/* <div className="col-1 top_table-pen text-center">
                  ימי חריגה<span title="מיין לפי גדול/קטן"></span>
                </div> */}
                <div className="col-2 top_table-pen text-center">
                  הערות אחראי<span title="מיין לפי גדול/קטן"></span>
                </div>
                <div className="col-2 top_table-pen text-center">
                  הערות מפקד<span title="מיין לפי גדול/קטן"></span>
                </div>
                <div className="col-1 top_table-pen text-center">
                אישור<span title="מיין לפי גדול/קטן"></span>
                </div>
              </div>
            </span>
            {
           dataPenMission[0] ?
           dataPenMission.map((mission, i)  =>
                    ( 
                      <div
                       key={mission.id}
                        className="container-fluid pen-mission-row d-flex justify-content-center p-0"
                      >
                        <div className="col-1 the_table-pen text-center">
                          {mission.missionId}
                        </div>
                        <div className="col-1 the_table-pen text-center">
                          {mission.startedAt}
                        </div>
                        <div className="col-1 flex-column the_table-pen text-center">
                        <div className={` p_taskdetail-pen w-100 py-1 ${ mission.responsibility.length < 3
                        ? "d-flex align-items-center flex-column   justify-content-center"
                        : ""}`}   >
                      {mission.responsibility?.map((name, i) =>{return <div style={{fontSize:"0.9rem"}}>{!(i == mission.responsibility.length -1) ? name + ',' : name + '.'}</div>})}
                    </div>
                        </div>
                        <div className="col-1 the_table-pen text-center">
                          {mission.title}
                        </div>
                        <div className="col-2 the_table-pen text-center align-missions-center">
                          <p className={`p_taskdetail-pen p-2 ${mission.details.length<40?"d-flex align-items-center":""}` }>
                            {mission.details}
                          </p>
                        </div>
                        <div className="col-1 the_table-pen  text-center">
                          {mission.endedAt}
                        </div>
                       
                        <div className="col-2 the_table-pen  text-center align-missions-center ">
                        <p className={`p_taskdetail-pen p-2 ${sortMsgByUser(mission)?.length< 40 ? "d-flex align-items-center" : ""}`}>
                            {sortMsgByUser(mission)}
                          </p>
                        </div>
                        <div className="col-2 the_table-pen  text-center  align-missions-center">
                        <p className={`p_taskdetail-pen p-2 ${sortMsgByCommand(mission)?.length< 40 ? "d-flex align-items-center" : ""}`}>
                            {sortMsgByCommand(mission)}
                          </p>
                        </div>
                        <div className="col-1  the_table-pen text-center">
                         <button onClick={()=>aprrove(mission._id)} style={{background:"none",border:"none"}}>
                          <AiOutlineLike size={25}/>
                          </button> 
                        </div>
                      </div>
                    )
              )
              
            : <div className="col-12  the_table-pen d-flex  text-center  align-missions-center">
              <h2 >אין משימות בהמתנה לאישור כרגע</h2></div>}
          </div>
 
        </div>
       
        </div>):(
            <div className="container">
            <div className="d-flex justify-content-center align-items-center my-5">
            <CircularProgress />
          </div>
          </div>
        )}
      </>
    );
  
  
}

