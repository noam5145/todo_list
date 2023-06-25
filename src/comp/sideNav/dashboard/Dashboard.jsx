import React, {useContext,useEffect,useState} from 'react'
import { MyContext } from "../../../App";
export default function Dashboard() {
  const {  missions} = useContext(MyContext);
  let [data,setData]=useState([])
  useEffect(()=>{
    // console.log(missions)
    let arr=[];
    let temp=missions.map((mission)=>{
           let flag=false;
           arr.map((item)=>{
            if (item.responsibility==mission.responsibility) {
              flag=true;
              item.count++;
            }
           })
          if (!flag) {
            arr=[...arr,{responsibility:mission.responsibility,count:1}]
          } 
    })
   setData(arr)

// console.log(arr)
  },[missions])
    
  
  return (
    <div className='container-fluid'>
      <div className='container'>
      <div className='container row'>
      <h2>Dashboard</h2>
      <div className='col-6'>
        <ul className='row'>
          <li className='col-4'></li>
          <li className='col-4'></li>
          <li className='col-4'></li>
         
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
