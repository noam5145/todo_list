import React from 'react'
import { useContext } from "react"
import { MyContext } from "../../../App"
import "./userTasks.css"


export default function UserTasks() {

  const {missions, users, currentUser} = useContext(MyContext);
  const findMissionsByUser = ()=>{
    (users.map((user, index)=>{
      if(currentUser.token != user.token){
        return(
          <div>
          12345678
          </div>
        )
      }

    }))
  }
  return (
    <div>{users.map((user, index)=>{
      if(currentUser.token != user.token){
        return(
          <div>
          12345678
          </div>
        )
      }
    })}</div>
  )
}
