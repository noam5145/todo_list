import React, {useContext,useEffect,useState} from 'react'
import { MyContext } from "../../../App";
export default function Dashboard() {
  const {  missions} = useContext(MyContext);
  let [data,setData]=useState([])
  useEffect(()=>{
    console.log(missions)
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

console.log(arr)
  },[missions])
    
  
  
  return (
    <div className='container-fluid'>
      <div className='container'>
      </div>
    </div>
  )
}
