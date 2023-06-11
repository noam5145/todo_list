import React from 'react'
import { Link } from 'react-router-dom'
import { BsFilterCircleFill } from 'react-icons/bs';
import { AiFillMessage, AiFillPrinter } from 'react-icons/ai';
import { IoSettingsSharp } from 'react-icons/io5';
import "./topNav.css"
export default function TopNav() {
  return (
    <div className='row m-0 align-items-center top_nav'>
      <div className='col-7 d-flex mx-sm-3 mx-0'>Gal 😜</div>
        <div className='col-4 d-flex justify-content-between'>
          <div className=''>
          <Link className='' to={'/filter'}><BsFilterCircleFill size={25}/></Link>
          </div>
          <div className=''>
          <Link className=' ' to={'/message'}><AiFillMessage size={25}/></Link>
          </div>
          <div className=''>
          <Link className='' to={'/printFile'}><AiFillPrinter size={25}/></Link>
          </div>
          <div className=''>
          <Link className='' to={'/settings'}><IoSettingsSharp size={25}/></Link>
          </div>
      </div>
    </div>
  )
}
