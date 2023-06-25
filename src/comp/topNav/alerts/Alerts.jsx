import React, {useEffect, useContext, useState} from 'react'
import { MyContext } from '../../../App';

export default function Message() {
const { newMissions, currentUser, updateUser} =  useContext(MyContext);
const [alert, setAlert] = useState([]);
// console.log(currentUser);
// const location = useLocation();


useEffect(()=>{
  console.log(newMissions);
  if(newMissions[0]){
    setAlert(newMissions)
  }
},[newMissions])



function deletAletrs(){
    currentUser.newMissions = [];
    updateUser(currentUser, currentUser.token)
    console.log(currentUser);
     
  }



  return (
 <div className='container d-flex justify-content-center'>
    
    {!alert[0]? (
      <div className=''>
      <h1 className='m-5 text-secondary'>אין התראות חדשות</h1>
    </div>
    ): <div className='container mt-5'>
      
      <h3 className='text-success d-flex justify-content-center'>
      התקבלו משימות חדשות עבורך 

      </h3>
      <div className="btn" onClick={deletAletrs}>אשר קריאה </div>
      <div className="mt-5">
      <div className=" row d-flex justify-content-center">
        <div className="col-1 top_table text-center">מזהה</div>
        <div className="col-1 top_table text-center">מועד משימה </div>
        <div className="col-1 top_table text-center">כותרת משימה </div>
        <div className="col-3 top_table text-center">פירוט משימה </div>
        <div className="col-1 top_table text-center">מסמכים מצורפים</div>
        <div className="col-1 top_table text-center">אחריות </div>
        <div className="col-1 top_table text-center">תג"ב </div>
        <div className="col-1 top_table text-center">ימים שנותרו </div>
        <div className="col-1 top_table text-center">סטאטוס </div>
      </div>
   

    </div>
    {alert.map((mission, index) => {
        return (
          <div className="row d-flex justify-content-center" key={index}>
            <div className="col-1 border d-flex justify-content-center table_h">
              {mission.missionId}
            </div>
            <div className="col-1 border d-flex justify-content-center text-center table_h">
              {mission.startedAt}
            </div>
            <div className="col-1 border d-flex justify-content-center text-center table_h">
              {mission.title}
            </div>
            <div className="col-3 col-1 border d-flex justify-content-center text-center table_h">
              {mission.details}
            </div>
            <div className="col-1 border d-flex justify-content-center text-center table_h">
              ---
            </div>
            <div className="col-1 border d-flex justify-content-center text-center table_h">
              {mission.responsibility}{" "}
            </div>
            <div className="col-1 border d-flex justify-content-center text-center table_h">
              {mission.endedAt}
            </div>
            <div className="col-1 border d-flex justify-content-center text-center table_h">
              ---
            </div>
            <div className="col-1 border d-flex justify-content-center text-center table_h">
              {mission.status}{" "}
            </div>
          </div>
        );
      })}
    </div>}</div>
  )
}
