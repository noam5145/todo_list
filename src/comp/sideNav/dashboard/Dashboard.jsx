import React from 'react'
import Exception from './mission/Exception';
import Process from './process/process';
import PendingApproval from './pendingApproval/pendingApproval';
import CountUser from './countUser/countUser';

export default function Dashboard() {
  
  return (
    <div className='container-fluid row d-flex'>

      <div className='col-lg-3'>
        <PendingApproval/>
      </div>
      <div className='col-lg-3'>
        <Process/>
      </div>
      <div className='col-lg-3'>
        <Exception />
      </div>
      <div className='col-lg-3'>
        <CountUser/>
      </div>
    </div>
  )
}
