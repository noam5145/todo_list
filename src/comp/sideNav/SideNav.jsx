import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaHourglassHalf } from "react-icons/fa";
import { RxHamburgerMenu } from "react-icons/rx";
import { AiOutlineClose, AiOutlineDashboard } from "react-icons/ai";
import { MdOutlineCreateNewFolder } from "react-icons/md";
import { RiInsertRowTop } from "react-icons/ri";
import { BsListTask } from "react-icons/bs";
import "./sideNav.css";

export default function SideNav() {
  const [showSideNav, setShowSideNav] = useState(false);
  const [click, setClick] = useState([false, false, false, false, false]);

  function changeClick(num) {
    const newArray = [false, false, false, false, false];
    newArray[num] = true;
    setClick(newArray);
  }

  return (
    <>
      <div className={showSideNav ? "col-2 side_Nav" : "side_Nav"}>
        <div
          className={
            showSideNav
              ? "d-flex justify-content-end mx-2 mt-2"
              : "d-flex justify-content-center mt-2"
          }
        >
          <div className="mt-3" onClick={() => setShowSideNav(!showSideNav)}>
            {!showSideNav ? (
              <RxHamburgerMenu color="black" size={40} />
            ) : (
              <AiOutlineClose color="black" size={20} />
            )}
          </div>
        </div>
        <div className="d-flex justify-content-center mt-5 p-2">
          <img
            height={showSideNav ? "140" : "50"}
            width={showSideNav ? "140" : "50"}
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/IDF_GOC_Army_Headquarters_From_2020_%28Alternative%29.svg/1200px-IDF_GOC_Army_Headquarters_From_2020_%28Alternative%29.svg.png"
          />
        </div>
        <div className="iconsNavSide">
          <div
            onClick={() => changeClick(0)}
            className={click[0] ? "b_c_icon" : ""}
          >
            {" "}
            <Link
              to={"/dashboard"}
              className={
                showSideNav
                  ? "d-flex justify-content-start s_n_margin pl-0 pr-0 col-12 nav-link s_n_hover "
                  : "d-flex justify-content-center pl-0 pr-0 col-12 nav-link s_n_hover iconsSide "
              }
            >
              <AiOutlineDashboard
                className="iconNavSaid"
                size={showSideNav ? "25" : "40"}
              />

              {showSideNav && (
                <div className="d-flex align-items-center mb-0 s_n_margin">
                  {" "}
                  דשבורד משימות
                </div>
              )}
            </Link>
          </div>
          <div
            onClick={() => changeClick(1)}
            className={click[1] ? "b_c_icon" : ""}
          >
            <Link
              to={"/taskList"}
              className={
                showSideNav
                  ? "d-flex justify-content-start s_n_margin pl-0 pr-0 col-12 nav-link s_n_hover "
                  : "d-flex justify-content-center pl-0 pr-0 col-12 iconsSide nav-link s_n_hover "
              }
            >
              <MdOutlineCreateNewFolder
                className="iconNavSaid"
                size={showSideNav ? "25" : "40"}
              />
              {showSideNav && (
                <div className="d-flex align-items-center mb-0 s_n_margin">
                  מאגר משימות
                </div>
              )}
            </Link>
          </div>
          <div
            onClick={() => changeClick(2)}
            className={click[2] ? "b_c_icon" : ""}
          >
            {" "}
            <Link
              to={"/missionExeption"}
              className={
                showSideNav
                  ? "d-flex justify-content-start s_n_margin pl-0 pr-0 col-12 nav-link s_n_hover "
                  : "d-flex justify-content-center pl-0 pr-0 col-12 iconsSide nav-link s_n_hover "
              }
            >
              <FaHourglassHalf
                className="iconNavSaid"
                size={showSideNav ? "25" : "40"}
              />
              {showSideNav && (
                <div className="d-flex align-items-center mb-0 s_n_margin">
                  דוח משימות בחריגה{" "}
                </div>
              )}
            </Link>
          </div>
          <div
            onClick={() => changeClick(3)}
            className={click[3] ? "b_c_icon" : ""}
          >
            <Link
              to={"/pendingMissions"}
              className={
                showSideNav
                  ? "d-flex justify-content-start s_n_margin pl-0 pr-0 col-12 nav-link s_n_hover "
                  : "d-flex justify-content-center pl-0 pr-0 col-12 iconsSide nav-link s_n_hover "
              }
            >
              <RiInsertRowTop
                className="iconNavSaid"
                size={showSideNav ? "25" : "40"}
              />

              {showSideNav && (
                <div className="d-flex align-items-center mb-0 s_n_margin">
                  דוח ממתינות לאישור
                </div>
              )}
            </Link>
          </div>

          <div
            onClick={() => changeClick(4)}
            className={click[4] ? "b_c_icon" : ""}
          >
            <Link
              to={"/addMissions"}
              className={
                showSideNav
                  ? "d-flex justify-content-start s_n_margin pl-0 pr-0 col-12 nav-link s_n_hover "
                  : "d-flex justify-content-center pl-0 pr-0 col-12 iconsSide nav-link s_n_hover "
              }
            >
              <BsListTask
                className="iconNavSaid"
                size={showSideNav ? "25" : "40"}
              />

              {showSideNav && (
                <div className="d-flex align-items-center mb-0 s_n_margin">
                  הוספת משימות
                </div>
              )}
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
