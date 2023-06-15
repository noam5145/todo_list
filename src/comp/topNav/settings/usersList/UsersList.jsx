import React from 'react'
import "./usersList.css"

export default function UsersList() {
  return (
    <div className='d-flex justify-content-center'>
    <div className='row container'>
        <div className="col-2 border d-flex justify-content-center align-items-center table_h">רמ"ד הכשרות</div>
        <div className="col-2 border d-flex justify-content-center align-items-center table_h">מקשא"פ</div>
        <div className="col-2 border d-flex justify-content-center align-items-center table_h">פיקוד</div>
        <div className="col-2 border d-flex justify-content-center align-items-center table_h">---</div>
        <div className="col-2 border d-flex justify-content-center align-items-center table_h">מנהל</div>
        <div className="col-2 border d-flex justify-content-center align-items-center table_h">נועם</div>
    </div>
    </div>

  )
}
