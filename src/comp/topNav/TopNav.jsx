import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import Login from "../Login";
import { BsFilterCircleFill } from "react-icons/bs";
import { AiFillMessage, AiFillPrinter } from "react-icons/ai";
import { RiFilter3Line } from "react-icons/ri";
import { LuMail } from "react-icons/lu";
import { FaTasks } from "react-icons/fa";
import { IoSettingsSharp } from "react-icons/io5";
import "./topNav.css";
import { MyContext } from "../../App";
import Logo from "../../../images/todo_list_logo.png";

export default function TopNav() {
  const [currentTime, setCurrentTime] = useState(time());
  const [settings, setSettings] = useState(false);
  const { currentUser } = useContext(MyContext);
  // const [currentUser, setCurrentUser] = useState();

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(time());
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  function getForeignDateTime(foreignDate) {
    var options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    };

    var foreignDateTime = foreignDate.toLocaleString(undefined, options);
    return foreignDateTime;
  }

  function time() {
    var foreignDate = new Date();
    var result = getForeignDateTime(foreignDate);
    return result;
  }

  useEffect(() => {
    window.addEventListener("click", () => setSettings(false));
  }, []);
  return (
    <div className="row m-0 align-items-center top_nav sticky-top">
      <div className="col-4 d-flex mx-sm-3 mx-0">
        <img src={Logo} alt="" height={30} width={190} />
      </div>
      <div className="col-7 d-flex mx-0 justify-content-around">
        <span>{currentTime}</span>
        <div className="">
          <Link className=" " to={"/alerts"}>
            <LuMail className="cursor" size={25} color="red" />
          </Link>
        </div>
        <div className="">
          <Link className=" " to={"/UserTasks"}>
            <FaTasks className="cursor" size={25} color="gray" />
          </Link>
        </div>
        <div className="icons">
          <IoSettingsSharp
          className="cursor"
            size={25}
            color="gray"
            onClick={(e) => {
              e.stopPropagation();
              setSettings(!settings);
            }}
          />
          <div className={settings ? "settings" : "hidden "}>
            <Link className=" nav-link" to={"/settings"}>
              <div className="setting_options">הגדר סביבת עבודה</div>
            </Link>
            <div className="setting_options">סביבת העבודה שלי </div>
          </div>
        </div>
        {!currentUser ? <Login /> : ""}
        {currentUser?.username}
      </div>
    </div>
  );
}
