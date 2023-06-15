
import React, { useEffect, useState } from "react";
import "./temp.css";
import UnfoldMoreIcon from "@mui/icons-material/UnfoldMore";

import ReactToPrint, { ComponentToPrint,useReactToPrint } from "react-to-print";


const Temp = React.forwardRef((props, ref) => {
    const [opemId, setOpemId] = useState(false);



    useEffect(() => {
      window.addEventListener("click", () => {
        setOpemId(false)
      })
    }, [])
  
  
  
    return (
      <> 
   
   
      
        <div  ref={ref} className="container-fluid mt-2 mb-2">
          <div className="d-flex justify-content-between mx-5">
            <div className="exp-title-div" >       
                <h2 className="exp-title">דו"ח חריגה</h2>
            </div>
          
            <span className="">
            
            </span>
          </div>
          <div className="container table-container-Ex all_table-Ex mt-3 ml-3">
            <span className="sticky-top">
            <div className=" d-flex justify-content-center">
              <div className="col-1 top_table-Ex text-center">
                מזהה <span title="מיין לפי גדול/קטן"><UnfoldMoreIcon className="cursor" /></span>
              </div>
              <div className="col-2 top_table-Ex text-center" >
              אחריות<span title="מיין לפי גדול/קטן"><UnfoldMoreIcon className="cursor" /></span>
              </div>
              <div className="col-2 top_table-Ex text-center">
                כותרת הפגישה <span title="מיין לפי גדול/קטן"><UnfoldMoreIcon className="cursor" /></span>
              </div>
              <div className="col-3 top_table-Ex text-center">
                פירוט הפגישה <span title="מיין לפי גדול/קטן"><UnfoldMoreIcon className="cursor" /></span>
              </div>
              <div className="col-1 top_table-Ex text-center">
                תג"ב<span title="מיין לפי גדול/קטן"><UnfoldMoreIcon className="cursor" /></span>
              </div>
              <div className="col-1 top_table-Ex text-center">
                ימי חריגה<span title="מיין לפי גדול/קטן"><UnfoldMoreIcon className="cursor" /></span>
              </div>
              <div className="col-1 top_table-Ex text-center">
                הערות אחראי<span title="מיין לפי גדול/קטן"><UnfoldMoreIcon className="cursor" /></span>
              </div>
              <div className="col-1 top_table-Ex text-center">
                הערות מפקד<span title="מיין לפי גדול/קטן"><UnfoldMoreIcon className="cursor" /></span>
              </div>
             
            </div>
  
         
            </span> 
            {Array(10)
              .fill(null)
              .map((i, item) => (
                <div key={i} className="container d-flex justify-content-center p-0">
                  <div className="col-1 the_table-Ex text-center">135</div>
                  <div className="col-2 the_table-Ex text-center">02/22/2023</div>
                  <div className="col-2 the_table-Ex text-center">kjturyetr</div>
                  <div className="col-3 the_table-Ex text-center align-items-center">
                    <p className="p_taskdetail-Ex p-2 ">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Provident odit quas rem. Accusantium, ducimus voluptatibus.
                      Maiores eveniet at exercitationem ut iusto, dolorum
                      voluptatibus aut eum rem labore sapiente facere consectetur!
                    </p>
                  </div>
                  <div className="col-1 the_table-Ex  text-center">yiutyrt</div>
                  <div className="col-1 the_table-Ex text-center">56</div>
                  <div className="col-1 the_table-Ex  text-center">8</div>
                  <div className="col-1 the_table-Ex  text-center"> בחריגה</div>
               
                </div>
              ))}
          </div>
        </div>
      </>
    );
});

export default Temp