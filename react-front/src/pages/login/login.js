import { TextField } from "@mui/material";
import Button from "@mui/material/Button";
import InputAdornment from "@mui/material/InputAdornment";
import { AccountCircle } from "@mui/icons-material";
import { useState } from 'react';

function LoginComponent() {
  const [loginForm, setLoginForm] = useState({
    email: '',
    password: '',
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setLoginForm({...loginForm, [name]: value})
  }

  const submitLoginForm = (e) => {
    e.preventDefault();
    console.log("login", loginForm);
  }

  return (
    <div className="container-login container-100 center-flex">
      <div className="card card-login">
        <h1>CQL-Teacher</h1>
        <p>Learn and practice SQL with us!</p>
        <form className="form-vertical-group" onSubmit={submitLoginForm}>
        <TextField
          margin="normal"
          label="Email"
          value={loginForm.email}
          name = "email"
          onChange={handleChange}
          id="outlined-start-adornment"
          sx={{ m: 1, width: '25ch' }}
          InputProps={{
            startAdornment: <InputAdornment position="start"> <AccountCircle /></InputAdornment>,
          }}
        />
        <TextField
          margin="normal"
          label="Password"
          value = {loginForm.password}
          name = "password"
          onChange = {handleChange}
          id="outlined-start-adornment"
          sx={{ m: 1, width: '25ch' }}
          InputProps={{
            startAdornment: <InputAdornment position="start"> <AccountCircle /></InputAdornment>,
          }}
        />
          <Button type="submit" variant="contained">Log In</Button>
        </form>
      </div>
    </div>
  );
}

export default LoginComponent;
