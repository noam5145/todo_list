import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BsFilterCircleFill } from "react-icons/bs";
import { AiFillMessage, AiFillPrinter } from "react-icons/ai";
import { IoSettingsSharp } from "react-icons/io5";
import "./topNav.css";
import Logo from '../../../images/todo_list_logo.png'

export default function TopNav() {

  const [currentTime, setCurrentTime] = useState(time());
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
      minute: "numeric"
    };
  
    var foreignDateTime = foreignDate.toLocaleString(undefined, options);
    return foreignDateTime;
  }
  
  function time(){
    var foreignDate = new Date();
    var result = getForeignDateTime(foreignDate);
    console.log(result);
    return result;
  }
  return (
    <div className="row m-0 align-items-center top_nav">
      
      <div className="col-7 d-flex mx-sm-3 mx-0">
      <img src={Logo} alt="" height={30} width={190} />
      </div>
      <div className="col-4 d-flex justify-content-between">
        <span>{currentTime}</span>
        <div className="">
          <Link className="" to={"/filter"}>
            <BsFilterCircleFill size={25} color="gray" />
          </Link>
        </div>
        <div className="">
          <Link className=" " to={"/message"}>
            <AiFillMessage size={25} color="gray"/>
          </Link>
        </div>
        <div className="">
          <Link className="" to={"/printFile"}>
            <AiFillPrinter size={25} color="gray"/>
          </Link>
        </div>
        <div className="">
          <Link className="" to={"/settings"}>
            <IoSettingsSharp size={25} color="gray"/>
          </Link>
        </div>
      </div>
    </div>
  );
}
