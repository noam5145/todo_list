import React, { useRef, useState } from "react";

export default function Settings() {
  const [error, setError] = useState(false);

  let userName = useRef(null);
  let jobTitle = useRef(null);
  let unitTitle = useRef(null);
  let permissions = useRef(null);
  let level_1 = useRef(null);
  let level_2 = useRef(null);
  let level_3 = useRef(null);

  function addUser() {
    let user = {
      username: userName.current.value,
      jobTitle: jobTitle.current.value, //תפקיד
      unitTitle: unitTitle.current.value, //יחידה
      permissions: permissions.current.value, //admin, editor, user.
      level_1: level_1.current.value, //רמה
      level_2: level_2.current.value, //רמה
      level_3: level_3.current.value, //רמה
    };
    if (
      !userName.current.value ||
      !jobTitle.current.value ||
      !unitTitle.current.value ||
      permissions.current.value == "בחר..."||
      !level_1.current.value ||
      !level_2.current.value
    ) {
      setError(true);
    } else {
      setError(false);


    }
  }
  return (
    <div className="container mt-5">
      <h2 className="mt-5">הוספת משתמש חדש </h2>
      <div className="bg-white pt-5 pb-5 mt-5">
        <ul className="d-flex row">
          <li className="col-lg-3 col-sm-6 list-unstyled ">
            <label htmlFor="userName">
              שם משתמש{" "}
              <span
              className={error ? "text-danger" : "text-dark"}
              >
                *
              </span>
            </label>
            <input
              id="userNam"
              ref={userName}
              type="text"
              placeholder="שם משתמש"
              className="form-control bg-light mt-2"
            ></input>
          </li>
          <li className="col-lg-3 col-sm-6 list-unstyled ">
            <label htmlFor="jobTitle">
              שם תפקיד{" "}
              <span
              className={error ? "text-danger" : "text-dark"}
              >
                *
              </span>
            </label>
            <input
              id="meetingjobTitleTitle"
              ref={jobTitle}
              type="text"
              placeholder="שם תפקיד"
              className="form-control bg-light mt-2"
            ></input>
          </li>{" "}
          <li className="col-lg-3 col-sm-6 list-unstyled ">
            <label htmlFor="unitTitle">
              שם יחידה{" "}
              <span
              className={error ? "text-danger" : "text-dark"}
              >
                *
              </span>
            </label>
            <input
              id="unitTitle"
              ref={unitTitle}
              type="text"
              placeholder="שם יחידה"
              className="form-control bg-light mt-2"
            ></input>
          </li>
          <li className="col-lg-3 col-sm-6 list-unstyled ">
            <label htmlFor="Permissions">
              הרשאות{" "}
              <span
              className={error ? "text-danger" : "text-dark"}
              >
                *
              </span>
            </label>
            <select
              name=""
              id="permissions"
              ref={permissions}
              className="form-control bg-light mt-2"
            >
              <option value="בחר...">בחר...</option>
              <option value="management">ניהול</option>
              <option value="editing">עריכה</option>
              <option value="viewing">צפייה</option>
            </select>
          </li>
        </ul>
        <ul className="d-flex row">
          <li className="col-lg-4 col-sm-6 list-unstyled ">
            <label htmlFor="level_1">
              רמה 1{" "}
              <span
              className={error ? "text-danger" : "text-dark"}
              >
                *
              </span>
            </label>
            <input
              id="level_1"
              ref={level_1}
              type="text"
              placeholder="רמה 1 "
              className="form-control bg-light mt-2"
            ></input>
          </li>
          <li className="col-lg-4 col-sm-6 list-unstyled ">
            <label htmlFor="level_2">
              רמה 2{" "}
              <span
              className={error ? "text-danger" : "text-dark"}
              >
                *
              </span>
            </label>
            <input
              id="level_2"
              ref={level_2}
              type="text"
              placeholder="רמה 2 "
              className="form-control bg-light mt-2"
            ></input>
          </li>
          <li className="col-lg-4 col-sm-6 list-unstyled ">
            <label htmlFor="level_3">רמה 3 </label>
            <input
              id="level_3"
              ref={level_3}
              type="text"
              placeholder="רמה 3"
              className="form-control bg-light mt-2"
            ></input>
          </li>
        </ul>

        <div className="d-flex justify-content-center mt-5">
          <div
            className="btn bg-light py-3 px-5 border"
            onClick={() => addUser()}
          >
            שמירה
          </div>
        </div>
        {error && (
          <h5 className="mx-5 text-danger">מלאו את כל השדות המסומנים ב *</h5>
        )}
      </div>
    </div>
  );
}
