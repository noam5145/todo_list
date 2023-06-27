import React,{useContext,useState,useEffect } from 'react'
import { MyContext } from "../../../../App";
import CanvasJSReact from '@canvasjs/react-charts';
//var CanvasJSReact = require('@canvasjs/react-charts')

const CanvasJS = CanvasJSReact.CanvasJS;
const CanvasJSChart = CanvasJSReact.CanvasJSChart;

export default function CountUser() {
    const {  missions,users} = useContext(MyContext);
    const [data,setData]=useState([]);
    const [options, setOptions] = useState({});
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
        console.log(data);

      }
    	
	  let flag = true;

    useEffect(()=>{
        if(users[0] ){
            getCountOfUser();
            flag = false;
          }
        setOptions(   
            {
            animationEnabled: false,
            theme: "light2",
            title:{
                text: "סטטוס הנחיות לפי אחריות"
            },
            axisX: {
                title: "",
                reversed: true,
            },
            axisY: {
                title: "",
                includeZero: true,
                //labelFormatter: this.addSymbols
            },
            data: [{
                type: "bar",
                dataPoints: [
                    
                    { y:  2000000000, label: "FaceBook" },
                    { y:  1800000000, label: "YouTube" },
                    { y:  800000000, label: "Instagram" },
                    { y:  563000000, label: "Qzone" },
                    { y:  376000000, label: "Weibo" },
                    { y:  336000000, label: "Twitter" },
                    { y:  330000000, label: "Reddit" }
                ]

            }]
        })

    },[users])

  console.log(data);


  return (
    <div>
    <CanvasJSChart options = {options} /* onRef={ref => this.chart = ref} *//>
    </div>
  )
}

