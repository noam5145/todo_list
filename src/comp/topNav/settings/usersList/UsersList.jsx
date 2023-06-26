import React, { useContext, useState } from "react";
import "./usersList.css";
import {AiOutlineDelete} from "react-icons/ai"
import { MyContext } from "../../../../App";

export default function UsersList({users}) {
  const { deleteUser, currentUser} = useContext(MyContext);

  const [per, setPer] = useState(false);



const delete_user = (_id, token)=>{


deleteUser(_id, token);
}

  return (
    <div className="d-flex justify-content-center">
      <div className="row container">
        {users.map((user, i) => (
          <div className="d-flex" key={i}>
           <div  className="col-2 the_table d-flex justify-content-center text-center ">
              {user.username}
            </div>
            <div className="col-2 the_table d-flex justify-content-center text-center ">
              {user.role}
            </div>
            <div className="col-2 the_table d-flex justify-content-center text-center ">
              {user.level_1}
            </div>
            <div className="col-2 the_table d-flex justify-content-center text-center ">
              {user.level_2}
            </div>
            <div className="col-2 the_table d-flex justify-content-center text-center ">
              {user.level_3 ? user.level_3 : "---"}
            </div>
            <div className="col-1 the_table d-flex justify-content-center text-center ">
              {user.access}
            </div>
            <div className="col-1 the_table d-flex justify-content-center text-center "
              onClick={()=> delete_user(user._id,currentUser.token)}
            >
              <AiOutlineDelete className="cursor" size={20} 
            
              />
            </div>
           
          </div>
        ))}
      </div>
    </div>
  );
}
