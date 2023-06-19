import React, { useContext, useRef, useState ,useEffect} from "react";
import './addMissions.css'
import { Link } from "react-router-dom";
import { MyContext } from "../../../App";
import Select from "react-select";

export default function AddMissions() {
  
  let [displayErrorNote, setDisplayErrorNote] = useState(false);
  let [displayErrorMeetingTitle, setDisplayErrorMeetingTitle] = useState(false);
  let [displayErrorTaskDetails,setDisplayErrorTaskDetails]=useState(false)
  let [displayErrorMeetingDate, setdisplayErrorMeetingDate] = useState(false);
  let [displayErrorResponsibility, setDisplayErrorResponsibility] = useState(false);
  let [displayErrorExecutionCompletionDate, setDisplayErrorExecutionCompletionDate] = useState(false);
  let [displayErrorDomin, setDisplayErrorDomin] = useState(false);
  let [displayErrorDesign, setDisplayErrorDesign] = useState(false);
  let [displaySuccess, setDisplaySuccess] = useState(false);
  let meetingTitle = useRef();
  let meetingDate = useRef();
  let taskDetails = useRef();
  let responsibility = useRef();
  let executionCompletionDate = useRef();
  let domain = useRef();
  let noteCommander = useRef();
  let fileMission = useRef();
  const { currentUser, newMission, missions, users } = useContext(MyContext);
  const [usersNames, setNames] = useState([]);

  useEffect(()=>{
    if(users[0]){
      let arr = [];
      users.map((e, i)=>{
        arr[i] = users[i].username;
      })
      setNames(arr);
    }
  }, [users])

  let errorNote = (
    <h5 className="text-danger pb-3 pt-3 font-weight-bold">
      מלאו את כל הפרטים המסומנים ב *
    </h5>
  );

  let sendigTask = () => {
    const date1 = new Date(meetingDate.current.value);
    const date2 = new Date(executionCompletionDate.current.value);
    const diffTime = Math.abs(date2 - date1);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
    
    let max = 0;
    missions.map((mission, i)=>{
      console.log(mission.missionId);
      if(Number(mission.missionsId) > max){
        max = mission.missionsId;
      }
    })
    let newTask = {
      missionId: max + 1, 
      status: "בתהליך",
      title: meetingTitle.current.value,
      startedAt: meetingDate.current.value,
      details: taskDetails.current.value,
      responsibility: responsibility.current.value,
      endedAt: executionCompletionDate.current.value,
      daysLeft: diffDays,
      noteCommander: noteCommander.current.value,
      fileMission: fileMission.current.files[0],
      token: currentUser?.token,
    };
    if (
      newTask.title != "" &&
      newTask.startedAt != "" &&
      newTask.details != "" &&
      newTask.responsibility != "בחר" &&
      newTask.endedAt != "" &&
      newTask.domain != "בחר"
    ) {
      setDisplayErrorNote(false);
      setDisplayErrorDesign(false);
      setDisplaySuccess(true);
      newMission(newTask);
    } else {
      if (newTask.title == "") {
        setDisplayErrorMeetingTitle(true)
      }if(newTask.startedAt == ""){
        setdisplayErrorMeetingDate(true)
      }if(newTask.details == ""){
        setDisplayErrorTaskDetails(true)
      }if(newTask.responsibility == "בחר" ){
        setDisplayErrorResponsibility
      }
      if(newTask.endedAt == ""){
        setDisplayErrorExecutionCompletionDate(true)
      }
      if(newTask.domain == "בחר"){
        setDisplayErrorDomin(true)
      }
      setDisplayErrorNote(true);
    }
  };

  return (
    <div dir="rtl" className="container-fluid bg-light  d-flex h_page align-items-center">
      <div
        className={displaySuccess ? "container d-block" : "container d-none"}
      >
        <div className="row d-flex justify-content-around">
          <h2 className="text-center">המשימה נשלחה בהצלחה!</h2>
          <div className="d-flex row justify-content-around col-sm-10 col-lg-4 pt-5 pb-5">
            <Link className=" col-lg-3 col-sm-4 ms-2" to={"/dashboard"}>
              <button className="btn btn-outline-info">דשבורד משימות</button>
            </Link>
            <button
              onClick={() => {
                setDisplaySuccess(false);
              }}
              className="btn btn-outline-dark col-sm-4 col-lg-3 me-2"
            >
              הוסף משימה     
            </button>
          </div>
        </div>
      </div>
      <div
        className={displaySuccess ? "container d-none" : "container d-block"}
      >
        <h2 className=" pb-5">הוספת משימות</h2>
        <div className="bg-white pt-5 pb-5 ">
          <ul className="d-flex row">
            
            <li className="col-lg-8 col-sm-6 list-unstyled ">
              <label htmlFor="meetingTitle">
                כותרת הפגישה{" "}
                <span
                  className={displayErrorMeetingTitle ? "text-danger" : "text-dark"}
                >
                  *
                </span>
              </label>
              <input
                id="meetingTitle"
                ref={meetingTitle}
                type="text"
                placeholder="כותרת פגישה"
                className={displayErrorMeetingTitle ? "form-control bg-light" : "form-control bg-light "}
              ></input>
            </li>
            <li className="col-lg-4 col-sm-6 list-unstyled mb-lg-5 mb-sm-4">
              <label htmlFor="meetingDate">
                מועד הפגישה{" "}
                <span
                  className={displayErrorMeetingDate ? "text-danger" : "text-dark"}
                >
                  *
                </span>
              </label>
              <input
                id="meetingDate"
                ref={meetingDate}
                type="date"
                placeholder="מועד הפגישה"
                className="form-control bg-light"
              ></input>
            </li>
            <li className="col-lg-8 list-unstyled col-sm-12  mb-lg-5 mb-sm-4 ">
              <label htmlFor="taskDetails">
                פירוט המשימה{" "}
                <span
                  className={displayErrorTaskDetails ? "text-danger" : "text-dark"}
                >
                  *
                </span>
              </label>
              <textarea
                ref={taskDetails}
                className="form-control bg-light"
                id="taskDetails"
                rows="1"
              ></textarea>
            </li>
            <li className="col-lg-4 list-unstyled col-sm-6  mb-lg-5 mb-sm-4">
              <label htmlFor="executionCompletionDate">
                תאריך גמר ביצוע{" "}
                <span
                  className={displayErrorExecutionCompletionDate ? "text-danger" : "text-dark"}
                >
                  *
                </span>
              </label>
              <input
                id="meetingDate"
                ref={executionCompletionDate}
                type="date"
                className="form-control bg-light"
              ></input>
            </li>

            <li className="col-lg-6 list-unstyled col-sm-6  mb-lg-5 mb-sm-4">
              <label htmlFor="responsibility">
                אחריות{" "}
                <span
                  className={displayErrorResponsibility ? "text-danger" : "text-dark"}
                >
                  *
                </span>
              </label>
              <select  ref={responsibility} className="form-select bg-light">
                <option >בחר</option>
                {usersNames.map((user)=>(
                  <option>{user}</option>
                ))}
                <option >תו"ל ותפיסות</option>
              </select>
            </li>
            
            <li className="col-lg-6 list-unstyled col-sm-12  mb-lg-5 mb-sm-4">
              <label htmlFor="domain">תחום  <span
                  className={displayErrorDomin ? "text-danger" : "text-dark"}
                >
                  *
                </span></label>
                
              <select  ref={domain} className="form-select bg-light">
                <option >בחר</option>
                <option >תו"ל ותפיסות</option>
                <option >הכשרות ואימונים</option>
                <option >אנשים</option>
                <option >ארגון</option>
                <option >אמל"ח</option>
                <option >לו"ז</option>
                <option >מבצעי</option>
              </select>
            </li>
            <li className="col-lg-6 list-unstyled col-sm-12  mb-lg-5 mb-sm-4">
              <label htmlFor="noteCommander">הערות מפקד</label>
              <textarea
                ref={noteCommander}
                className="form-control bg-light"
                id="noteCommander"
                rows="1"
              ></textarea>
            </li>
            <li className="col-lg-6 list-unstyled col-sm-12  mb-lg-5 mb-sm-4">
              <label htmlFor="fileMission"></label>
              <input className="form-control" type="file" id="fileMission" ref={fileMission}></input>
            </li>
          </ul>
          
          <div className="row me-5">
            {displayErrorNote ? errorNote : ""}
            <button
              onClick={sendigTask}
              className="btn btn-light col-lg-10 col-sm-2 col-4  btn-outline-dark"
            >
              שמירה
            </button>
          </div>
        </div>
      </div>
      
    </div>
  );
            }