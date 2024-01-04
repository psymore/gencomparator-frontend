import React from "react";
import { TextField, Button, Grid, Typography } from "@mui/material";

const UserEmail = ({ enterEmail, emailSubmit, userEmail }) => {
  return (
    <form onSubmit={emailSubmit}>
      <Grid
        container
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}>
        <Grid
          container
          sx={{
            mt: 10,
            borderRadius: "1rem",
            backgroundColor: "#3a4754",
            width: "80vw",
          }}>
          <Grid
            item
            xs={12}
            sx={{
              mt: 6,
              p: 4,
            }}>
            <Typography sx={{ fontSize: 35, color: "white" }}>
              Welcome to Gencomparator.
            </Typography>
            <Typography sx={{ fontSize: 30, color: "white", mt: 4 }}>
              This is a magic link login system. A single use link will be sent
              to your email and it will expire when you click it.
            </Typography>
          </Grid>
          <Grid
            item
            xs={12}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}>
            <TextField
              onChange={enterEmail}
              inputProps={{
                style: {
                  height: 70,
                  padding: "0 14px",
                  fontSize: 18,
                },
              }}
              sx={{
                width: "40%",
                backgroundColor: "white",
                mb: 5,
                mt: 5,
              }}
              type="email"
              placeholder="Enter your email"
              variant="outlined"
              size=""
              value={userEmail}
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              variant="outlined"
              color="primary"
              type="submit"
              sx={{ width: "200px", mb: 8 }}>
              Login
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </form>
  );
};

export default UserEmail;
