import { Dialog, Grid, Typography } from "@mui/material";
import { useState } from "react";
import { Navigate } from "react-router-dom";
import UserEmail from "../components/UserEmail";
import axios from "axios";
import DoneIcon from "@mui/icons-material/Done";

export default function MagicLogin() {
  const [userEmail, setUserEmail] = useState("");
  const [successDialog, setSuccessDialog] = useState(false);

  const URL = "http://localhost:3001";

  if (localStorage.getItem("token")) {
    return <Navigate to={"/"} />;
  }

  const signIn = async email => {
    try {
      setSuccessDialog(true);
      const res = await axios.post(`${URL}/users/enter`, { email });
    } catch (e) {
      alert(e);
    }
  };

  const enterEmail = e => {
    setUserEmail(e.target.value);
  };

  const emailSubmit = e => {
    e.preventDefault();
    signIn(userEmail);
    setUserEmail("");
  };
  const handleClose = () => {
    setSuccessDialog(false);
  };
  return (
    <Grid container spacing={0}>
      <Grid item xs={12}>
        {successDialog ? (
          <Dialog open={successDialog} onClose={handleClose}>
            <Grid item xs={12} p={3}>
              <Typography
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "left",
                }}>
                Login Link Sent Successfully
                <DoneIcon
                  sx={{
                    mb: 0.6,
                    ml: 0.5,
                  }}
                />
              </Typography>
              <Typography
                sx={{
                  mt: 1,
                  fontSize: 15,
                  textAlign: "justify",
                }}>
                Please click the link in your email to proceed with the login
                process.
              </Typography>
              <Typography
                sx={{
                  mt: 3,
                  fontSize: 11,
                  textAlign: "justify",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "left",
                }}>
                -- Click outside of this message to close. --
              </Typography>
            </Grid>
          </Dialog>
        ) : (
          <></>
        )}
        <UserEmail
          enterEmail={enterEmail}
          emailSubmit={emailSubmit}
          userEmail={userEmail}
        />
      </Grid>
    </Grid>
  );
}
