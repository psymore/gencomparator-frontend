import React from "react";
import { TextField, Button, Grid } from "@mui/material";

const UserEmail = ({ enterEmail, emailSubmit, userEmail }) => {
  return (
    <form onSubmit={emailSubmit}>
      <Grid container direction="column" alignItems="center" spacing={2}>
        <Grid item>
          <TextField
            onChange={enterEmail}
            sx={{ backgroundColor: "white" }}
            type="email"
            label="Email"
            variant="outlined"
            value={userEmail}
          />
        </Grid>
        <Grid item>
          <Button variant="contained" color="primary" type="submit">
            Sign in
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default UserEmail;
