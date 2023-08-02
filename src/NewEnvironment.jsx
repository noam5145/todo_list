import { Divider, IconButton } from "@mui/material";
import React, { useState } from "react";
import CloseFullscreenIcon from "@mui/icons-material/CloseFullscreen";

export default function NewEnvironment({ setOpen }) {
  const [messenge, setMessenge] = useState({
    inputName: "",
    inputPhone: "",
    inputRole: "",
    inputUnitName: "",
    inputUnitCharcter: "",
    inputUnikRank: "",
    gridCheck: "",
    inputNameRole: "",
    inputRunkRole: "",
  });

  const updateData = (e, field) => {
    setMessenge({ ...messenge, [field]: e.target.value });
  };

  const chekMessemge = () => {
    if (
      messenge.inputName != "" &&
      messenge.inputPhone != "" &&
      messenge.inputRole != "" &&
      messenge.inputUnitName != "" &&
      messenge.inputUnikRank != "" &&
      messenge.inputUnitCharcter != "" &&
      messenge.gridCheck != "" &&
      messenge.inputNameRole !="" &&
      messenge.inputRunkRole != ""
    ) {
      console.log(messenge);
    } else {
      console.log("Error");
    }
  };
  return (
    <>
      <div dir="rtl" className="container-fluid linear">
        <div className="mt-2 p-0">
          <div className="d-flex">
            <IconButton className="mx-2" onClick={() => setOpen(false)}>
              <CloseFullscreenIcon />
            </IconButton>
          </div>
          <div className="row d-flex justify-content-center">
            <div class="row col-md-12 d-flex pb-md-5 pt-md-3 justify-content-center">
              <h3 className="col-md-10 text-center">להצטרפות יש למלא את הטופס ולשלוח בקשה</h3>
              <p className="col-md-10  text-end">פרטי מגיש הבקשה</p>
              <div class=" col-md-5 pt-3">
                <label for="inputName">שם:</label>
                <input
                  onChange={(e) => updateData(e, "inputName")}
                  type="text"
                  class="form-control"
                  id="inputName"
                />
              </div>
              <div class="col-md-5 pt-3">
                <label for="inputPhone">טלפון:</label>
                <input
                  onChange={(e) => updateData(e, "inputPhone")}
                  type="tel"
                  class="form-control"
                  id="inputPhone"
                />
              </div>
              <div class=" col-md-5 pt-3">
                <label for="inputRole">תפקיד:</label>
                <input
                  onChange={(e) => updateData(e, "inputRole")}
                  type="text"
                  class="form-control"
                  id="inputRole"
                />
              </div>
              <div class=" col-md-5 pt-3">
                <label for="inputUnit">שם היחידה:</label>
                <input
                  onChange={(e) => updateData(e, "inputUnitName")}
                  type="text"
                  class="form-control"
                  id="inputUnitName"
                />
              </div>
              <div class="col-md-5 pt-3">
                <label for="inputUnitCharcter">אופי היחידה:</label>
                <input
                  type="text"
                  class="form-control"
                  id="inputUnitCharcter"
                  onChange={(e) => updateData(e, "inputUnitCharcter")}
                />
              </div>
              <div class="form-group col-md-5 pt-3">
                <label for="inputUnikRank">:דרג היחידה</label>
                <input
                  onChange={(e) => updateData(e, "inputUnikRank")}
                  type="text"
                  class="form-control"
                  id="inputUnikRank"
                />
              </div>
              <div className="col-md-10  text-end border-top border-dark mt-md-3 pt-md-3">פרטי בע"ת שעבורו המערכת</div>
              <div class="col-md-5 pt-3">
                <label for="inputPhone">שם:</label>
                <input
                  onChange={(e) => updateData(e, "inputNameRole")}
                  type="tel"
                  class="form-control"
                  id="inputPhone"
                />
              </div>
              <div class=" col-md-5 pt-3">
                <label for="inputRole">דרגה:</label>
                <input
                  onChange={(e) => updateData(e, "inputRunkRole")}
                  type="text"
                  class="form-control"
                  id="inputRole"
                />
              </div>
              <button
                onClick={chekMessemge}
                type="submit"
                class="btn btn-primary justify-content-end mt-5 col-md-7"
              >
                שליחה
              </button>
            </div>
            
          </div>
        </div>
      </div>
    </>
  );
}

{
  /* <div className="" onClick={() => setOpen(false)} >uiyt</div> */
}
