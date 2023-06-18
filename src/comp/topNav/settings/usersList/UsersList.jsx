import React, { useContext } from "react";
import "./usersList.css";
import {AiOutlineDelete} from "react-icons/ai"
import { MyContext } from "../../../../App";

export default function UsersList({users}) {
  // const { users } = useContext(MyContext);

  return (
    <div className="d-flex justify-content-center">
      <div className="row container">
        {users.map((user, i) => (
          <>
           <div className="col-2 border d-flex justify-content-center text-center table_h">
              {user.username}
            </div>
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
            <div className="col-1 border d-flex justify-content-center text-center table_h">
              {user.access}
            </div>
            <div className="col-1 border d-flex justify-content-center text-center table_h">
              <AiOutlineDelete size={20}/>
            </div>
           
          </>
        ))}
      </div>
    </div>
  );
}
