import React, { useContext, useState } from "react";
import "../taskList.css";
import UnfoldMoreIcon from "@mui/icons-material/UnfoldMore";
import SettingsIcon from "@mui/icons-material/Settings";
import { MyContext } from "../../../../App";

export default function TopTable({ setAllDataShow }) {
  const { missions } = useContext(MyContext);

  const [table, setTable] = useState({
    missionId: false,
    starteAt: false,
    title: false,
    details: false,
    responsibility: false,
    endedAt: false,
    daysLeft: false,
    status: false,
  });

  const SortTaxtByHighAndLow = (field) => {
    let newSort;
    if (table[field]) {
      const newTable = { ...table };
      newTable[field] = !table[field];
      setTable(newTable);
      newSort = [...missions]?.sort((a, b) => {
        if (a[field] < b[field]) {
          return -1;
        }
        if (a[field] > b[field]) {
          return 1;
        }
        return 0;
      });
      setAllDataShow(newSort);
    } else {
      const newTable = { ...table };
      newTable[field] = !table[field];
      setTable(newTable);
      newSort = [...missions].sort((a, b) => {
        if (a[field] < b[field]) {
          return 1;
        }
        if (a[field] > b[field]) {
          return -1;
        }
        return 0;
      });
      setAllDataShow(newSort);
    }
  };

      const SortNumberByHighAndLow = (field) => {
        let newSort;
        const compareHigh = (a, b) => {
          return a[field] - b[field]
        }
        const compareLow = (a, b) => {
          return b[field] - a[field]
        }
    
        if (table[field]) {
          const newTable = { ...table };
          newTable[field] = !table[field];
          setTable(newTable);
          newSort = [...missions]?.sort(compareHigh)
          setAllDataShow(newSort)
        } else {
          const newTable = { ...table };
          newTable[field] = !table[field];
          setTable(newTable);
          newSort = [...missions].sort(compareLow)
          setAllDataShow(newSort)
        }
      }
    
    return (
        <>
            <div className=" d-flex justify-content-center">
                <div className="col-1 top_table text-center">
                    מס"ד <span title="מיין לפי גדול/קטן"><UnfoldMoreIcon id="missionId" onClick={(e) => SortNumberByHighAndLow(e.currentTarget.id)} className="cursor" /></span>
                </div>
                <div className="col-1 top_table text-center" >
                    מועד משימה <span title="מיין לפי גדול/קטן"><UnfoldMoreIcon id="startedAt" onClick={(e) => SortTaxtByHighAndLow(e.currentTarget.id)} className="cursor" /></span>
                </div>
                <div className="col-1 top_table text-center">
                    כותרת משימה <span title="מיין לפי גדול/קטן"><UnfoldMoreIcon id="title" onClick={(e) => SortTaxtByHighAndLow(e.currentTarget.id)} className="cursor" /></span>
                </div>
                <div className="col-3 top_table text-center">
                    פירוט משימה <span title="מיין לפי גדול/קטן"><UnfoldMoreIcon id="details" onClick={(e) => SortTaxtByHighAndLow(e.currentTarget.id)} className="cursor" /></span>
                </div>
                <div className="col-1 top_table text-center">
                    מסמכים מצורפים
                </div>
                <div className="col-1 top_table text-center">
                    אחריות <span title="מיין לפי גדול/קטן"><UnfoldMoreIcon id="responsibility" onClick={(e) => SortTaxtByHighAndLow(e.currentTarget.id)} className="cursor" /></span>
                </div>
                <div className="col-1 top_table text-center">
                  תג"מ <span title="מיין לפי גדול/קטן"><UnfoldMoreIcon id="endedAt" onClick={(e) => SortTaxtByHighAndLow(e.currentTarget.id)} className="cursor" /></span>
                </div>
                <div className="col-1 top_table text-center">
                    ימים שנותרו <span title="מיין לפי גדול/קטן"><UnfoldMoreIcon id="daysLeft" onClick={(e) => SortNumberByHighAndLow(e.currentTarget.id)} className="cursor" /></span>
                </div>
                <div className="col-1 top_table text-center">
                    סטאטוס <span title="מיין לפי גדול/קטן"><UnfoldMoreIcon id="status" onClick={(e) => SortTaxtByHighAndLow(e.currentTarget.id)} className="cursor" /></span>
                </div>
                <div className="col-1 top_table text-center">
                    <span title="עריכה"><SettingsIcon size={35} color="primary" /></span>
                </div>
            </div>
        </>
    )
}
