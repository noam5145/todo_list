import React, { useContext, useRef, useState } from "react";
import './addMissions.css'
import { Link } from "react-router-dom";
import { MyContext } from "../../../App";

export default function AddMissions() {
  let errorNote = (
    <h5 className="text-danger pb-3 pt-3 font-weight-bold">
      מלאו את כל הפרטים המסומנים ב *
    </h5>
  );
  let [displayErrorNote, setDisplayErrorNote] = useState(false);
  let [displayErrorDesign, setDisplayErrorDesign] = useState(false);
  let [displaySuccess, setDisplaySuccess] = useState(false);
  let givenIn = useRef();
  let meetingTitle = useRef();
  let meetingDate = useRef();
  let discssionSummary = useRef();
  let taskDetails = useRef();
  let responsibility = useRef();
  let executionCompletionDate = useRef();
  let domain = useRef();
  let internalAssociation = useRef();
  // const { currentUser, newMission } = useContext(MyContext);

  let sendigTask = () => {
    let newTask = {
      givenIn: givenIn.current.value,
      title: meetingTitle.current.value,
      startedAt: meetingDate.current.value,
      summary: discssionSummary.current.value,
      details: taskDetails.current.value,
      responsibility: responsibility.current.value,
      endedAt: executionCompletionDate.current.value,
      subject: domain.current.value,
      belonging: internalAssociation.current.value,
      token: "currentUser?.token",
    };
    if (
      newTask.givenIn != "בחר..." &&
      newTask.meetingTitle != "" &&
      newTask.meetingDate != "" &&
      newTask.details != "" &&
      newTask.responsibility != "" &&
      newTask.endedAt != ""
    ) {
      setDisplayErrorNote(false);
      setDisplayErrorDesign(false);
      setDisplaySuccess(true);
      // newMission(newTask);
    } else {
      setDisplayErrorNote(true);
      setDisplayErrorDesign(true);
    }
  };

  return (
    <div className="container-fluid bg-light  d-flex h_page align-items-center">
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
        <div className="bg-white pt-5 pb-5">
          <ul className="d-flex row">
            <li className="col-lg-3 col-sm-6 list-unstyled ">
              <label htmlFor="givenIn">
                ניתנה במסגרת{" "}
                <span
                  className={displayErrorDesign ? "text-danger" : "text-dark"}
                >
                  *
                </span>
              </label>
              <select id="givenIn" ref={givenIn} className="form-control bg-light">
                <option>בחר...</option>
                <option>דיון</option>
                <option>פ.ע</option>
                <option>ביקור</option>
                <option>אחר</option>
              </select>
            </li>
            <li className="col-lg-3 col-sm-6 list-unstyled ">
              <label htmlFor="meetingTitle">
                כותרת הפגישה{" "}
                <span
                  className={displayErrorDesign ? "text-danger" : "text-dark"}
                >
                  *
                </span>
              </label>
              <input
                id="meetingTitle"
                ref={meetingTitle}
                type="text"
                placeholder="כותרת פגישה"
                className="form-control bg-light "
              ></input>
            </li>
            <li className="col-lg-3 col-sm-6 list-unstyled ">
              <label htmlFor="meetingDate">
                בחר תאריך{" "}
                <span
                  className={displayErrorDesign ? "text-danger" : "text-dark"}
                >
                  *
                </span>
              </label>
              <input
                id="meetingDate"
                ref={meetingDate}
                type="date"
                placeholder="בחר תאריך"
                className="form-control bg-light"
              ></input>
            </li>
            <li className="col-lg-3 col-sm-6 list-unstyled ">
              <label htmlFor="discssionSummary">
                קישור סיכום דיון{" "}
                <span
                  className={displayErrorDesign ? "text-danger" : "text-dark"}
                >
                  *
                </span>
              </label>
              <input
                id="discssionSummary"
                ref={discssionSummary}
                type="text"
                placeholder="קישור סיכום דיון"
                className="form-control bg-light"
              ></input>
            </li>
          </ul>
          <h4 className="pe-4 pt-5">הדבקת נתונים</h4>
          <ul className="d-flex row">
            <li className="col-lg-3 list-unstyled col-sm-12 ">
              <label htmlFor="taskDetails">
                פירוט המשימה{" "}
                <span
                  className={displayErrorDesign ? "text-danger" : "text-dark"}
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
            <li className="col-lg-2 list-unstyled col-sm-6 ">
              <label htmlFor="responsibility">
                אחריות{" "}
                <span
                  className={displayErrorDesign ? "text-danger" : "text-dark"}
                >
                  *
                </span>
              </label>
              <textarea
                ref={responsibility}
                className="form-control bg-light"
                id="responsibility"
                rows="1"
              ></textarea>
            </li>
            <li className="col-lg-2 list-unstyled col-sm-6 ">
              <label htmlFor="executionCompletionDate">
                תאריך גמר ביצוע{" "}
                <span
                  className={displayErrorDesign ? "text-danger" : "text-dark"}
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
            <li className="col-lg-2 list-unstyled col-sm-6 ">
              <label htmlFor="domain">תחום</label>
              <textarea
                ref={domain}
                className="form-control bg-light"
                id="domain"
                rows="1"
              ></textarea>
            </li>
            <li className="col-lg-3 list-unstyled col-sm-6 ">
              <label htmlFor="internalAssociation">שיוך פנימי</label>
              <textarea
                ref={internalAssociation}
                className="form-control bg-light"
                id="internalAssociation"
                rows="1"
              ></textarea>
            </li>
          </ul>
          <div className="row me-5">
            {displayErrorNote ? errorNote : ""}
            <button
              onClick={sendigTask}
              className="btn btn-light col-lg-1 col-sm-2 col-4  btn-outline-dark"
            >
              שמירה
            </button>
          </div>
        </div>
      </div>
    </div>
  );
            }
