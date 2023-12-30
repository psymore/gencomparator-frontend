import React from "react";
import { TextField, Button, Grid } from "@mui/material";

const UserEmail = ({ enterEmail, emailSubmit, userEmail }) => {
  return (
    <form onSubmit={emailSubmit}>
      <Grid
        container
        direction="column"
        alignItems="center"
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}>
        <Grid
          item
          sx={{
            mt: 10,
            p: 4,
            borderRadius: "1rem",
            background: "white",
          }}>
          <TextField
            onChange={enterEmail}
            sx={{
              backgroundColor: "white",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
            type="email"
            label="Enter your email"
            variant="outlined"
            value={userEmail}
          />
        </Grid>
        <Grid item xs={12} mt={5}>
          <Button
            variant="outlined"
            color="primary"
            type="submit"
            // sx={{ backgroundColor: "#415ebb" }}
          >
            Sign in
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default UserEmail;
