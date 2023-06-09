import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaBars, FaHourglassHalf } from 'react-icons/fa';
import { AiOutlineDashboard } from 'react-icons/ai';
import { MdOutlineCreateNewFolder } from 'react-icons/md';
import { RiInsertRowTop } from 'react-icons/ri';
import { BsListTask } from 'react-icons/bs';

export default function SideNav() {
  const [showSideNav, setShowSideNav] = useState(true);
  return (
    <>
    {showSideNav ? 
    <div className='row col-3 bg-black rounded'>
      <div className='d-flex flex-column align-items-center p-3'>
        <div className='w-100'>
          <FaBars onClick={()=> setShowSideNav(!showSideNav)} className='bg-light' size={40}/>
        </div>
        <div className='w-100 d-flex justify-content-center'>
          <img className='w-50 mb-5' src='https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/IDF_GOC_Army_Headquarters_From_2020_%28Alternative%29.svg/1200px-IDF_GOC_Army_Headquarters_From_2020_%28Alternative%29.svg.png'/>
        </div>
        <div className='w-100 d-flex justify-content-center'>
        <Link className=' btn btn-primary bg-dark w-75 mb-2' to={'/dashboard'}>Dashboard <AiOutlineDashboard size={30}/></Link>
        </div>
        <div className='w-100 d-flex justify-content-center'>
        <Link className='btn btn-primary bg-dark w-75 mb-2' to={'/addMissions'}>Add Missions <MdOutlineCreateNewFolder size={30}/> </Link>
        </div>
        <div className='w-100 d-flex justify-content-center'>
        <Link className='btn btn-primary bg-dark w-75 mb-2' to={'/missionExeption'}>Mission Exeption <FaHourglassHalf size={30}/> </Link>
        </div>
        <div className='w-100 d-flex justify-content-center'>
        <Link className='btn btn-primary bg-dark w-75 mb-2' to={'/pendingMissions'}>Pending Missions <RiInsertRowTop size={30}/> </Link>
        </div>
        <div className='w-100 d-flex justify-content-center'>
        <Link className='btn btn-primary bg-dark w-75 mb-2' to={'/taskList'}>Task List <BsListTask size={30}/> </Link>
        </div>
      </div>
    </div> :
    <div className='row vh-75 col-1 bg-light '>
      <div className='d-flex flex-column align-items-center p-0'>
        <div className='d-flex w-100 justify-content-center'>
          <FaBars onClick={()=> setShowSideNav(!showSideNav)} className='bg-light' size={40}/>
        </div>
        <div className='w-100 d-flex justify-content-center'>
          <img className='w-100 mt-3 mb-5' src='https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/IDF_GOC_Army_Headquarters_From_2020_%28Alternative%29.svg/1200px-IDF_GOC_Army_Headquarters_From_2020_%28Alternative%29.svg.png'/>
        </div>
        <div className=' d-flex justify-content-center'>
        <Link className='btn btn-primary bg-dark w-75 mb-2' to={'/dashboard'}><AiOutlineDashboard size={30}/></Link>
        </div>
        <div className='w-100 d-flex justify-content-center'>
        <Link className='btn btn-primary bg-dark w-75 mb-2' to={'/addMissions'}><MdOutlineCreateNewFolder size={30}/> </Link>
        </div>
        <div className='w-100 d-flex justify-content-center'>
        <Link className='btn btn-primary bg-dark w-75 mb-2' to={'/missionExeption'}><FaHourglassHalf size={30}/> </Link>
        </div>
        <div className='w-100 d-flex justify-content-center'>
        <Link className='btn btn-primary bg-dark w-75 mb-2' to={'/pendingMissions'}><RiInsertRowTop size={30}/> </Link>
        </div>
        <div className='w-100 d-flex justify-content-center'>
        <Link className='btn btn-primary bg-dark w-75 mb-2' to={'/taskList'}><BsListTask size={30}/> </Link>
        </div>
      </div>
    </div>
    }
    </>


  )
}
