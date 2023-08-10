import { Divider, IconButton } from "@mui/material";
import React, { useState } from "react";
import CloseFullscreenIcon from "@mui/icons-material/CloseFullscreen";

export default function NewEnvironment({ setOpen }) {
  const [displayError, setDisplayError] = useState(false);
  const [messenge, setMessenge] = useState({
    inputName: "",
    inputPhone: "",
    inputRole: "",
    inputUnitName: "",
    inputWorkSpace: "",
    inputInspirationLevel: ""
  });

  const errorNote = (
    <h5 className="text-danger mb-sm-2 font-weight-bold">
      ודא שהפרטים שהזנת נכונים
    </h5>
  );

  const updateData = (e, field) => {
    setMessenge({ ...messenge, [field]: e.target.value });
  };

  const chekMessemge = () => {
    if (
      messenge.inputName != "" &&
      messenge.inputPhone != "" &&
      messenge.inputRole != "" &&
      messenge.inputUnitName != "" &&
      messenge.inputInspirationLevel != "בחר" &&
      messenge.inputWorkSpace != "בחר"
    ) {
      console.log(messenge);
      setDisplayError(false);
    } else {
      setDisplayError(true);
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
              <h3 className="col-md-12 text-center">
                נא למלא את הטופס על מנת לקבל הרשאות (ניהול\עריכה\צפייה) לסביבה
                קיימת
              </h3>
              <div class=" col-md-5 pt-3">
                <label for="inputName">
                  שם:{" "}
                  <span className={displayError ? "text-danger" : "text-dark"}>
                    *
                  </span>
                </label>
                <input
                  onChange={(e) => updateData(e, "inputName")}
                  type="text"
                  class="form-control"
                  id="inputName"
                />
              </div>
              <div class="col-md-5 pt-3">
                <label for="inputPhone">
                  טלפון:{" "}
                  <span className={displayError ? "text-danger" : "text-dark"}>
                    *
                  </span>
                </label>
                <input
                  onChange={(e) => updateData(e, "inputPhone")}
                  type="tel"
                  class="form-control"
                  id="inputPhone"
                />
              </div>
              <div class=" col-md-5 pt-3">
                <label for="inputRole">
                  תפקיד:{" "}
                  <span className={displayError ? "text-danger" : "text-dark"}>
                    *
                  </span>
                </label>
                <input
                  onChange={(e) => updateData(e, "inputRole")}
                  type="text"
                  class="form-control"
                  id="inputRole"
                />
              </div>
              <div class=" col-md-5 pt-3">
                <label for="inputUnit">
                  שם היחידה:{" "}
                  <span className={displayError ? "text-danger" : "text-dark"}>
                    *
                  </span>
                </label>
                <input
                  onChange={(e) => updateData(e, "inputUnitName")}
                  type="text"
                  class="form-control"
                  id="inputUnitName"
                />
              </div>
              <div class="col-md-5 pt-3">
                <label for="inputWorkSpace">
                  סביבת עבודה מבוקשת:{" "}
                  <span className={displayError ? "text-danger" : "text-dark"}>
                    *
                  </span>
                </label>
                <select
                  aria-label="Default select example"
                  className="form-control form-select"
                  id="inputWorkSpace"
                  onChange={(e) => updateData(e, "inputWorkSpace")}
                >
                  <option selected>בחר</option>
                  <option value="1">One</option>
                  <option value="2">Two</option>
                  <option value="3">Three</option>
                </select>
              </div>
              <div class="form-group col-md-5 pt-3">
                <label for="inputInspirationLevel">
                  רמת השראה נדרשת:{" "}
                  <span className={displayError ? "text-danger" : "text-dark"}>
                    *
                  </span>
                </label>
                <select
                  aria-label="Default select example"
                  className="form-control form-select"
                  id="inputInspirationLevel"
                  onChange={(e) => updateData(e, "inputInspirationLevel")}
                >
                  <option selected>בחר</option>
                  <option value="1">צפייה</option>
                  <option value="2">עריכה</option>
                  <option value="3">ניהול</option>
                </select>
              </div>
              {displayError ? errorNote : ""}
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
