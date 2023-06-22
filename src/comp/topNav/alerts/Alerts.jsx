import React, {useEffect, useContext, useState} from 'react'
import { MyContext } from '../../../App';

export default function Message() {
const {missions, currentUser} =  useContext(MyContext);
const [alert, setAlert] = useState([]);

  useEffect(() => {
    if (missions[0]) {
      setAlert(
        missions.filter((m) => m.token === currentUser.token)
      );
    }
  }, [missions]);
  return (
 <>
    
    {alert[0]? (
      <div className='container d-flex justify-content-center'>
      <h1 className='m-5 text-info'>אין התראות חדשות</h1>
    </div>
    ): alert.map((e, i)=>(
      <div>{e.title}</div>
    ))}</>
  )
}
