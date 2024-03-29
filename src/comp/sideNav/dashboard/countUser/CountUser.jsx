import React,{useContext,useState,useEffect } from 'react'
import { MyContext } from "../../../../App";
import CanvasJSReact from '@canvasjs/react-charts';
//var CanvasJSReact = require('@canvasjs/react-charts')

const CanvasJS = CanvasJSReact.CanvasJS;
const CanvasJSChart = CanvasJSReact.CanvasJSChart;

export default function CountUser() {
    const {  missions,users, daysOff} = useContext(MyContext);
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
              if (daysOff(missions[j].endedAt) < 0) {
                arr[i].count++;

              }
              newArr[i] = {username: arr[i].username, count: arr[i].count}
            }
            else{
              newArr[i]={username: arr[i].username, count: arr[i].count};
            }
          } 
        }
        setData(newArr);

      }
    	
	  let flag = true;
    useEffect(()=>{
      if(users[0] ){
            flag = false;
            getCountOfUser();
          }
    },[missions])
    useEffect(()=>{
        
  if (data[0]) {
            
 let a=  data.sort((countA, countB)=>{
  if (countA.count<countB.count) {
    return -1
  }else if (countA.count > countB.count) {
    return 1
  }else{
    return 0
  }
 })

 let b=  a.filter((item)=>{
  return (item.count>0)
 })
 let t=  b.map((item,i)=>({y: item.count, label: item.username}))
            setOptions(   
              {
              animationEnabled: true,
              theme: "light2",
              height: 800,
              // subtitles:[
              //   {
              //     text: "This is a Subtitle",
              //     //Uncomment properties below to see how they behave
              //     //fontColor: "red",
              //     //fontSize: 30
              //   }
              //   ],
              // axisX:{
              //   title: "axisX Title"
              //  },
         
              title:{
                  text: "סטטוס חריגה לפי אחריות",
                  fontWeight: "normal",
                  //fontFamily: 'Ariel',
                  fontSize: 36
              },
              // axisX: {
              //     title: "",
              //     reversed: true,
              // },

              axisY: {
                  title: "",
                  includeZero: true,
                  //labelFormatter: this.addSymbols
              },
            
              data: [{
                  type: "bar",
                  dataPoints: t ,
              }]
          })
          }
    },[data])
    const containerProps = {
      width: "100%",
      height: "500px",
      margin: "auto"
      }

  return (
    <div className='h-100'>
      <CanvasJSChart  
             options = {options}
            //  containerProps = {containerProps}
              /* onRef={ref => this.chart = ref} *//>
    </div>
  )
}
