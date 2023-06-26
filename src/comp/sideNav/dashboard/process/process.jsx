import React,{useContext,useState,useEffect} from 'react'
import { MyContext } from "../../../../App";
import CanvasJSReact from '@canvasjs/react-charts';
//var CanvasJSReact = require('@canvasjs/react-charts');
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

export default function Process() {
  const {  missions} = useContext(MyContext);
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
    setMissionCounter(missionToDashbord)
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
   setData(arr);
//    console.log(missionCounter);
   
  },[missions]) 

  CanvasJS.addColorSet("loby", [
    "#faf7f7","#f01111"
  ])

  const options = {
    animationEnabled: true,
    title: {
      text: "בתהליך"
    },
    subtitles: [{
      text: "" + ((missionCounter[2]?.number)),
      verticalAlign: "center",
      fontSize: 30,
      dockInsidePlotArea: true
    }],
    //backgroundColor: "#F5DEB3",
    colorSet: "loby",
    data: [{
      type: "doughnut",
      showInLegend: false,
      indexLabel: "",
      // yValueFormatString: "#,###'%'",
      dataPoints: [{name: 'תקין', y:missionCounter[1]?.number + missionCounter[0]?.number}, {name: 'בתהליך', y:(missionCounter[2]?.number )}]
    }]
  }

  return (
    <div><CanvasJSChart options = {options}/* onRef={ref => this.chart = ref} *//></div>
  )
}
