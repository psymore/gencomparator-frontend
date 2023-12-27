import { Grid } from "@mui/material";
import { useState } from "react";
import { Navigate } from "react-router-dom";
import UserEmail from "../components/UserEmail";
import axios from "axios";

export default function MagicLogin() {
  const [userEmail, setUserEmail] = useState("");

  const URL = "http://localhost:3001";

  if (localStorage.getItem("token")) {
    return <Navigate to={"/"} />;
  }

  const signIn = async email => {
    try {
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

  return (
    <Grid container spacing={0}>
      <Grid item xs={12}>
        <UserEmail
          enterEmail={enterEmail}
          emailSubmit={emailSubmit}
          userEmail={userEmail}
          setUserEmail={setUserEmail}
        />
      </Grid>
    </Grid>
  );
}
