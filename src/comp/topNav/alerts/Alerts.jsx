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
 <div className='container d-flex justify-content-center'>
    
    {alert[0]? (
      <div className=''>
      <h1 className='m-5 text-secondary'>אין התראות חדשות</h1>
    </div>
    ): <div className=' mt-5'>
      <h3 className='text-success'>
      התקבלו משימות חדשות עבורך 

      </h3>
      {alert.map((e, i)=>(
      <div>{e.title}</div>
    ))}
    </div>}</div>
  )
}
