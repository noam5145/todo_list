import React, { useContext, useRef, useState, useEffect } from "react";
import "./addMissions.css";
import { MyContext } from "../../../App";
import DriveFileMoveSharpIcon from "@mui/icons-material/DriveFileMoveSharp"
import {
  Checkbox,
  Chip,
  FormControl,
  ListItemText,
  MenuItem,
  Select,
  Stack,
} from "@mui/material";
import { BsTrashFill } from "react-icons/bs";
import { CircularProgress } from "@mui/material";

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

export default function AddMissions({
  editSingleMission,
  closeDialog,
  notifyadd,
  notifyedit,
}) {
  const {
    currentUser,
    newMission,
    updateMission,
    missions,
    users,
    loading,
    archive,
  } = useContext(MyContext);
  const [displayErrorNote, setDisplayErrorNote] = useState(false);
  const [displayErrorMeetingTitle, setDisplayErrorMeetingTitle] =
    useState(false);
  const [displayErrorTaskDetails, setDisplayErrorTaskDetails] = useState(false);
  const [displayErrorMeetingDate, setdisplayErrorMeetingDate] = useState(false);
  const [displayErrorResponsibility, setDisplayErrorResponsibility] =
    useState(false);
  const [displayErrorLevelOne, setDisplayErrorLevelOne] = useState(false);
  const [displayErrorLevelTwo, setDisplayErrorLevelTwo] = useState(false);
  const [displayErrorLevelThree, setDisplayErrorLevelTree] = useState(false);
  const [displayErrorLevelFour, setDisplayErrorLevelFour] = useState(false);
  const [
    displayErrorExecutionCompletionDate,
    setDisplayErrorExecutionCompletionDate,
  ] = useState(false);
  const [displayErrorDesign, setDisplayErrorDesign] = useState(false);
  const [displaySecondTask, setDisplaySecondTask] = useState(false);
  const meetingTitle = useRef();
  const meetingDate = useRef();
  const taskDetails = useRef();
  const responsibility = useRef();
  const executionCompletionDate = useRef();
  const noteCommander = useRef();
  const fileMission = useRef();
  const levelOne = useRef();
  const levelTwo = useRef();
  const levelThree = useRef();
  const levelFour = useRef();
  const [userSelect, setUserSelected] = useState([]);
  const [files, setfiles] = useState([]);
  const [checksIfFile, setChecksIfFile] = useState(false);
  const [reversedDate, setReversedDate] = useState({});
  const [personNames, setPersonNames] = useState(
    editSingleMission ? [...editSingleMission.responsibility] : []
  );

  useEffect(() => {
    const newStartedAt = editSingleMission?.startedAt
      ?.split("/")
      .reverse()
      .join("-");
    const newEndedAt = editSingleMission?.endedAt
      ?.split("/")
      .reverse()
      .join("-");

    const newData = {
      startedAt: newStartedAt,
      endedAt: newEndedAt,
    };

    setReversedDate(newData);
  }, []);

  const setUserSelect = (usernames) => {
    for (let i = 0; i < usernames.length; i++) {
      for (let j = 0; j < users.length; j++) {
        if (
          usernames[i] === users[j].username &&
          !userSelect.find((u) => u === users[j].token)
        ) {
          setUserSelected([...userSelect, users[j].token]);
          setPersonNames(usernames);
          break;
        } else if (userSelect.find((u) => u === users[j].token)) {
          setPersonNames(usernames);
          break;
        }
      }
    }
    if (usernames.length == 0) {
      setPersonNames([]);
    }
  };

  const errorNote = (
    <h5 className="text-danger mb-2 font-weight-bold">
      ודא שהפרטים שהזנת נכונים
    </h5>
  );

  const sendigTask = () => {
    setChecksIfFile(false);
    const date1 = new Date(meetingDate.current.value);
    const date2 = new Date(executionCompletionDate.current.value);
    const diffTime = date2 - date1;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    let max = 0;
    missions.map((mission, i) => {
      if (Number(mission.missionId) > max) {
        max = Number(mission.missionId);
      }
    });
    archive.map((mission, i) => {
      if (Number(mission.missionId) > max) {
        max = Number(mission.missionId);
      }
    });
    let t = new Date();
    t =
      t.getDate() +
      "/" +
      (t.getMonth() + 1) +
      "/" +
      t.getFullYear() +
      " " +
      t.getHours() +
      ":" +
      t.getMinutes() +
      "\n";
    let newTask = {
      missionId: String(max + 1),
      status: "בתהליך",
      title: meetingTitle?.current?.value,
      startedAt: meetingDate?.current?.value,
      details: taskDetails?.current?.value,
      responsibility: personNames,
      endedAt: executionCompletionDate?.current?.value,
      daysLeft: diffDays,
      levelOne: levelOne?.current?.value,
      levelTwo: levelTwo?.current?.value,
      levelThree: levelThree?.current?.value,
      levelFour: levelFour?.current?.value,
      chat: {
        messages: {
          msg: noteCommander.current?.value
            ? "{" +
              currentUser.username +
              "} " +
              noteCommander.current?.value +
              "\n"
            : "",
          readed: noteCommander.current?.value ? [false] : [],
          time: noteCommander.current?.value ? t : "",
        },
      },
      // fileMission: fileMission?.current?.files[0],
      token: userSelect,
    };

    if (
      newTask.title != "" &&
      newTask.startedAt != "" &&
      newTask.details != "" &&
      newTask.responsibility != "" &&
      newTask.endedAt != "" &&
      newTask.daysLeft >= 0 &&
      newTask.levelOne != "בחר פיקוד..." &&
      newTask.levelTwo != "בחר..." &&
      newTask.levelThree != "בחר..." &&
      newTask.levelFour != "בחר..."
    ) {
      setDisplayErrorNote(false);
      setDisplayErrorDesign(false);
      newMission(newTask, currentUser.token);
      closeDialog();
      notifyadd();
      setDisplaySecondTask(true);
      meetingTitle.current.value = "";
      meetingDate.current.value = "";
      taskDetails.current.value = "";
      executionCompletionDate.current.value = "";
      if(noteCommander.current && noteCommander.current.value) noteCommander.current.value = "";
      setPersonNames([]);
      setUserSelected([]);
      // fileMission.current.files[0] = ""
    } else {
      if (newTask.title == "") {
        setDisplayErrorMeetingTitle(true);
      } else setDisplayErrorMeetingTitle(false);
      if (newTask.startedAt == "") {
        setdisplayErrorMeetingDate(true);
      } else setdisplayErrorMeetingDate(false);
      if (newTask.details == "") {
        setDisplayErrorTaskDetails(true);
      } else setDisplayErrorTaskDetails(false);
      if (newTask.responsibility == "בחר") {
        setDisplayErrorResponsibility(true);
      } else setDisplayErrorResponsibility(false);
      if (newTask.endedAt == "") {
        setDisplayErrorExecutionCompletionDate(true);
      } else setDisplayErrorExecutionCompletionDate(false);
      if (newTask.daysLeft < 0) {
        setDisplayErrorExecutionCompletionDate(true);
        setdisplayErrorMeetingDate(true);
      } else
        setDisplayErrorExecutionCompletionDate(false);
          setdisplayErrorMeetingDate(false);
    }
    if (newTask.levelOne == "בחר...") {
      setDisplayErrorLevelOne(true);
    } else {
      setDisplayErrorLevelOne(false);
    }
    if (newTask.levelTwo == "בחר...") {
      setDisplayErrorLevelTwo(true);
    } else {
      setDisplayErrorLevelTwo(false);
    }
    if (newTask.levelThree == "בחר...") {
      setDisplayErrorLevelTree(true);
    } else {
      setDisplayErrorLevelTree(false);
    }
    if (newTask.levelFour == "בחר...") {
      setDisplayErrorLevelFour(true);
    } else {
      setDisplayErrorLevelFour(false);
    }

    setDisplayErrorNote(true);
  };

  const newTask = () => {
    setChecksIfFile(false);
    const date1 = new Date(meetingDate.current.value);
    const date2 = new Date(executionCompletionDate.current.value);
    const diffTime = date2 - date1;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    let max = 0;
    missions.map((mission, i) => {
      if (Number(mission.missionId) > max) {
        max = Number(mission.missionId);
      }
    });
    let t = new Date();
    t = t.getDate() + "/" + (t.getMonth() + 1) + "/" + t.getFullYear();
    let newTask = {
      missionId: String(max + 1),
      status: "בתהליך",
      title: meetingTitle?.current?.value,
      startedAt: meetingDate?.current?.value,
      details: taskDetails?.current?.value,
      responsibility: personNames,
      endedAt: executionCompletionDate?.current?.value,
      daysLeft: diffDays,
      levelOne: levelOne?.current?.value,
      levelTwo: levelTwo?.current?.value,
      levelThree: levelThree?.current?.value,
      levelFour: levelFour?.current?.value,
      chat: {
        messages: {
          msg: noteCommander.current?.value
            ? "{" +
              currentUser.username +
              "} " +
              noteCommander.current?.value +
              "\n"
            : "",
          readed: noteCommander.current?.value ? [false] : [],
          time: noteCommander.current?.value ? t : "",
        },
      },
      // fileMission: fileMission?.current?.files[0],
      token: userSelect
    };

    if (
      newTask.title != "" &&
      newTask.startedAt != "" &&
      newTask.details != "" &&
      newTask.responsibility != "" &&
      newTask.endedAt != "" &&
      newTask.daysLeft >= 0 &&
      newTask.levelOne != "בחר פיקוד..." &&
      newTask.levelTwo != "בחר..." &&
      newTask.levelThree != "בחר..." &&
      newTask.levelFour != "בחר..." 
    ) {
      setDisplayErrorNote(false);
      setDisplayErrorDesign(false);
      // newMission(newTask, currentUser.token);
      notifyadd();
      setDisplaySecondTask(true);
      meetingTitle.current.value = "";
      meetingDate.current.value = "";
      taskDetails.current.value = "";
      executionCompletionDate.current.value = "";
      setPersonNames([]);
      setUserSelected([]);
      // fileMission.current.files[0] = ""
    } else {
      if (newTask.title == "") {
        setDisplayErrorMeetingTitle(true);
      } else setDisplayErrorMeetingTitle(false);
      if (newTask.startedAt == "") {
        setdisplayErrorMeetingDate(true);
      } else setdisplayErrorMeetingDate(false);
      if (newTask.details == "") {
        setDisplayErrorTaskDetails(true);
      } else setDisplayErrorTaskDetails(false);
      if (newTask.responsibility == "בחר") {
        setDisplayErrorResponsibility(true);
      } else setDisplayErrorResponsibility(false);
      if (newTask.endedAt == "") {
        setDisplayErrorExecutionCompletionDate(true);
      } else setDisplayErrorExecutionCompletionDate(false);
      if (newTask.daysLeft < 0) {
        setDisplayErrorExecutionCompletionDate(true);
        setdisplayErrorMeetingDate(true);
      } else
        setDisplayErrorExecutionCompletionDate(false);
          setdisplayErrorMeetingDate(false);

      if (newTask.levelOne =="בחר פיקוד...") {
        setDisplayErrorLevelOne(true)
      }else setDisplayErrorLevelOne(false)
      if (newTask.levelTwo =="בחר...") {
        setDisplayErrorLevelTwo(true)
      }else setDisplayErrorLevelTwo(false)
      if (newTask.levelThree =="בחר...") {
        setDisplayErrorLevelTree(true)
      }else setDisplayErrorLevelTree(false)
      if (newTask.levelFour =="בחר...") {
        setDisplayErrorLevelFour(true)
      }else setDisplayErrorLevelFour(false)
      setDisplayErrorNote(true);
    }
  };

  const editTask = () => {
    setChecksIfFile(false);
    const date1 = new Date(meetingDate.current.value);
    const date2 = new Date(executionCompletionDate.current.value);
    const diffTime = date2 - date1;
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
      notifyedit();
      updateMission(newEditTask, currentUser.token);
      closeDialog();
    } else {
      if (newEditTask.title == "") {
        setDisplayErrorMeetingTitle(true);
      } else setDisplayErrorMeetingTitle(false);
      if (newEditTask.startedAt == "") {
        setdisplayErrorMeetingDate(true);
      } else setdisplayErrorMeetingDate(false);
      if (newEditTask.details == "") {
        setDisplayErrorTaskDetails(true);
      } else setDisplayErrorTaskDetails(false);
      if (newEditTask.responsibility == "בחר") {
        setDisplayErrorResponsibility(true);
      } else setDisplayErrorResponsibility(false);
      if (newEditTask.endedAt == "") {
        setDisplayErrorExecutionCompletionDate(true);
      } else setDisplayErrorExecutionCompletionDate(false);
      if (newEditTask.daysLeft < 0) {
        setDisplayErrorExecutionCompletionDate(true);
        setdisplayErrorMeetingDate(true);
      } else
        setDisplayErrorExecutionCompletionDate(false);
          setdisplayErrorMeetingDate(false);
      setDisplayErrorNote(true);
    }
  };

  const handleFiles = (e) => {
    setChecksIfFile(true);
    const file = fileMission.current.files[0];
    setfiles([...files, file]);
    fileMission.current.value = null;
  };

  const handleDelete = (i) => {
    let isFilesEmpty = files.filter((file, j) => j != i);
    setfiles(isFilesEmpty);
    setChecksIfFile(isFilesEmpty.length > 0);
  };

  return (
    <>
      <div dir="rtl">
        <div className="bg-white mx-5 my-5">
          {!editSingleMission ? (
            <h3 className="d-flex justify-content-center mb-4 add_m_title">
              הוספת משימה{" "}
            </h3>
          ) : (
            <h3 className="d-flex justify-content-center mb-4 add_m_title">
              עדכון משימה{" "}
            </h3>
          )}
          {!editSingleMission ? (
            <ul className="d-flex row">
              <li className="col-6 list-unstyled ">
                <label htmlFor="meetingTitle">
                  כותרת הפגישה{" "}
                  <span
                    className={
                      displayErrorMeetingTitle ? "text-danger" : "text-dark"
                    }
                  >
                    {" "}
                    *
                  </span>
                </label>
                <input
                  id="meetingTitle"
                  ref={meetingTitle}
                  type="text"
                  placeholder="כותרת פגישה"
                  className={
                    displayErrorMeetingTitle
                      ? "form-control bg-light"
                      : "form-control bg-light "
                  }
                />
              </li>
              <li className="col-6 list-unstyled mb-4 ">
                <label htmlFor="meetingDate">
                  מועד דיון{" "}
                  <span
                    className={
                      displayErrorMeetingDate ? "text-danger" : "text-dark"
                    }
                  >
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
                <label htmlFor="taskDetails">
                  {" "}
                  פירוט המשימה
                  <span
                    className={
                      displayErrorTaskDetails ? "text-danger" : "text-dark"
                    }
                  >
                    {" "}
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
              <li className="col-lg-6 list-unstyled col-sm-6  mb-lg-4">
                <label htmlFor="executionCompletionDate">
                  תאריך גמר ביצוע
                  <span
                    className={
                      displayErrorExecutionCompletionDate
                        ? "text-danger"
                        : "text-dark"
                    }
                  >
                    {" "}
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

              <li className="col-6 list-unstyled mb-4">
                <label htmlFor="levelOne">
                  רמה 1{" "}
                  <span
                    className={
                      displayErrorLevelOne ? "text-danger" : "text-dark"
                    }
                  >
                    {" "}
                    *
                  </span>
                </label>
                <select
                  id="levelOne"
                  ref={levelOne}
                  placeholder="רמה 1"
                  className={
                    displayErrorLevelOne
                      ? "form-control bg-light"
                      : "form-control bg-light "
                  }
                >
                  <option selected>בחר פיקוד...</option>
                  <option>פיקוד הכשרות ואימונים</option>
                </select>
              </li>
              <li className="col-6 list-unstyled   mb-4">
                <label htmlFor="levelTwo">
                  רמה 2{" "}
                  <span
                    className={
                      displayErrorLevelTwo ? "text-danger" : "text-dark"
                    }
                  >
                    {" "}
                    *
                  </span>
                </label>
                <select
                  id="levelTwo"
                  ref={levelTwo}
                  placeholder="רמה 2"
                  className={
                    displayErrorLevelTwo
                      ? "form-control bg-light"
                      : "form-control bg-light "
                  }
                  aria-label="Default select example"
                >
                  <option selected>בחר...</option>
                  <option>מטה</option>
                  <option>יחידה</option>
                </select>
              </li>
              <li className="col-6 list-unstyled   mb-4">
                <label htmlFor="levelThree">
                  רמה 3{" "}
                  <span
                    className={
                      displayErrorLevelThree ? "text-danger" : "text-dark"
                    }
                  >
                    {" "}
                    *
                  </span>
                </label>
                <select
                  id="levelThree"
                  ref={levelThree}
                  placeholder="רמה 3 "
                  className={
                    displayErrorLevelThree
                      ? "form-control bg-light"
                      : "form-control bg-light "
                  }
                  aria-label="Default select example"
                >
                  <option selected>בחר...</option>
                  <option>רמה 3</option>
                </select>
              </li>
              <li className="col-6 list-unstyled   mb-4">
                <label htmlFor="levelThree">
                  רמה 4{" "}
                  <span
                    className={
                      displayErrorLevelThree ? "text-danger" : "text-dark"
                    }
                  >
                    {" "}
                    *
                  </span>
                </label>
                <select
                  id="levelFour"
                  ref={levelFour}
                  placeholder="רמה 4"
                  className={
                    displayErrorLevelThree
                      ? "form-control bg-light"
                      : "form-control bg-light "
                  }
                  aria-label="Default select example"
                >
                  <option selected>בחר...</option>
                  <option>רמה 4</option>
                </select>
              </li>
              <ul className="row d-flex justify-content-around"> 
              <li className="col-lg-6 list-unstyled col-sm-6  mb-4">
                <div>
                  <label htmlFor="responsibility">
                    אחריות/שותפים{" "}
                    <span
                      className={
                        displayErrorResponsibility ? "text-danger" : "text-dark"
                      }
                    >
                      {" "}
                      *
                    </span>
                  </label>
                  <FormControl
                    sx={{ width: 193, height: 40, border: "none" }}
                    ref={responsibility}
                  >
                    <Select
                      className="border bg-light"
                      sx={{
                        height: 38,
                        "& .MuiOutlinedInput-notchedOutline": {
                          border: "none",
                        },
                        "& .MuiInputLabel-outlined": {
                          transform: "translate(14px, 12px) scale(1)",
                        },
                      }}
                      labelId="demo-multiple-checkbox-label"
                      id="demo-multiple-checkbox"
                      multiple
                      value={personNames}
                      onChange={(e) => setUserSelect(e.target.value)}
                      renderValue={(selected) => selected.join(", ")}
                      MenuProps={MenuProps}
                    >
                      {users.map((item, i) => (
                        <MenuItem dir="rtl" key={i} value={item.username}>
                          <Checkbox
                            checked={personNames.indexOf(item.username) > -1}
                          />
                          <div>
                            <ListItemText primary={item.username} />
                          </div>
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </div>
              </li>
              </ul>

              <li className="d-flex justify-content-end my-1" dir="ltr">
                <div className="">
                  {files.map((file, i) => (
                    <div className="my-1" key={i}>
                      <Chip
                        label={file.name}
                        onDelete={() => handleDelete(i)}
                      />
                    </div>
                  ))}
                </div>
              </li>
              <li className="col-12 list-unstyled d-flex justify-content-center">
                <div
                  className="hide_file_container"
                  style={{
                    border: checksIfFile
                      ? "solid 3px black"
                      : "dashed 3px black",
                  }}
                >
                  <div>
                    {" "}
                    לחץ כאן להעלאת קובץ{" "}
                    <DriveFileMoveSharpIcon className="mx-2" />
                  </div>
                  <input
                    className="form-control hide_file"
                    type="file"
                    ref={fileMission}
                    onChange={handleFiles}
                  />
                </div>
              </li>
            </ul>
          ) : (
            <ul className="d-flex row ">
              <li className="col-6 list-unstyled ">
                <label htmlFor="meetingTitle">
                  כותרת הפגישה{" "}
                  <span
                    className={
                      displayErrorMeetingTitle ? "text-danger" : "text-dark"
                    }
                  >
                    {" "}
                    *
                  </span>
                </label>
                <input
                  id="meetingTitle"
                  ref={meetingTitle}
                  type="text"
                  placeholder="כותרת פגישה"
                  defaultValue={editSingleMission.title}
                  className={
                    displayErrorMeetingTitle
                      ? "form-control bg-light"
                      : "form-control bg-light "
                  }
                />
              </li>
              <li className="col-6 list-unstyled mb-4 ">
                <label htmlFor="meetingDate">
                  מועד דיון{" "}
                  <span
                    className={
                      displayErrorMeetingDate ? "text-danger" : "text-dark"
                    }
                  >
                    {" "}
                    *
                  </span>
                </label>
                <input
                  id="meetingDate"
                  ref={meetingDate}
                  type="date"
                  placeholder="מועד הפגישה"
                  defaultValue={reversedDate?.startedAt}
                  className="form-control bg-light"
                />
              </li>
              <li className="col-lg-6 list-unstyled col-sm-12  mb-lg-4 ">
                <label htmlFor="taskDetails">
                  פירוט המשימה{" "}
                  <span
                    className={
                      displayErrorTaskDetails ? "text-danger" : "text-dark"
                    }
                  >
                    {" "}
                    *
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
                    className={
                      displayErrorExecutionCompletionDate
                        ? "text-danger"
                        : "text-dark"
                    }
                  >
                    {" "}
                    *
                  </span>
                </label>
                <input
                  id="meetingDate"
                  ref={executionCompletionDate}
                  type="date"
                  defaultValue={reversedDate?.endedAt}
                  className="form-control bg-light"
                />
              </li>

              <li className="col-6 list-unstyled mb-4">
                <label htmlFor="levelOne">
                  רמה 1{" "}
                  <span
                    className={
                      displayErrorLevelOne ? "text-danger" : "text-dark"
                    }
                  >
                    {" "}
                    *
                  </span>
                </label>
                <select
                  id="levelOne"
                  ref={levelOne}
                  placeholder="רמה 1 "
                  defaultValue={editSingleMission.levelOne}
                  className={
                    displayErrorLevelOne
                      ? "form-control bg-light"
                      : "form-control bg-light "
                  }
                  aria-label="Default select example"
                >
                  <option selected>בחר פיקוד...</option>
                  <option>פיקוד הכשרות ואימונים</option>
                </select>
              </li>
              <li className="col-6 list-unstyled   mb-4">
                <label htmlFor="levelTwo">
                  רמה 2{" "}
                  <span
                    className={
                      displayErrorLevelTwo ? "text-danger" : "text-dark"
                    }
                  >
                    {" "}
                    *
                  </span>
                </label>
                <select
                  id="levelTwo"
                  ref={levelTwo}
                  placeholder="רמה 2"
                  defaultValue={editSingleMission.levelTwo}
                  className={
                    displayErrorLevelTwo
                      ? "form-control bg-light"
                      : "form-control bg-light "
                  }
                  aria-label="Default select example"
                >
                  <option selected>בחר...</option>
                  <option>מטה</option>
                  <option>יחידה</option>
                </select>
              </li>
              <li className="col-6 list-unstyled   mb-4">
                <label htmlFor="levelThree">
                  רמה 3{" "}
                  <span
                    className={
                      displayErrorLevelThree ? "text-danger" : "text-dark"
                    }
                  >
                    {" "}
                    *
                  </span>
                </label>
                <select
                  id="levelThree"
                  ref={levelThree}
                  placeholder="רמה 3 "
                  defaultValue={editSingleMission.levelThree}
                  className={
                    displayErrorLevelThree
                      ? "form-control bg-light"
                      : "form-control bg-light "
                  }
                  aria-label="Default select example"
                >
                  <option selected>בחר...</option>
                  <option></option>
                </select>
              </li>
              <li className="col-6 list-unstyled  mb-4">
                <label htmlFor="levelFour">
                  רמה 4{" "}
                  <span
                    className={
                      displayErrorLevelFour ? "text-danger" : "text-dark"
                    }
                  >
                    {" "}
                    *
                  </span>
                </label>
                <select
                  id="levelFour"
                  ref={levelFour}
                  placeholder="רמה 4"
                  defaultValue={editSingleMission.levelFour}
                  className={
                    displayErrorLevelFour
                      ? "form-control bg-light"
                      : "form-control bg-light "
                  }
                  aria-label="Default select example"
                >
                  <option selected>בחר...</option>
                  <option></option>
                </select>
              </li>
              <ul className="row d-flex justify-content-around">
              <li className="col-lg-6 list-unstyled col-sm-6  mb-4">
                <div>
                  <label htmlFor="responsibility">
                    אחריות/שותפים{" "}
                    <span
                      className={
                        displayErrorResponsibility ? "text-danger" : "text-dark"
                      }
                    >
                      {" "}
                      *
                    </span>
                  </label>
                  <FormControl
                    className="momo"
                    sx={{ width: 193, height: 40, border: "none" }}
                    ref={responsibility}
                  >
                    <Select
                      className="border bg-light"
                      sx={{
                        height: 38,
                        "& .MuiOutlinedInput-notchedOutline": {
                          border: "none",
                        },
                        "& .MuiInputLabel-outlined": {
                          transform: "translate(14px, 12px) scale(1)",
                        },
                      }}
                      labelId="demo-multiple-checkbox-label"
                      id="demo-multiple-checkbox"
                      multiple
                      value={personNames}
                      onChange={(e) => setUserSelect(e.target.value)}
                      renderValue={(selected) => selected.join(", ")}
                      MenuProps={MenuProps}
                    >
                      {users.map((item, i) => (
                        <MenuItem dir="rtl" key={i} value={item.username}>
                          <Checkbox
                            checked={personNames.indexOf(item.username) > -1}
                          />
                          <div>
                            <ListItemText primary={item.username} />
                          </div>
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </div>
              </li>
              </ul>

              <li className="d-flex justify-content-end my-1" dir="ltr">
                <div className="">
                  {files.map((file, i) => (
                    <div className="my-1" key={i}>
                      <Chip
                        label={file.name}
                        onDelete={() => handleDelete(i)}
                      />
                    </div>
                  ))}
                </div>
              </li>
              <li className="col-12 list-unstyled d-flex justify-content-center">
                <div
                  className="hide_file_container"
                  style={{
                    border: checksIfFile
                      ? "solid 3px black"
                      : "dashed 3px black",
                  }}
                >
                  <div>
                    {" "}
                    לחץ כאן להעלאת קובץ{" "}
                    <DriveFileMoveSharpIcon className="mx-2" />
                  </div>
                  <input
                    className="form-control hide_file"
                    type="file"
                    ref={fileMission}
                    onChange={handleFiles}
                  />
                </div>
              </li>
            </ul>
          )}
          <div className="row  d-flex justify-content-around mx-2">
            {displayErrorNote ? errorNote : ""}
            {!editSingleMission ? (
              <button
                onClick={() => {
                  newTask();
                }}
                className="btn btn-light  col-4  btn-outline-dark"
              >
                שמור וצור משימה חדשה
              </button>
            ) : (
              ""
            )}
            <button
              onClick={() => {
                editSingleMission ? editTask() : sendigTask();
              }}
              className="btn btn-light  col-4  btn-outline-dark"
            >
              שמירה
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
