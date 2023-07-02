import React, { useContext, useEffect } from "react";
import { MyContext } from "../App";
import Logo from '../../images/logo_mission_360.png'
import './main.css'

export default function MainSite() {
  const {} = useContext(MyContext);
  return(
    <div className="container">
      <div className="d-flex justify-content-center">
      <img src={Logo} alt="" className="logo_main" />

      </div>
    </div>
  ) 
}
