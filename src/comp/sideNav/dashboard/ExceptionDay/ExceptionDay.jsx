import React,{useContext,useEffect} from 'react'
import { MyContext } from "../../../../App";
import CanvasJSReact from '@canvasjs/react-charts';
//var CanvasJSReact = require('@canvasjs/react-charts');
 
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

export default function ExceptionDay() {
    const {  missions,daysOff} = useContext(MyContext);
    useEffect(()=>{
        let arrA=[];
        let arr=[];
        let flag=false;
       for (let index = 0; index < missions.length; index++) {
            flag=false;

            for (let j = 0; j < arr.length; j++) {
               if (arr[j].x===missions[index].startedAt&&daysOff(missions[index].endedAt)<0 ) {
                      arr[j].y++;
                      flag=true;
               }
            }
            if (!flag&&daysOff(missions[index].endedAt)<0) {
                 arr.push({x:missions[index].startedAt,y:1})
            }
         
       }
       console.log(arr);
    // arrA=missions.map((item)=>{return(item.startedAt)});
    // arrB =arrA.map((item,i)=>{
    //     if (daysOff(item)<0) {
    //         return({y:item,x:daysOff(item)})
    //     }
    // })
    //  console.log(arrB);
        
    },[missions])
    const options = {
			animationEnabled: true,
			theme: "light2",
			title:{
				text: "משימות נגררות מהעבר"
			},
			axisX:{
				valueFormatString: "",
				crosshair: {
					enabled: true,
					snapToDataPoint: true
				}
			},
			axisY: {
				title: "",
				valueFormatString: "",
				crosshair: {
					enabled: true,
					snapToDataPoint: true,
					labelFormatter: function(e) {
						return  CanvasJS.formatNumber(e.value);
					}
				}
			},
			data: [{
				type: "column",
				xValueFormatString: "",
				yValueFormatString: "",
				dataPoints: [
				  { x: new Date("2011-03-05"), y: 2},
				  { x: new Date("2011-10-01"), y: 3}
				]
			}]
		}
  return (
    <div >
        <CanvasJSChart options = {options} /* onRef={ref => this.chart = ref} *//>
    </div>
  )
}