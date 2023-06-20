// import LayoutMissionExeption from "./LayoutMissionExeption/LayoutMissionExeption";
import LocalPrintshopRoundedIcon from "@mui/icons-material/LocalPrintshopRounded";
import React, { useContext, useEffect, useRef, useState } from "react";
import "./missionExeption.css";
import { useReactToPrint } from "react-to-print";
import { MyContext } from "../../../App";

const MissionExeption = React.forwardRef((props, ref) => {
  const [opemId, setOpemId] = useState(false);
  const { missions } = useContext(MyContext);
  const [exceptionMission, setExceptionMission] = useState(missions);
  const componentToPrint = useRef();
  const [loadingEx, setLoadingEx] = useState(false);

  console.log(missions);

  useEffect(() => {
    window.addEventListener("click", () => {
      setOpemId(false);
    });
    let temp = exceptionMission.filter((item) => {
      daysOff(item.endedAt) > 0;
    });
    setExceptionMission(temp);
    setTimeout(() => {
      setLoadingEx(true);
    }, [2000]);
  }, []);
  const date = new Date();

  function daysOff(endTime) {
    const date1 = new Date();
    const date2 = new Date(endTime);
    const diffTime = date2 - date1;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    return diffDays;
  }
  const handlePrintEx = useReactToPrint({
    content: () => componentToPrint.current,
  });
 
    return (
      <>
        <div ref={componentToPrint} className="container mt-2 mb-2">
          <div style={{ width: "90vw" }}>
            <div className="btn justify-content-end d-flex mt-2  text-light ">
              <button
                className="btn   bg-secondary text-light mx-3"
                onClick={handlePrintEx}
              >
                <LocalPrintshopRoundedIcon sx={{ fontSize: 50 }} />
              </button>
            </div>
          </div>
          <div className="d-flex justify-content-between mx-5">
            <div className="exp-title-ex-div">
              <h2 className="exp-title-ex">דו"ח חריגה</h2>
              <h2 className="exp-title-ex">
              </h2>
            </div>
            <span></span>
          </div>
          <div className="container  table-container-Ex all_table-Ex mt-3 ml-3">
            <span>
              <div className=" d-flex justify-content-center sticky-top">
                <div className="col-1 top_table-Ex text-center">
                  מזהה <span title="מיין לפי גדול/קטן"></span>
                </div>
                <div className="col-1 top_table-Ex text-center">
                  אחריות<span title="מיין לפי גדול/קטן"></span>
                </div>
                <div className="col-1 top_table-Ex text-center">
                  כותרת הפגישה <span title="מיין לפי גדול/קטן"></span>
                </div>
                <div className="col-3 top_table-Ex text-center">
                  פירוט הפגישה <span title="מיין לפי גדול/קטן"></span>
                </div>
                <div className="col-1 top_table-Ex text-center">
                  תג"ב<span title="מיין לפי גדול/קטן"></span>
                </div>
                <div className="col-1 top_table-Ex text-center">
                  ימי חריגה<span title="מיין לפי גדול/קטן"></span>
                </div>
                <div className="col-2 top_table-Ex text-center">
                  הערות אחראי<span title="מיין לפי גדול/קטן"></span>
                </div>
                <div className="col-2 top_table-Ex text-center">
                  הערות מפקד<span title="מיין לפי גדול/קטן"></span>
                </div>
              </div>
            </span>
            {missions.length > 0 ? (
              missions.map((mission, i) => (
                <div
                  key={i}
                  className="container-fluid d-flex justify-content-center p-0"
                >
                  <div className="col-1 the_table-Ex text-center">
                    {mission.missionId}
                  </div>
                  <div className="col-1 the_table-Ex text-center">
                    {mission.responsibility}
                  </div>
                  <div className="col-1 the_table-Ex text-center">
                    {mission.title}
                  </div>
                  <div className="col-3 the_table-Ex text-center align-missions-center">
                    <p className="p_taskdetail-Ex p-2 ">{mission.details}</p>
                  </div>
                  <div className="col-1 the_table-Ex  text-center">
                    {mission.endedAt}
                  </div>
                  <div className="col-1 the_table-Ex text-center ">
                    {daysOff(mission.endedAt)}
                  </div>
                  <div className="col-2 the_table-Ex  text-center align-missions-center ">
                    <p className="p_taskdetail-Ex p-2 ">
                      {mission.noteResponsibility}
                    </p>
                  </div>
                  <div className="col-2 the_table-Ex  text-center  align-missions-center">
                    <p className="p_taskdetail-Ex p-2 ">
                      {mission.noteCommand}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-12 d-flex justify-content-center mt-5 ">
                <h2 style={{ fontSize: "60px" }}> אין משימות בחריגה כעת</h2>
              </div>
            )}
          </div>
        </div>
      </>
    );
  
  
});

export default MissionExeption;
