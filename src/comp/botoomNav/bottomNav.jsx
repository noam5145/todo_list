import React from "react";
import { Avatar, Badge, Button, Dialog } from "@mui/material";
import "./bottomNav.css";
import Logo from "../../images/צוות אלפא.jpg";

export default function BottomNav() {
  const [open, setOpen] = React.useState(false);
  return (
    <div className="">
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
              src={Logo}
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
              <p className="fontSizeContent">
                צוות אלפא הוא צוות פיתוח תוכנה מתקדם ומקצועי, שמתמחה בפיתוח
                פתרונות דיגיטליים מתקדמים וחדשניים. הצוות מורכב מאנשי צוות
                מיומנים ומנוסים המעוניינים להביא לפועל פתרונות חכמים ומתוחכמים
                לתחומי התפעול השונים. המתכנתים בצוות מתמחים בפיתוח FullStack,
                כולל פיתוח בצד הלקוח ובצד השרת, כך שהם יכולים להתמודד עם מגוון
                רחב של תהליכים וצרכי הלקוחות. כמו כן, הם יודעים לפתח גם
                באפליקציות מובייל וגם בפיתוח אתרים, כדי להגיע לקהל הרחב ביותר.
                אחת מיתרונותיו של הצוות הינו הידע המעמיק בתחום התכנות וההבנה
                המקיפה של הצרכים הארגוניים והתהליכים הפנימיים. כך, הצוות יכול
                להתאים את הפתרונות שהם מפתחים לצרכי הלקוחות ולהבטיח שהם יהיו
                מותאמים בדיוק למה שהארגון דורש. הצוות פועל בצורה יזומה
                ואינטראקטיבית, ומקפיד על הקשבה לצרכי הלקוח והתאמת הפתרונות
                לבעיות המוחקרות. כל אחד מהם תורם לצוות בהתאם ליכולותיו וידעו
                המיוחד, והם עובדים בצורה משולבת כדי להבטיח כי כל פתרון יהיה
                מועיל, מקצועי ומתקדם. המטרה המרכזית של הצוות היא לספק פתרונות
                מהירים ויעילים ליחידות השונות בפיקוד הכשרות והאימונים, ברשת
                הסודית וברשת האזרחית. כך, הם תורמים לשיפור תהליכי העבודה ולהבטחת
                חווית משתמש מועילה ונוחה יותר. בזכות יכולותיהם
                הרחבות והתמיד הממוקדות, הם ממשיכים להשתפר ולהתפתח עם כל פרויקט
                חדש שהם מתעסקים בו.
              </p>
              <div className="col-md-12 d-flex justify-content-center align-items-center mt-auto">
                <img height={100} width={300} src={Logo} />
              </div>
            </div>
          </Dialog>
        </div>
      </div>
    </div>
  );
}
