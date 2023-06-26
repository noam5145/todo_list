import React,{useContext,useState,useEffect} from 'react'
import { MyContext } from "../../../../App";
import CanvasJSReact from '@canvasjs/react-charts';
//var CanvasJSReact = require('@canvasjs/react-charts');
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

export default function Exception() {
  const { users ,missions} = useContext(MyContext);
  let [data,setData]=useState([]);
  let [missionCounter,setMissionCounter]=useState([]);

  let counterProgress=0;
  let counterException=0;
  let counterPendingApproval=0;

  useEffect(()=>{
    missions.map((item)=>{
      if (item.status=="ממתין לאישור") {
        counterPendingApproval++;
      }
      if (item.status=="בחריגה") {
        counterException++;
      }
      if (item.status=="בתהליך") {
        counterProgress++;
      }
    })
    let missionToDashbord = [{name: "בחריגה",number: counterException},{name: "ממתין לאישור",number: counterPendingApproval},{name: "בתהליך",number: counterProgress}]
    setMissionCounter(missionToDashbord);
    let arr=[];
    if(users[0]) {
      arr = [...users];
    };
    
    for (let i = 0; i < arr.length; i++) {
      arr[i].count = 0;
      for (let j = 0; j < missions.length; j++) {
        missions[j].responsibility.map((resp)=>{
          if(resp === arr[i].username){
               arr[i].count++;
          setData([...data, {username: arr[i].username, count: arr[i].count}]);
          }
        })
      } 
    }
  },[missions]) 

  useEffect(()=>{
    console.log(data);
  }, [data])

  CanvasJS.addColorSet("loby", [
    "#faf7f7","#f01111"
  ])

  const options = {
    animationEnabled: true,
    title: {
      text: "בחריגה"
    },
    subtitles: [{
      text: "" + ((missionCounter[0]?.number)),
      verticalAlign: "center",
      fontSize: 30,
      dockInsidePlotArea: true
    }],
    // backgroundColor: "#080807",
    colorSet: "loby",
    data: [{
      type: "doughnut",
      showInLegend: false,
      indexLabel: "",
      // yValueFormatString: "#,###'%'",
      dataPoints: [{name: 'תקין', y:missionCounter[1]?.number + missionCounter[2]?.number}, {name: 'בחריגה', y:(missionCounter[0]?.number )}]
    }]
  }

  return (
    <div><CanvasJSChart options = {options}/* onRef={ref => this.chart = ref} *//></div>
  )
}
