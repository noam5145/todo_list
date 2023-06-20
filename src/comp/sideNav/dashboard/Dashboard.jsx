import React, {useContext,useEffect} from 'react'
import { MyContext } from "../../../App";
import ExceptionTasks from '../missionExeption/MissionExeption'
export default function Dashboard() {
  const {  missions} = useContext(MyContext);
  
    let counterTasksInProgress=0;
    let counterExceptionTasks=0;
    let counterPendingApproval=0;
    missions.map((item)=>{
      if (item.status== 'בתהליך') {
        counterTasksInProgress++
      }
      if (item.status== 'בחריגה') {
        counterExceptionTasks++
      }
      if (item.status== 'ממתין לאישור') {
        counterPendingApproval++
      }
    })
    let counterToDashbord={
      counterTasksInProgress,
      counterExceptionTasks,
      counterPendingApproval
    }
    
  
  return (
    <div className='container-fluid'>
      <div className='container'>
      <div className='container row'>
      <h2>Dashboard</h2>
      <div className='col-6'>
        <ul className='row'>
          <li className='col-4'>{counterToDashbord.counterExceptionTasks}</li>
          <li className='col-4'>{counterToDashbord.counterPendingApproval}</li>
          <li className='col-4'>{counterToDashbord.counterTasksInProgress}</li>
        </ul>
      </div>
      <div className='col-3'>
        <ul className='row'>
          <li className='col-12'></li>
        </ul>
      </div>
      <div className='col-3'>
        <ul className='row'>
          <li className='col-12'></li>
        </ul>
      </div>
      
      </div>
      </div>
    </div>
  )
}
