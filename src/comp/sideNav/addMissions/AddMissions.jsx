import React, { useContext, useRef, useState ,useEffect} from "react";
import './addMissions.css'
import { Link } from "react-router-dom";
import { MyContext } from "../../../App";
import Select from "react-select";

export default function AddMissions({editSingleMission}) {
  
  let [displayErrorNote, setDisplayErrorNote] = useState(false);
  let [displayErrorMeetingTitle, setDisplayErrorMeetingTitle] = useState(false);
  let [displayErrorTaskDetails,setDisplayErrorTaskDetails]=useState(false)
  let [displayErrorMeetingDate, setdisplayErrorMeetingDate] = useState(false);
  let [displayErrorResponsibility, setDisplayErrorResponsibility] = useState(false);
  let [displayErrorExecutionCompletionDate, setDisplayErrorExecutionCompletionDate] = useState(false);
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
  const [userSelect, setUserSelected] = useState();

  useEffect(()=>{
    if(users[0]){
      let arr = [];
      users.map((e, i)=>{
        arr[i] = users[i].username;
      })
      setNames(arr);
    }
  }, [users]);

  const setUserSelect = (username)=>{
    let user = users.find((e)=> e.username === username);
    setUserSelected(user.token);
  }

  let errorNote = (
    <h5 className="text-danger pb-3 pt-3 font-weight-bold">
      ודא שהפרטים שהזנת נכונים
    </h5>
  );

  let sendigTask = () => {
    const date1 = new Date(meetingDate.current.value);
    const date2 = new Date(executionCompletionDate.current.value);
    const diffTime = (date2 - date1);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
    
    let max = 0;
    missions.map((mission, i)=>{
      if(Number(mission.missionId) > max){
        max = Number(mission.missionId);
      }
    })
    let newTask = {
      missionId: String(max + 1), 
      status: "בתהליך",
      title: meetingTitle.current.value,
      startedAt: meetingDate.current.value,
      details: taskDetails.current.value,
      responsibility: responsibility.current.value,
      endedAt: executionCompletionDate.current.value,
      daysLeft: diffDays,
      noteCommander: noteCommander.current.value,
      // fileMission: fileMission.current.files[0],
      token: userSelect,
    };
    if (
      newTask.title != "" &&
      newTask.startedAt != "" &&
      newTask.details != "" &&
      newTask.responsibility != "בחר" &&
      newTask.endedAt != "" &&
      newTask.daysLeft >= 0
      
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
        setDisplayErrorResponsibility(true)
      }
      if(newTask.endedAt == ""){
        setDisplayErrorExecutionCompletionDate(true)
      }
      if(newTask.daysLeft <0){
        setDisplayErrorExecutionCompletionDate(true)
        setdisplayErrorMeetingDate(true)

      }
      setDisplayErrorNote(true);
    }
  };

  // console.log(editSingleMission);

  return (
    <div dir="rtl" className="container-fluid bg-light  d-flex h_page align-items-center">
      <div
        className={displaySuccess ? "container d-block" : "container d-none"}
      >
        <div className="row d-flex justify-content-around">
          <h2 className="text-center mb-5">המשימה נשלחה בהצלחה!</h2>
          <div className="d-flex row justify-content-between col-10">
            <Link className=" col-5" to={"/taskList"}>
              <button className="btn btn-outline-info ps-5 pe-5">מאגר משימות</button>
            </Link>
            <button
              onClick={() => {
                setDisplaySuccess(false);
              }}
              className="btn btn-outline-dark col-5"
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
              {!editSingleMission ?
              <input
                id="meetingTitle"
                ref={meetingTitle}
                type="text"
                placeholder="כותרת פגישה"
                className={displayErrorMeetingTitle ? "form-control bg-light" : "form-control bg-light "}
              />:
              <input
                id="meetingTitle"
                ref={meetingTitle}
                type="text"
                placeholder={editSingleMission.title}
                className={displayErrorMeetingTitle ? "form-control bg-light" : "form-control bg-light "}
              />}
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
              <select onChange={(e)=> setUserSelect(e.target.value)} ref={responsibility} className="form-select bg-light">
                <option >בחר</option>
                {usersNames.map((user,i)=>(
                  <option key={i} >{user}</option>
                ))}
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