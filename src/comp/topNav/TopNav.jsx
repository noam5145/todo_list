import React from 'react'
import { Link } from 'react-router-dom'
import { BsFilterCircleFill } from 'react-icons/bs';
import { AiFillMessage, AiFillPrinter } from 'react-icons/ai';
import { IoSettingsSharp } from 'react-icons/io5';

export default function TopNav() {
  return (
    <div className='row col-12 bg-light sticky-top'>
      <div className='col-7 justify-content-between'>mo </div>
        <div className='col-5 d-flex'>
          <div className='w-100 d-flex justify-content-center'>
          <Link className='btn btn-primary bg-dark w-75 mb-2' to={'/filter'}><BsFilterCircleFill size={25}/></Link>
          </div>
          <div className='w-100 d-flex justify-content-center'>
          <Link className='btn btn-primary bg-dark w-75 mb-2' to={'/message'}><AiFillMessage size={25}/></Link>
          </div>
          <div className='w-100 d-flex justify-content-center'>
          <Link className='btn btn-primary bg-dark w-75 mb-2' to={'/printFile'}><AiFillPrinter size={25}/></Link>
          </div>
          <div className='w-100 d-flex justify-content-center'>
          <Link className='btn btn-primary bg-dark w-75 mb-2' to={'/settings'}><IoSettingsSharp size={25}/></Link>
          </div>
      </div>
    </div>
  )
}
