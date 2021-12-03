import { TextField } from "@mui/material";
import Button from "@mui/material/Button";
import InputAdornment from "@mui/material/InputAdornment";
import { AccountCircle } from "@mui/icons-material";

function LoginComponent() {
  return (
    <div className="container-login container-100 center-flex">
      <div className="card card-login">
        <h1>CQL-Teacher</h1>
        <p>Learn and practice SQL with us!</p>
        <form className="form-vertical-group">
        <TextField
          margin="normal"
          label="Email"
          id="outlined-start-adornment"
          sx={{ m: 1, width: '25ch' }}
          InputProps={{
            startAdornment: <InputAdornment position="start"> <AccountCircle /></InputAdornment>,
          }}
        />
        <TextField
          margin="normal"
          label="Password"
          id="outlined-start-adornment"
          sx={{ m: 1, width: '25ch' }}
          InputProps={{
            startAdornment: <InputAdornment position="start"> <AccountCircle /></InputAdornment>,
          }}
        />
          <Button variant="contained">Log In</Button>
        </form>
      </div>
    </div>
  );
}

export default LoginComponent;
