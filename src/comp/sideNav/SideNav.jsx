import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaBars, FaHourglassHalf } from 'react-icons/fa';
import { AiOutlineDashboard } from 'react-icons/ai';
import { MdOutlineCreateNewFolder } from 'react-icons/md';
import { RiInsertRowTop } from 'react-icons/ri';
import { BsListTask } from 'react-icons/bs';
import "./sideNav.css"

export default function SideNav() {
  const [showSideNav, setShowSideNav] = useState(true);
  return (
    <>
      <div className={showSideNav ? "col-3 side_Nav":"col-1 side_Nav"}>
        <div className={showSideNav ? "d-flex justify-content-end mt-2":"d-flex justify-content-center mt-2"}>
          <FaBars onClick={() => setShowSideNav(!showSideNav)} color='red' size={40} />
        </div>
        <div className='d-flex justify-content-center mt-4'>
         {showSideNav ? <img height={200} width={200} src='https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/IDF_GOC_Army_Headquarters_From_2020_%28Alternative%29.svg/1200px-IDF_GOC_Army_Headquarters_From_2020_%28Alternative%29.svg.png' />
          :<img height={80} width={80} src='https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/IDF_GOC_Army_Headquarters_From_2020_%28Alternative%29.svg/1200px-IDF_GOC_Army_Headquarters_From_2020_%28Alternative%29.svg.png' />}
        </div>
        <div className="mt-5">
        <Link to={'/dashboard'} className='d-flex justify-content-center pl-0 pr-0 col-12 mb-4 nav-link'>{showSideNav &&<h4 className="d-flex align-items-center mb-0 mr-2">Dashboard</h4>}<div className="d-flex align-items-center"><AiOutlineDashboard size={35} /></div></Link>
        <Link to={'/addMissions'} className='d-flex justify-content-center pl-0 pr-0 col-12 mb-4 nav-link'>{showSideNav &&<h4 className="d-flex align-items-center mb-0 mr-2">Add Missions</h4>}<div className="d-flex align-items-center"><MdOutlineCreateNewFolder size={35} /></div></Link>
        <Link to={'/missionExeption'} className='d-flex justify-content-center pl-0 pr-0 col-12 mb-4 nav-link'>{showSideNav &&<h4 className="d-flex align-items-center mb-0 mr-2">Mission Exeption</h4>}<div className="d-flex align-items-center"><FaHourglassHalf size={35} /></div></Link>
        <Link to={'/pendingMissions'} className='d-flex justify-content-center pl-0 pr-0 col-12 mb-4 nav-link'>{showSideNav &&<h4 className="d-flex align-items-center mb-0 mr-2">Pending Missions</h4>}<div className="d-flex align-items-center"><RiInsertRowTop size={35} /></div></Link>
        <Link to={'/taskList'} className='d-flex justify-content-center pl-0 pr-0 col-12 mb-4 nav-link'>{showSideNav &&<h4 className="d-flex align-items-center mb-0 mr-2">BsListTask</h4>}<div className="d-flex align-items-center"><BsListTask size={35} /></div></Link>
        </div>
      </div>
    </>


  )
}
