import React,{useContext,useState,useEffect } from 'react'
import { MyContext } from "../../../../App";
import CanvasJSReact from '@canvasjs/react-stockcharts';
//var CanvasJSReact = require('@canvasjs/react-stockcharts');
 
const CanvasJS = CanvasJSReact.CanvasJS;
const CanvasJSStockChart = CanvasJSReact.CanvasJSStockChart;

export default function ExceptionDay() {



let c=false;
	const {  missions,users, daysOff} = useContext(MyContext);
    let a=[]
    const [options, setOptions] = useState({});	

let mission=missions.map((item)=>{
return({startedAt:item.startedAt.split('/').reverse().join('-'),endedAt:item.endedAt.split('/').reverse().join('-')});
})
const getDataExceptionDay = ()=>{
		mission.map((item, i)=>{
			let counter = 0;
			// if (a[0]) {
				if (daysOff(item?.endedAt)<0 && !(a.find((e, j)=> {counter = j; return e.x === item.startedAt}))) {
					a.push({x:item?.startedAt.split('/').reverse().join('-'),y:1})
				}else if (daysOff(item?.endedAt)<0 && (a.find((e, j)=> {return e.x === item.startedAt}))){
					a[counter].y++;
				}
			// }else{
			// 	a.push({x: item?.startedAt,y:1})
			// }
		})
		
	}
	useEffect(()=>{
		
		getDataExceptionDay()
        a[0]?	setOptions({
			title: {
				text: "משימות חריגות נגררות מהעבר"
			},
			
			charts: [{
				colorSet: "loby",
				data: [{
					//color: "red",
				  type: "column",
				  dataPoints: a.map((item)=>{
					return( { x: new Date(item?.x), y: item?.y })
				  })
			   }]
			}],
			navigator: {
			  slider: {
				minimum: new Date(a[0].x),
				maximum: new Date(a[a.length-1])
			  }
			}
		  })
	
	:""}
	
	,
	
	[c ,missions])
c=true;
	
	  const containerProps = {
		width: "100%",
		height: "400px",
		margin: "0"
	  }
	  if (c) {
		  return (
	<div>

		<CanvasJSStockChart
          options={options}
          containerProps = {containerProps}
        //   onRef={ref => this.stockChart = ref}
        />
	</div>
  )
	  }

}
