import React, { useContext, useEffect } from "react";
import { MyContext } from "../App";
import Logo from '../../images/logo_mission_360.png'
import './main.css'
import { useNavigate } from "react-router-dom";

export default function MainSite() {
  const {} = useContext(MyContext);
  const navigate = useNavigate();
  useEffect(()=>{
    setTimeout(() => {
      navigate('/dashboard');
    }, 3000);
  }, [])
  return(
    <div className="container">
      <div className="d-flex justify-content-center">
      <img src={Logo} alt="" className="logo_main" />

      </div>
      <h3 className="titleLouder">כמה רגעים ומתחילים ...</h3>

    </div>
  ) 
}
