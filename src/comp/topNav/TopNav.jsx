import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { LuMail } from "react-icons/lu";
import { FaTasks } from "react-icons/fa";
import { BsPersonWorkspace } from "react-icons/bs";
import "./topNav.css";
import { MyContext } from "../../App";
import { Avatar, Badge, Button, Dialog } from "@mui/material";
import NewEnvironment from "../../NewEnvironment";
import Logo from "../../images/logo_mission_360.png"

export default function TopNav() {
  const [currentTime, setCurrentTime] = useState(time());
  const [settings, setSettings] = useState(false);
  const [open, setOpen] = React.useState(false);

  const { currentUser, newMissions, missions } = useContext(MyContext);
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
    <>
      <div className="row m-0 align-items-center top_nav sticky">
        <div className="col-4 d-flex mx-sm-3 mx-0 logo">
          <img src={Logo} alt="" height={100} width={155} />
        </div>
        <div className="col-7 d-flex mx-0 justify-content-around">
          <span>{currentTime}</span>
        
          <div className="d-flex">
            <div className="my-1 mx-1">
              {currentUser?.username}
            </div>
          </div>
          {currentUser?.access === 'admin' &&
            <div className="icons">
              <Link className=" nav-link" to={"/settings"}>
                <BsPersonWorkspace className="cursor" size={25} color="gray" />
              </Link>
            </div>}
          <div className="">
            <button className="btn bg-primary text-white" onClick={() => setOpen(true)}>
              בקשת הרשאות
            </button>
            <Dialog
              open={open}
              onClose={() => setOpen(false)}
            >
              <div>
                <NewEnvironment setOpen={setOpen}/>
                </div>
            </Dialog>
          </div>

        </div>
      </div>
    </>
  );
}