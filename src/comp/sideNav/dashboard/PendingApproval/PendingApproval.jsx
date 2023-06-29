import React,{useContext,useState,useEffect} from 'react'
import { MyContext } from "../../../../App";
import CanvasJSReact from '@canvasjs/react-charts';
//var CanvasJSReact = require('@canvasjs/react-charts');
const CanvasJS = CanvasJSReact.CanvasJS;
const CanvasJSChart = CanvasJSReact.CanvasJSChart;

export default function PendingApproval() {
  const { users ,missions} = useContext(MyContext);
  const [data,setData]=useState([]);
  const [missionCounter,setMissionCounter]=useState([]);
  const [options, setOptions] = useState({});

  let flag = true;

    useEffect(()=>{
    if(missions[0] && !missionCounter[0]){
      let counterOther=0;
      let counterPendingApproval=0;
      missions.map((item)=>{
        if (item.status === "ממתין לאישור") {
          counterPendingApproval++;
        }
        else  {
          counterOther++;
        }

      })

      let missionToDashbord = [{name: "ממתין לאישור",number: counterPendingApproval},{name: "אחר",number: counterOther}]
      setMissionCounter(missionToDashbord)
    } 

  },[missions]) 

    useEffect(()=>{
    if (missionCounter[0]) {

      setOptions({
        // animationEnabled: true,
        title: {
          text: "ממתין לאישור"
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
          dataPoints: [{label: 'אחר', y:missionCounter[1].number}, {label: 'ממתין לאישור', y:missionCounter[0].number}]
        }]
      })
    }

      CanvasJS.addColorSet("loby", [
    "#faf7f7","#f01111"
  ])

  },[missionCounter])


  return (
    <div><CanvasJSChart options = {options}/* onRef={ref => this.chart = ref} *//></div>
  )
}