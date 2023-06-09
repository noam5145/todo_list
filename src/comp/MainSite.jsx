import React, { useContext, useEffect } from "react";
import { MyContext } from "../App";
import { Link } from "react-router-dom";
import SideNav from './sideNav/SideNav';
import TopNav from './topNav/TopNav';

export default function MainSite() {
  const {} = useContext(MyContext);
  return(
    <>
      main
    </>
  ) 
}
