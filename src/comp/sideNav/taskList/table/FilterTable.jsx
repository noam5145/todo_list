import React, { useContext } from 'react'
import "../taskList.css";
import { MyContext } from '../../../../App';

export default function ({ setAllDataShow }) {
    const { missions } = useContext(MyContext)

    const SortByContentFound = (content, field) => {
        const newFilter = missions.filter(item => item[field].includes(content));
        setAllDataShow(newFilter);
    };
    const SortByContentSelect = (content,) => {
        const newFilter = missions.filter(item => item.status.includes(content));
        setAllDataShow(newFilter);
    };


    return (
        <>
            <div className="container d-flex justify-content-center p-0">
                <input className="col-1 the_table_search bg-light" placeholder=" הכנס מספר..." type="number" id="missionId" onChange={(e) => SortByContentFound(e.target.value, e.currentTarget.id)} />
                <input className="col-1 the_table_search bg-light p-1" type="date" id="startedAt" onChange={(e) => SortByContentFound(e.target.value, e.currentTarget.id)} />
                <input className="col-1 the_table_search bg-light" placeholder=" הכנס טקסט..." id="title" type="text" onChange={(e) => SortByContentFound(e.target.value, e.currentTarget.id)} />
                <input className="col-3 the_table_search bg-light" placeholder=" הכנס טקסט..." id="details" type="text" onChange={(e) => SortByContentFound(e.target.value, e.currentTarget.id)} />
                <div className="col-1 the_table_search bg-light">----</div>
                <input className="col-1 the_table_search bg-light" placeholder=" הכנס טקסט..." id="responsibility" type="text" onChange={(e) => SortByContentFound(e.target.value, e.currentTarget.id)} />
                <input className="col-1 the_table_search bg-light p-1" placeholder=" הכנס תאריך..." id="endedAt" type="date" onChange={(e) => SortByContentFound(e.target.value, e.currentTarget.id)} />
                <input className="col-1 the_table_search bg-light p-1" placeholder=" הכנס מספר..." id="daysLeft" type="number" onChange={(e) => SortByContentFound(e.target.value, e.currentTarget.id)} />
                <div className="col-1 the_table_search bg-light" style={{ border: "none" }}>
                    <select className="form-select" style={{ cursor: "pointer" }} onChange={(e) => SortByContentSelect(e.target.value, e.currentTarget.id)}>
                        <option value="בוצע">בוצע</option>
                        <option value="חריגה">חריגה</option>
                        <option value="בתהליך">בתהליך</option>
                        <option value="ממתין לאישור">ממתין לאישור</option>
                    </select>
                </div>
                <div className="col-1 the_table_search bg-light">----</div>
            </div>
        </>
    )
}
