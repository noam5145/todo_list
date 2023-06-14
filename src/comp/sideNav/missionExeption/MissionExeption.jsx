import React from 'react'
import { Chart } from "react-google-charts";


export default function exceptionTasks() {
    const data = [
        ["Task", "Hours per Day"],
        ["Work", 11],
        ["Eat", 2],
        
      ];

      const options = {
        title: "בחריגה",
        pieHole: 0.6,
        is3D: false,
      };

  return (
    <div>
        <h3>exception Tasks</h3>
         <Chart
      chartType="PieChart"
      width="100%"
      height="400px"
      data={data}
      options={options}
    />

    </div>
  )
}


