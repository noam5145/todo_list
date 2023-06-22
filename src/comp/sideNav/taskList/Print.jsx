import React from 'react'
import "./TaskList.css"
export default function Print({ allDataShow,toPrintRef }) {
    return (
        <>
            {allDataShow?.map((item, i) => (
                <div key={i} ref={toPrintRef} className="d-flex d-black justify-content-start print mt-2" dir="rtl">
                    <ul className="col-7 list-unstyled">
                        <h3 className="">{item?.title}</h3>
                        <li className="d-flex"><samp className="h5"> מזהה: </samp><b>{item?.missionId}</b> </li>
                        <li><samp className="h5"> תאריך התחלת משימה: </samp><b>{item?.endedAt}</b></li>
                        <li><samp className="h5"> תאריך סיום משימה: </samp><b>{item?.startedAt}</b></li>
                        <li><samp className="h5"> ימים שנותרו למשימה: </samp><b>{item?.daysLeft}</b></li>
                        <li><samp className="h5"> אחריות המשימה: </samp><b>{item?.responsibility}</b></li>
                        <li><samp className="h5"> פרטי משימה: </samp><div><b>{item?.details}</b></div></li>
                        <li><samp className="h5"> סטאטוס משימה: </samp><b>{item?.status}</b></li>
                    </ul>
                </div>
            ))}
        </>
    )
}
