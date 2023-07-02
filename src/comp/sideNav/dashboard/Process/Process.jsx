import React,{useContext,useState,useEffect} from 'react'
import { MyContext } from "../../../../App";
import CanvasJSReact from '@canvasjs/react-charts';
//var CanvasJSReact = require('@canvasjs/react-charts');
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

export default function Process() {
  const {  missions ,daysOff} = useContext(MyContext);
  const [data,setData]=useState([]);
  const [missionCounter,setMissionCounter]=useState([]);
  const [options, setOptions] = useState({});

  useEffect(()=>{
    let counterProgress=0;
    let counterOther=0;

    
    missions.map((item)=>{
      if (daysOff(item.endedAt) > -1 && item.status == "בתהליך") {
        counterProgress++;
      }
      else  {
        counterOther++;
      }
    })
    let missionToDashbord = [{name: "בתהליך",number: counterProgress},{name: "אחר",number: counterOther}]
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

   
  },[missions]) 

  useEffect(()=>{
    if (missionCounter[0]) {

      setOptions({
        // animationEnabled: true,
        title: {
          text: "בתהליך"
        },
        subtitles: [{
          text: "" + (missionCounter[0].number),
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
          dataPoints: [{label: 'אחר', y:missionCounter[1].number}, {label: 'בתהליך', y:missionCounter[0].number}]
        }]
      })
    }

  },[missionCounter])

  CanvasJS.addColorSet("loby", [
    "#faf7f7","#f01111"
  ])

  return (
    <div><CanvasJSChart options = {options}/* onRef={ref => this.chart = ref} *//></div>
  )
}