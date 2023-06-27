import React, { useContext, useEffect, useState } from 'react';
import { MyContext } from '../App';
// import { GoogleLogin, GoogleLogout } from 'react-google-login';
import {app} from '../firebase';
import { getAuth, signInWithPopup, GoogleAuthProvider, sendEmailVerification } from "firebase/auth";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { IconButton, Input, InputAdornment } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';

const theme = createTheme();


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
          getUser({
            username: userr.displayName,
            id: num
          })
        })
        .catch((error) => {
          console.log(error);
        });
  }

  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.keyCode === 13) {
        handleSignWithGoogle();
      }
    };
  
    window.addEventListener("keydown", handleKeyPress);
  
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, []);

  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  return (
    <div className="" style={{height:" 100vh",width:" 100%", overflowX:"hidden"}}>
    <ThemeProvider theme={theme} >
     <Container component="main" maxWidth="xs">
       <CssBaseline />
       <Box
         sx={{
           marginTop: 3,
           display: "flex",
           flexDirection: "column",
           alignItems: "center",
         }}
       >
         <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
           <LockOutlinedIcon />
         </Avatar>
         <Typography component="h1" variant="h5">
        הכנס מספר אישי
         </Typography>
         <Box noValidate sx={{ mt: 1 }}>

         {/* <Input
            id="standard-adornment-password"
            type={showPassword ? 'text' : 'password'}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  // onMouseDown={handleMouseDownPassword}
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>   }
          /> */}
           <TextField
             margin="normal"
            //  type='password'
             required
             fullWidth
             autoFocus
             onChange={(e)=>{ setNum(e.target.value) }}
           />
           <Button
             onClick={()=> handleSignWithGoogle()}
             fullWidth
             variant="contained"
            //  disabled = {loading}
             sx={{ mt: 2, mb: 4 }}
           >
             שלח סיסמה
           </Button>
         </Box>
       </Box>
     </Container>
   </ThemeProvider>
   </div>
  )
}
