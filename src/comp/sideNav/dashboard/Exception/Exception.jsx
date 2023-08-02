import React,{useContext,useState,useEffect} from 'react'
import { MyContext } from "../../../../App";
import CanvasJSReact from '@canvasjs/react-charts';
//var CanvasJSReact = require('@canvasjs/react-charts');
const CanvasJS = CanvasJSReact.CanvasJS;
const CanvasJSChart = CanvasJSReact.CanvasJSChart;

export default function Exception() {
  const { users ,missions,daysOff} = useContext(MyContext);
  const [data,setData]=useState([]);
  const [missionCounter,setMissionCounter]=useState([]);
  const [options, setOptions] = useState({});

  
  let flag = true;
  useEffect(()=>{
    if(missions[0] && !missionCounter[0]){
      let counterOther=0;
      let counterException=0;
      missions.map((item)=>{
        if (daysOff(item.endedAt) < 0) {
          counterException++;
        }
        else{
          counterOther++;
        }
        // console.log(daysOff(item.das));
      })

      let missionToDashbord = [{name: "בחריגה",number: counterException},{name: "אחר",number: counterOther}]
      setMissionCounter(missionToDashbord)
    } 

    if(users[0] ){
      getCountOfUser();
      flag = false;
    }
  },[missions]) 


  useEffect(()=>{
    if (missionCounter[0]) {

      setOptions({
        // animationEnabled: true,
        title: {
          text: "בחריגה"

        },
        subtitles: [{
          text: "" + (missionCounter[0].number),
          verticalAlign: "center",
          // fontFamily: 'ariel',
          fontSize: 30,
          dockInsidePlotArea: true,
        }],
        // backgroundColor: "#080807",
        colorSet: "loby",
        data: [{
          type: "doughnut",
          showInLegend: false,
          indexLabel: "",
          // yValueFormatString: "#,###'%'",
          dataPoints: [{label: 'אחר', y:missionCounter[1].number}, {label: 'בחריגה', y:missionCounter[0].number}]
        }]
      })
    }

  },[missionCounter])


  const getCountOfUser = ()=>{
    let arr=[];
    if(users[0]) {
      arr = [...users];
    };
    let newArr = [];
    for (let i = 0; i < arr.length; i++) {
      arr[i].count = 0;
      for (let j = 0; j < missions.length; j++) {
        if(missions[j].responsibility.filter((resp)=>resp === arr[i].username)[0]){
          arr[i].count++;
          newArr[i] = {username: arr[i].username, count: arr[i].count}
        }
      } 
    }
    setData(newArr);
  } 

  CanvasJS.addColorSet("loby", [
    "#faf7f7","#d32f2f"
  ])

  return (
    <div><CanvasJSChart options = {options}/* onRef={ref => this.chart = ref} *//></div>
  )
}