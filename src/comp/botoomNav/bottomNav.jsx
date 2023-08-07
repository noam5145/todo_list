import React from "react";
import { Avatar, Badge, Button, Dialog } from "@mui/material";
import "./bottomNav.css";
import LogoAlpha from "../../../images/צוות אלפא.jpg";

export default function BottomNav() {
  const [open, setOpen] = React.useState(false);
  return (
    <div  className="">
    <div className="bot_nav row col-md-12 me-0 d-flex row justify-content-center align-items-center ">
      <div className="d-flex  justify-content-center align-items-center">
        <div className="col-md-2"></div>
        <div className="col-md-8 d-flex justify-content-center align-items-start">
          <img
            height={90}
            width={270}
            className="info_more"
            title="קרא עוד על היחידה"
            onClick={() => setOpen(true)}
            src={LogoAlpha}
          />
        </div>
        <div className="col-md-2 d-flex justify-content-center align-items-center">
          <p className="text-center">
            פותח ע"י צוות אלפא
            <br />
            פיקוד הכשרות והאימונים
          </p>
        </div>

        <Dialog open={open} onClose={() => setOpen(false)}>
          <div
            style={{ height: 500 }}
            dir="rtl"
            className="m-md-5 row"
            setOpen={setOpen}
          >
            <h3>על היחידה:</h3>
            <p>
              צוות אלפא הוא צוות פיתוח תוכנה המתמחה בפיתוח פתרונות דיגיטליים
              לתחומי התפעול השונם הצוות מורכב מאנשי צוות מיומנים בעלי ידע בתחום
              ה- FullStack ושאר תחומי התכנות. ייעוד הצוות הינו לתת פתרונות
              מהירים ומונגשים ליחידות השונות בפיקוד הכשרות והאימונים, ברשת
              הסודית וברשת האזרחית.
            </p>
            <div className="col-md-12 d-flex justify-content-center align-items-center mt-auto">
              <img height={100} width={300} src={LogoAlpha} />
            </div>
          </div>
        </Dialog>
      </div>
    </div>
    </div>
  );
}
