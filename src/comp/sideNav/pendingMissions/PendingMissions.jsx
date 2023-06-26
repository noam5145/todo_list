
import LocalPrintshopRoundedIcon from "@mui/icons-material/LocalPrintshopRounded";
import React, { useContext, useEffect, useRef, useState } from "react";
import "./pendingMissions.css";
import { useReactToPrint } from "react-to-print";
import { MyContext } from "../../../App";



export default function PendingMissions() {

  const { missions ,updateMission, currentUser} = useContext(MyContext);
  const componentToPrint = useRef();
  let [dataPenMission,setData]=useState([]);



 useEffect(()=>{
   let temp=missions.map((mission)=>{
   return mission.status=="ממתין לאישור" ?mission:""
})
setData(temp.filter((item)=>item!=""));
},[missions])


  const handlePrintEx = useReactToPrint({
    content: () => componentToPrint.current,
  });


  const aprrove=(id)=>{
     
let tempMission=missions.filter((mission)=>{
 return mission._id==id
})
tempMission[0].status="בוצע"
    if (confirm("אתה רוצה לאשר?")) {
        updateMission(tempMission[0],currentUser.token)
    }
  }

  if (missions) {
    return (
      <>
        <div  className="container  mb-2">
          <div >
            <div className=" justify-content-end d-flex   text-light ">
              <button
                className="btn   bg-secondary text-light mx-3"
                onClick={handlePrintEx}
              >
                <LocalPrintshopRoundedIcon sx={{ fontSize: 50 }} />
              </button>
            </div>
          </div>
          <div ref={componentToPrint}>
          <div className="d-flex justify-content-between mx-5">
            <div className="p-title-pen-div">
              <h2 className="p-title-pen">משימות בהמתנה לאישור</h2>
              <h2 className="p-title-pen"></h2>
            </div>

            <span></span>
          </div>
          <div className="container  table-container-pen all_table-Ex  ml-3">
            <span>
              <div className=" d-flex justify-content-center sticky-top">
                <div className="col-1 top_table-pen text-center">
                  מסד <span title="מיין לפי גדול/קטן"></span>
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
           dataPenMission.length != 0 ?
           dataPenMission.map((mission, i)  =>
                    (
                      <div
                        key={i}
                        className="container-fluid d-flex justify-content-center p-0"
                      >
                        <div className="col-1 the_table-pen text-center">
                          {mission.missionId}
                        </div>
                        <div className="col-1 the_table-pen text-center">
                          {mission.startedAt}
                        </div>
                        <div className="col-1 flex-column the_table-pen text-center">
                        <p className="p_taskdetail-pen p-2 ">
                      {mission.responsibility?.map((name, i) =>{return <div style={{fontSize:"0.9rem"}}>{!(i == mission.responsibility.length -1) ? name + ',' : name + '.'}</div>})}
                    </p>
                        </div>
                        <div className="col-1 the_table-pen text-center">
                          {mission.title}
                        </div>
                        <div className="col-2 the_table-pen text-center align-missions-center">
                          <p className="p_taskdetail-pen p-2 ">
                            {mission.details}
                          </p>
                        </div>
                        <div className="col-1 the_table-pen  text-center">
                          {mission.endedAt}
                        </div>
                       
                        <div className="col-2 the_table-pen  text-center align-missions-center ">
                          <p className="p_taskdetail-pen p-2 ">
                            {mission.noteResponsibility}
                          </p>
                        </div>
                        <div className="col-2 the_table-pen  text-center  align-missions-center">
                          <p className="p_taskdetail-pen p-2 ">
                            {mission.noteCommand}
                          </p>
                        </div>
                        <div className="col-1 the_table-pen text-center">
                         <button onClick={()=>aprrove(mission._id)} style={{background:"none",border:"none"}}>👍</button> 
                        </div>
                      </div>
                    )
              )
              
            : <div className="col-12 the_table-pen d-flex  text-center  align-missions-center">
              <h2 >אין משימות בהמתנה לאישור כרגע</h2></div>}
          </div>
 <div>
          <h2 className="numOfExMission">סה"כ משימות בהמתנה לאישור:  {dataPenMission.length} </h2>
        </div>
        </div>
       
        </div>
      </>
    );
  }
   else {
    return (
      <div className="col-12 d-flex justify-content-center mt-5 ">
       <h1 className="loader-pen-table"> </h1>
    </div>
    );
  }
}

