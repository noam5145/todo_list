import React from 'react'
import Exception from './mission/Exception';
import Process from './process/process';

export default function Dashboard() {
  
  return (
    <div className='container-fluid row d-flex'>
      <div className='col-lg-4'>
        <Exception />
      </div>
      <div className='col-lg-4'>
        <Process/>
      </div>
    </div>
  )
}
