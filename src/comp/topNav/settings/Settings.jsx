import React, { useRef, useState, useContext, useEffect } from "react";
import { AiOutlineClose } from "react-icons/ai";
import "./settings.css";
import { MyContext } from "../../../App";
import UsersList from "./usersList/UsersList";
import { Oval } from "react-loader-spinner";


export default function Settings() {
  const { setNewUser, users, loading } = useContext(MyContext);
  const [error, setError] = useState(false);
  const [addNewUser, setAddNewUser] = useState(true);

  let userName = useRef(null);
  let personalNumber = useRef(null);
  let jobTitle = useRef(null);
  let unitTitle = useRef(null);
  let permissions = useRef(null);
  let level_1 = useRef(null);
  let level_2 = useRef(null);
  let level_3 = useRef(null);

const usersTable = () => {
  return <UsersList users={users} />
  
}




  function addUser() {
    let user = {
      username: userName.current.value,
      role: jobTitle.current.value, //תפקיד
      id: personalNumber.current.value, //מספר אישי
      unit: unitTitle.current.value, //יחידה
      access: permissions.current.value, //admin, editor, user.
      level_1: level_1.current.value, //רמה
      level_2: level_2.current.value, //רמה
      level_3: level_3.current.value, //רמה
    };
    if (
      !userName.current.value ||
      !personalNumber.current.value ||
      !jobTitle.current.value ||
      !unitTitle.current.value ||
      permissions.current.value == "בחר..." ||
      !level_1.current.value ||
      !level_2.current.value
    ) {
      setError(true);
    } else {
      setError(false);
      setAddNewUser(true);
      setNewUser(user);
    }
  }

  return (<>
   {!loading ? (<div className="container mt-5">
    <div className="d-flex justify-content-between">
      <h3 className="mt-5 chat_name">סביבת עבודה</h3>
      {addNewUser && (
        <div
          onClick={() => setAddNewUser(!addNewUser)}
          className="btn mt-5 bg-secondary p-2 text-light mx-3"
        >
          הוסף משתמש +
        </div>
      )}
    </div>
    {!addNewUser && (
      <div className="bg-white pt-5 pb-5 mt-5">
        <ul className="d-flex row">
          <div className="d-flex justify-content-end">
            <div className="py-3 px-5" onClick={() => setAddNewUser(true)}>
              <AiOutlineClose size={20} />
            </div>
          </div>
          <li className="col-lg-3 col-sm-6 list-unstyled ">
            <label htmlFor="userName">
              שם משתמש{" "}
              <span className={error ? "text-danger" : "text-dark"}>*</span>
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
              <span className={error ? "text-danger" : "text-dark"}>*</span>
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
            <label htmlFor="personalNumber">
              מספר אישי{" "}
              <span className={error ? "text-danger" : "text-dark"}>*</span>
            </label>
            <input
              id="personalNumber"
              ref={personalNumber}
              type="text"
              placeholder="מספר אישי"
              className="form-control bg-light mt-2"
            ></input>
          </li>
          <li className="col-lg-3 col-sm-6 list-unstyled ">
            <label htmlFor="unitTitle">
              שם יחידה{" "}
              <span className={error ? "text-danger" : "text-dark"}>*</span>
            </label>
            <input
              id="unitTitle"
              ref={unitTitle}
              type="text"
              placeholder="שם יחידה"
              className="form-control bg-light mt-2"
            ></input>
          </li>
        </ul>
        <ul className="d-flex row">
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
            <option value="admin">ניהול</option>
            <option value="editor">עריכה</option>
            <option value="viewing">צפייה</option>
          </select>
        </li>
      
          <li className="col-lg-3 col-sm-6 list-unstyled ">
            <label htmlFor="level_1">
              רמה 1{" "}
              <span className={error ? "text-danger" : "text-dark"}>*</span>
            </label>
            <input
              id="level_1"
              ref={level_1}
              type="text"
              placeholder="רמה 1 "
              className="form-control bg-light mt-2"
            ></input>
          </li>
          <li className="col-lg-3 col-sm-6 list-unstyled ">
            <label htmlFor="level_2">
              רמה 2{" "}
              <span className={error ? "text-danger" : "text-dark"}>*</span>
            </label>
            <input
              id="level_2"
              ref={level_2}
              type="text"
              placeholder="רמה 2 "
              className="form-control bg-light mt-2"
            ></input>
          </li>
          <li className="col-lg-3 col-sm-6 list-unstyled ">
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
            onClick={() =>{
              addUser();
            } }
          >
            שמירה
          </div>
        </div>
        {error && (
          <h5 className="mx-5 text-danger">מלאו את כל השדות המסומנים ב *</h5>
        )}
      </div>
    )}
    <div className="mt-5 mb-5">
      <div className="d-flex justify-content-center ">
        <div className="row container">
         <div className="d-flex">
         <div className="col-2 borTitle d-flex justify-content-center align-items-center border table_h">
            שם משתמש
          </div>
          <div className="col-2 borTitle d-flex justify-content-center align-items-center border table_h">
            תפקיד
          </div>
          <div className="col-2 borTitle d-flex justify-content-center align-items-center border table_h">
            רמה 1
          </div>
          <div className="col-2 borTitle d-flex justify-content-center align-items-center border table_h">
            רמה 2
          </div>
          <div className="col-2 borTitle d-flex justify-content-center align-items-center border table_h">
            רמה 3
          </div>
          <div className="col-1 borTitle d-flex justify-content-center align-items-center border table_h">
            הרשאות
          </div>
          <div className="col-1 borTitle d-flex justify-content-center align-items-center border table_h">
            ---
          </div>
         </div>
        </div>
      </div>
     {usersTable()}
    </div>
  </div>):( <div className="container">
  <div className="d-flex justify-content-center align-items-center my-5">
    <Oval
      height={80}
      width={80}
      color="#62aeea"
      wrapperStyle={{}}
      wrapperClass=""
      visible={true}
      ariaLabel="oval-loading"
      secondaryColor="#62aeea"
      strokeWidth={2}
      strokeWidthSecondary={2}
    />
  </div>
</div>)}
  </>
   
    
  );
}
