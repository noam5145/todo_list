import React, { useContext } from "react";
import "./usersList.css";
import { MyContext } from "../../../../App";

export default function UsersList() {
  const { users } = useContext(MyContext);

  return (
    <div className="d-flex justify-content-center">
      <div className="row container">
        {users.map((user, i) => (
          <>
            <div className="col-2 border d-flex justify-content-center text-center table_h">
              {user.role}
            </div>
            <div className="col-2 border d-flex justify-content-center text-center table_h">
              {user.level_1}
            </div>
            <div className="col-2 border d-flex justify-content-center text-center table_h">
              {user.level_2}
            </div>
            <div className="col-2 border d-flex justify-content-center text-center table_h">
              {user.level_3 ? user.level_3 : "---"}
            </div>
            <div className="col-2 border d-flex justify-content-center text-center table_h">
              {user.access}
            </div>
            <div className="col-2 border d-flex justify-content-center text-center table_h">
              {user.username}
            </div>
          </>
        ))}
      </div>
    </div>
  );
}
