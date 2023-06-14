import React, { useState } from 'react'
import "./missionExeption.css"
import DataTable from "react-data-table-component";

export default function MissionExeption() {


  const columns = [
    {
  name: 'אחריות',
  selector: row => row.res,
  sortable:true,
  style:{ backgroundColor: "red"},
  
},
    {
        name: "מזהה",
        selector: row => row.id,
        sortable:true,
        height: "70px",
        allowOverflow:true,
          wrap:true,
         style:{overflow:"auto",height:"50px",borderLeft:"1px solid black"},
      
    },
    {
      name: 'כותרת המשימה ',
      selector: row => row.title,
      sortable:true,
      height: "70px",
      allowOverflow:true,
        wrap:true,
       style:{overflow:"auto",height:"50px",},
      
  },
  {
    name: ' פירוט המשימה ',
    selector: row => row.missoin,
    sortable:true,
      height: "70px",
      allowOverflow:true,
        wrap:true,
       style:{overflow:"auto",height:"50px",},
},

{
  name: 'תג"ב',
  selector: row => row.yearEnd,
  sortable:true,
  
},
{
  name: 'חריגה',
  selector: row => row.leftDays,
  sortable:true,
  
},
{
  name: 'הערות אחראי',
  selector: row => row.Remarks,
  sortable:true,
  
},
{
  name: 'הערות מפקד',
  selector: row => row.RemarksC,
  sortable:true,
  
},

];

const data = [
    {
        id: 1,
        title: 'Beetlejuasdfdhadvcsdddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddugddfghjkkkkkkkkkkkkkkkkkkkkkkkkcvuasbuhsicdtyuikjhsdfghjkl;gfde',
        year: '1988',

    },
    {
        id: 2,
        title: 'Ghostbusters',
        year: '1987',
    },
    {
        id: 3,
        title: 'Beetlejuasdfdhadvcsdddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddugddfghjkkkkkkkkkkkkkkkkkkkkkkkkcvuasbuhsicdtyuikjhsdfghjkl;gfde',
        year: '1986',
    },
    {
        id: 4,
        title: 'Ghostbusters',
        year: '1985',
    },
    {
        id: 5,
        title: 'Beetlejuasdfdhadvcsdddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddugddfghjkkkkkkkkkkkkkkkkkkkkkkkkcvuasbuhsicdtyuikjhsdfghjkl;gfde',
        year: '1984',
    },
    {
        id: 6,
        title: 'Ghostbusters',
        year: '1983',
    },
    {
        id: 7,
        title: 'Beetlejuasdfdhadvcsdddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddugddfghjkkkkkkkkkkkkkkkkkkkkkkkkcvuasbuhsicdtyuikjhsdfghjkl;gfde',
        year: '1982',
    },
    {
        id: 8,
        title: 'Gh11ostbusters',
        year: '1981',
    },
    {
        id: 9,
        title: 'Ghostbusters',
        year: '1980',
    },
    {
        id: 10,
        title: 'Beetlejuasdfdhadvcsdddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddugddfghjkkkkkkkkkkkkkkkkkkkkkkkkcvuasbuhsicdtyuikjhsdfghjkl;gfde',
        year: '1940',
    },
    {
        id: 11,
        title: 'Ghostbusters',
        year: '1912',
    },

]

// const [records,setRecords]=useState(data);
// const [sortType,setSortType]=useState("id");


// function handleCliker(e) {
//  if (e.target.value==="") {
//     setRecords(data);
//     return;
//   }
//   console.log(e.target.value);
//   const temp=records.filter(row=>{
//     return row.title.includes(e.target.value);
//   })
 
//   setRecords(temp);
//   console.log(temp);
//   return;
// }

  return (
    <>
    <div className='container ' >
      <div className="exception-title">
        <h1>דו"ח משימות בחריגה</h1>
      </div>

    {/* <input placeholder='Search' className='search-input-table' type="text" onChange={handleCliker}/> */}
{/* 
    <label for="cars">Choose a car:</label>
<select onChange={(e)=>{setSortType(e.target.value)}} id="cars" name="cars">
  <option value="id">מזהה</option>
  <option value="year">מועד פגישה</option>
  <option value="fiat">Fiat</option>
  <option value="audi">Audi</option>
</select> */}
    <DataTable
      responsive
    fixedHeader
    highlightOnHover
        columns={columns}
        data={data}
         pagination 
    />
    </div> 
</>
  )
}
