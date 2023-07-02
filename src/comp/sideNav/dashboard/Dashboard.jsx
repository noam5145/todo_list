import React, {useContext} from 'react'

import { MyContext } from '../../../App';
import { CircularProgress } from "@mui/material";
import Process from './Process/Process';
import Exception from './Exception/Exception';
import CountUser from './countUser/CountUser';
import PendingApproval from './PendingApproval/PendingApproval';
import ExceptionDay from './ExceptionDay/ExceptionDay';


export default function Dashboard() {
  const {loading} = useContext(MyContext)
  
  return (
    
    <div className='container-fluid '>
{!loading ? (  
<div className='row d-flex'><div className='col-lg-3'>
        <PendingApproval/>
      </div>
      <div className='col-lg-3'>
        <Process/>
      </div>
      <div className='col-lg-3'>
        <Exception/>
      </div>
      <div className='col-lg-3 h-100'>
        <CountUser/>
      </div>
      <div className='col-lg-9 h-100'>
        <ExceptionDay/>
      </div>
</div>
) :(<div className="container">
<div className="d-flex justify-content-center align-items-center my-5">
  <CircularProgress />
</div>
</div>)}
     
    </div>
  )
}