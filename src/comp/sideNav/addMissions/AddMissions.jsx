import React, { useContext, useRef, useState, useEffect } from "react";
import './addMissions.css'
import { MyContext } from "../../../App";
import DriveFileMoveSharpIcon from '@mui/icons-material/DriveFileMoveSharp';
import { Checkbox, FormControl, ListItemText, MenuItem, Select } from "@mui/material";


const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};


export default function AddMissions({ editSingleMission, closeDialog }) {

  const { currentUser, newMission, updateMission, missions, users } = useContext(MyContext);
  let [displayErrorNote, setDisplayErrorNote] = useState(false);
  let [displayErrorMeetingTitle, setDisplayErrorMeetingTitle] = useState(false);
  let [displayErrorTaskDetails, setDisplayErrorTaskDetails] = useState(false)
  let [displayErrorMeetingDate, setdisplayErrorMeetingDate] = useState(false);
  let [displayErrorResponsibility, setDisplayErrorResponsibility] = useState(false);
  let [displayErrorExecutionCompletionDate, setDisplayErrorExecutionCompletionDate] = useState(false);
  let [displayErrorDesign, setDisplayErrorDesign] = useState(false);
  let [displaySecondTask, setDisplaySecondTask] = useState(false);
  let meetingTitle = useRef();
  let meetingDate = useRef();
  let taskDetails = useRef();
  let responsibility = useRef();
  let executionCompletionDate = useRef();
  let domain = useRef();
  let noteCommander = useRef();
  let fileMission = useRef();
  // const [usersNames, setNames] = useState([]);
  const [userSelect, setUserSelected] = useState([]);
  const [filess, setfiles] = useState([]);
  const [checksIfFile, setChecksIfFile] = useState(false);
  const [personNames, setPersonNames] = useState(editSingleMission ? [...editSingleMission.responsibility]:[]);

  let newTask = () => {
    sendigTask();
    setDisplaySecondTask(true)
    meetingTitle.current.value = "";
    meetingDate.current.value = "";
    taskDetails.current.value = "";
    responsibility.current.value = "";
    executionCompletionDate.current.value = "";
    noteCommander.current.value = "";

    // fileMission.current.files[0] = ""
  }

  const setUserSelect = (usernames) => {
    setPersonNames(usernames)
    for (let i = 0; i < usernames.length; i++) {
      for (let j = 0; j < users.length; j++) {
        if (usernames[i] === users[j].username) {
          setUserSelected([...userSelect, users[j].token]);
        }
      }
    }
  }

  let errorNote = (
    <h5 className="text-danger mb-2 font-weight-bold">
      ודא שהפרטים שהזנת נכונים
    </h5>
  );

  let sendigTask = () => {
    console.log("sendigTask");
   setChecksIfFile(false)
    const date1 = new Date(meetingDate.current.value);
    const date2 = new Date(executionCompletionDate.current.value);
    const diffTime = (date2 - date1);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    let max = 0;
    missions.map((mission, i) => {
      if (Number(mission.missionId) > max) {
        max = Number(mission.missionId);
      }
    })
    let t = new Date();
    t = t.getDate() + '/' + (t.getMonth() + 1) + '/' + t.getFullYear();
    let newTask = {
      missionId: String(max + 1),
      status: "בתהליך",
      title: meetingTitle?.current?.value,
      startedAt: meetingDate?.current?.value,
      details: taskDetails?.current?.value,
      responsibility: personNames,
      endedAt: executionCompletionDate?.current?.value,
      daysLeft: diffDays,
      chat:{ messages: {
        noteCommander: {msg: noteCommander.current?.value? noteCommander.current.value : '', readed: false, time: t},
        noteResponsibility : {msg:'', readed: false, time: ''}
      }},
      // fileMission: fileMission?.current?.files[0],
      token: userSelect,
    };
    if (
      newTask.title != "" &&
      newTask.startedAt != "" &&
      newTask.details != "" &&
      newTask.responsibility != "" &&
      newTask.endedAt != "" &&
      newTask.daysLeft >= 0

    ) {
      setDisplayErrorNote(false);
      setDisplayErrorDesign(false);
      newMission(newTask);
      // closeDialog()
    } else {
      if (newTask.title == "") {
        setDisplayErrorMeetingTitle(true)
      } else (setDisplayErrorMeetingTitle(false))
      if (newTask.startedAt == "") {
        setdisplayErrorMeetingDate(true)
      } else (setdisplayErrorMeetingDate(false))
      if (newTask.details == "") {
        setDisplayErrorTaskDetails(true)
      } else (setDisplayErrorTaskDetails(false))
      if (newTask.responsibility == "בחר") {
        setDisplayErrorResponsibility(true)
      } else (setDisplayErrorResponsibility(false))
      if (newTask.endedAt == "") {
        setDisplayErrorExecutionCompletionDate(true)
      } else (setDisplayErrorExecutionCompletionDate(false))
      if (newTask.daysLeft < 0) {
        setDisplayErrorExecutionCompletionDate(true)
        setdisplayErrorMeetingDate(true)
      } else (
        setDisplayErrorExecutionCompletionDate(false),
        setdisplayErrorMeetingDate(false))
      setDisplayErrorNote(true);
    }
  };

  // console.log(editSingleMission);

  const editTask = () => {
    console.log("edit");
    setChecksIfFile(false)
    const date1 = new Date(meetingDate.current.value);
    const date2 = new Date(executionCompletionDate.current.value);
    const diffTime = (date2 - date1);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    let newEditTask = {

      missionId: editSingleMission.missionId,

      status: "בתהליך",
      title: meetingTitle?.current?.value,
      startedAt: meetingDate.current?.value,
      details: taskDetails?.current?.value,
      responsibility: personNames,
      endedAt: executionCompletionDate.current?.value,
      daysLeft: String(diffDays),

      chat: editSingleMission.chat,
      // fileMission: fileMission?.current?.files[0],
      token: editSingleMission.token,
      _id: editSingleMission._id,
      __v: editSingleMission.__v,

    };
    console.log(newEditTask);
    console.log(editSingleMission);

    if (
      newEditTask.title != "" &&
      newEditTask.startedAt != "" &&
      newEditTask.details != "" &&
      newEditTask.responsibility != "" &&
      newEditTask.endedAt != "" &&
      newEditTask.daysLeft >= 0

    ) {
      setDisplayErrorNote(false);
      setDisplayErrorDesign(false);
      updateMission(newEditTask, currentUser.token);
      // closeDialog();

    } else {
      if (newEditTask.title == "") {
        setDisplayErrorMeetingTitle(true)
      } else (setDisplayErrorMeetingTitle(false))
      if (newEditTask.startedAt == "") {
        setdisplayErrorMeetingDate(true)
      } else (setdisplayErrorMeetingDate(false))
      if (newEditTask.details == "") {
        setDisplayErrorTaskDetails(true)
      } else (setDisplayErrorTaskDetails(false))
      if (newEditTask.responsibility == "בחר") {
        setDisplayErrorResponsibility(true)
      } else (setDisplayErrorResponsibility(false))
      if (newEditTask.endedAt == "") {
        setDisplayErrorExecutionCompletionDate(true)
      } else (setDisplayErrorExecutionCompletionDate(false))
      if (newEditTask.daysLeft < 0) {
        setDisplayErrorExecutionCompletionDate(true)
        setdisplayErrorMeetingDate(true)
      } else (
        setDisplayErrorExecutionCompletionDate(false),
        setdisplayErrorMeetingDate(false))
      setDisplayErrorNote(true);
    }
  }

  const handleChange = (e) => {
    setChecksIfFile(true)
    const file = fileMission.current.files[0];
    setfiles([...filess,file]);
  };

  return (
    <div dir="rtl" className="container d-flex">
      <div className="bg-white mx-5 my-5">
        <h2 >הוספת משימות</h2>
        {!editSingleMission ?
          <ul className="d-flex row">
            <li className="col-lg-6 col-sm-6 list-unstyled ">
              <label htmlFor="meetingTitle">
                כותרת הפגישה{" "}
                <span className={displayErrorMeetingTitle ? "text-danger" : "text-dark"} > *
                </span>
              </label>
              <input
                id="meetingTitle" ref={meetingTitle} type="text" placeholder="כותרת פגישה"
                className={displayErrorMeetingTitle ? "form-control bg-light" : "form-control bg-light "} />
            </li>
            <li className="col-lg-6 col-sm-6 list-unstyled mb-4 ">
              <label htmlFor="meetingDate">
                מועד הפגישה{" "}
                <span
                  className={displayErrorMeetingDate ? "text-danger" : "text-dark"}>
                  *
                </span>
              </label>
              <input
                dir="ltr"
                id="meetingDate"
                ref={meetingDate}
                type="date"
                placeholder="מועד המשימה"
                className="form-control bg-light"
              />
            </li>
            <li className="col-lg-6 list-unstyled col-sm-12  mb-lg-4 ">
              <label htmlFor="taskDetails">  פירוט המשימה
                <span
                  className={displayErrorTaskDetails ? "text-danger" : "text-dark"}>  *
                </span>
              </label>
              <textarea
                ref={taskDetails}
                className="form-control bg-light"
                id="taskDetails"
                rows="1"
              ></textarea>
            </li>
            <li className="col-lg-6 list-unstyled col-sm-6  mb-lg-4">
              <label htmlFor="executionCompletionDate">
                תאריך גמר ביצוע
                <span
                  className={displayErrorExecutionCompletionDate ? "text-danger" : "text-dark"} >  *
                </span>
              </label>
              <input
                id="meetingDate"
                ref={executionCompletionDate}
                type="date"
                className="form-control bg-light"
              ></input>
            </li>
            <li className="col-lg-6 list-unstyled col-sm-6  mb-4">
              <div>
                <label htmlFor="responsibility">
                  אחריות{" "}
                  <span
                    className={displayErrorResponsibility ? "text-danger" : "text-dark"} > *
                  </span>
                </label>
                <FormControl className="momo" sx={{ width: 193, height: 40, border: 'none' }} ref={responsibility}>
                  <Select
                    className="border bg-light"
                    sx={{
                      height: 38,
                      '& .MuiOutlinedInput-notchedOutline': { border: 'none', },
                      '& .MuiInputLabel-outlined': { transform: 'translate(14px, 12px) scale(1)', },
                    }}
                    labelId="demo-multiple-checkbox-label"
                    id="demo-multiple-checkbox"
                    multiple
                    value={personNames}
                    onChange={(e) => setUserSelect(e.target.value)}
                    renderValue={(selected) => selected.join(', ')}
                    MenuProps={MenuProps}
                  >
                    {users.map((item, i) => (
                      <MenuItem dir="rtl" key={i} value={item.username}>
                        <Checkbox checked={personNames.indexOf(item.username) > -1} />
                        <div>
                          <ListItemText primary={item.username} />
                        </div>
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>
            </li>
            <li className="col-6 list-unstyled   mb-4">
              <label htmlFor="noteCommander">הערות מפקד</label>
              <textarea
                ref={noteCommander}
                className="form-control bg-light"
                id="noteCommander"
                rows="1"
              ></textarea>
            </li>
            <li className="col-12 list-unstyled d-flex justify-content-center">
              <div className="hide_file_container"  style={{ border: checksIfFile ? "solid 3px black" : "dashed 3px black",}}>
                בחר קובץ להעלאה - לחץ כאן <DriveFileMoveSharpIcon className="mx-2" />
                <input className="form-control hide_file" type="file" ref={fileMission} onChange={handleChange} />
              </div>
            </li>
          </ul>
          :
          <ul className="d-flex row">
            <li className="col-lg-6 col-sm-6 list-unstyled ">
              <label htmlFor="meetingTitle">
                כותרת הפגישה{" "}
                <span
                  className={displayErrorMeetingTitle ? "text-danger" : "text-dark"}
                > *
                </span>
              </label>
              <input
                id="meetingTitle"
                ref={meetingTitle}
                type="text"
                placeholder="כותרת פגישה"
                defaultValue={editSingleMission.title}
                className={displayErrorMeetingTitle ? "form-control bg-light" : "form-control bg-light "}
              />
            </li>
            <li className="col-lg-6 col-sm-6 list-unstyled mb-4 ">
              <label htmlFor="meetingDate">
                מועד הפגישה{" "}
                <span
                  className={displayErrorMeetingDate ? "text-danger" : "text-dark"}
                > *
                </span>
              </label>
              <input
                id="meetingDate"
                ref={meetingDate}
                type="date"
                placeholder="מועד הפגישה"
                defaultValue={editSingleMission.startedAt}
                className="form-control bg-light"

              />
            </li>
            <li className="col-lg-6 list-unstyled col-sm-12  mb-lg-4 ">
              <label htmlFor="taskDetails">
                פירוט המשימה{" "}
                <span
                  className={displayErrorTaskDetails ? "text-danger" : "text-dark"}
                > *
                </span>
              </label>
              <textarea
                ref={taskDetails}
                className="form-control bg-light"
                defaultValue={editSingleMission.details}
                id="taskDetails"
                rows="1"
              ></textarea>
            </li>
            <li className="col-lg-6 list-unstyled col-sm-6  mb-lg-4">
              <label htmlFor="executionCompletionDate">
                תאריך גמר ביצוע{" "}
                <span
                  className={displayErrorExecutionCompletionDate ? "text-danger" : "text-dark"}
                > *
                </span>
              </label>
              <input
                id="meetingDate"
                ref={executionCompletionDate}
                type="date"
                defaultValue={editSingleMission.endedAt}
                className="form-control bg-light"
              />
            </li>
            <li className="col-lg-6 list-unstyled col-sm-6  mb-4">
              <div>
                <label htmlFor="responsibility">
                  אחריות{" "}
                  <span
                    className={displayErrorResponsibility ? "text-danger" : "text-dark"} > *
                  </span>
                </label>
                <FormControl className="momo" sx={{ width: 193, height: 40, border: 'none' }} ref={responsibility}>
                  <Select
                    className="border bg-light"
                    sx={{
                      height: 38,
                      '& .MuiOutlinedInput-notchedOutline': {
                        border: 'none',
                      },
                      '& .MuiInputLabel-outlined': {
                        transform: 'translate(14px, 12px) scale(1)',
                      },
                    }}
                    labelId="demo-multiple-checkbox-label"
                    id="demo-multiple-checkbox"
                    multiple
                    value={personNames}
                    onChange={(e) => setUserSelect(e.target.value)}
                    renderValue={(selected) => selected.join(', ')}
                    MenuProps={MenuProps}
                  >
                    {users.map((item, i) => (
                      <MenuItem dir="rtl" key={i} value={item.username}>
                        <Checkbox checked={personNames.indexOf(item.username) > -1} />
                        <div>
                          <ListItemText primary={item.username} />
                        </div>
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

              </div>
            </li>
            <li className="col-12 list-unstyled d-flex justify-content-center">
              <div className="hide_file_container">
                האם ברצונך להחליף את הקובץ - לחץ כאן <DriveFileMoveSharpIcon className="mx-2" />
                <input className="form-control hide_file" type="file" ref={fileMission}></input>
              </div>
            </li>
          </ul>
        }
        <div className="row  d-flex justify-content-around mx-2">
          {displayErrorNote ? errorNote : ""}
          {!editSingleMission ?
            <button
              onClick={newTask}
              className="btn btn-light  col-4  btn-outline-dark"
            >
              שמור וצור משימה חדשה
            </button> : ""
          }
          <button
            onClick={() => { editSingleMission ? editTask() : sendigTask() }}
            className="btn btn-light  col-4  btn-outline-dark">
            שמירה
          </button>
        </div>
      </div>

    </div>
  );
}

