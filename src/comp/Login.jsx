import React, { useContext, useState } from 'react';
import { MyContext } from '../App';
// import { GoogleLogin, GoogleLogout } from 'react-google-login';
import {app} from '../firebase';
import { getAuth, signInWithPopup, GoogleAuthProvider, sendEmailVerification } from "firebase/auth";
export default function(){ 
  const {getUser} = useContext(MyContext);
  const [num, setNum] = useState();
  const handleSignWithGoogle = () =>{
    const provider = new GoogleAuthProvider();
    provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
    const auth = getAuth(app); 
      signInWithPopup(auth, provider)
        .then((result) => {
          // The signed-in user info.
          const userr = result.user;
          sendEmailVerification(userr,)
          getUser({
            username: userr.email,
            id: num
          })
          // setProfileUrl(userr.photoURL);
          // setUser(userr.email);
        })
        .catch((error) => {
          console.log(error);
        });
  }

  return (
    <div>
      <div className='btn btn-primary' onClick={()=> handleSignWithGoogle()} >Login</div>
      <input type="password" onChange={(e)=>{ setNum(e.target.value) }} />
    </div>
  )
}
