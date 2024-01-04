import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Navigate } from "react-router-dom";

// spinners import stuff
import { css } from "@emotion/react";
import FadeLoader from "react-spinners/FadeLoader";
import axios from "axios";
import { Alert, Grid, Typography } from "@mui/material";
const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;
// end spinners import stuff
const URL = "http://localhost:3001";

export default function Enter() {
  const [isError, setIsError] = useState(false);
  const [success, setSucces] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [welcomeMessage, setWelcomeMessage] = useState("");

  let params = useParams();
  let navigate = useNavigate();

  const signIn = async (email, magicLink) => {
    try {
      const res = await axios.post(`${URL}/users/enter`, { email, magicLink });
      if (res.data.token) {
        setIsError(false);
        setSucces(true);
        // alert(res.data.message);
        setWelcomeMessage(res?.data?.message);
        localStorage.setItem("token", res.data.token);
        setTimeout(() => {
          navigate("/");
        }, 2000);
      } else {
        setIsError(true);
        setErrorMessage(res?.data?.message);
        // alert(res.data.message);
      }
    } catch (e) {
      setIsError(true);
      setErrorMessage(
        e.message || e.response?.data?.message || "An unknown error occurred"
      );

      // alert(e);
    }
  };
  useEffect(() => {
    debugger;
    signIn(params.email, params.link);
  }, [params.email, params.link]);

  return (
    <Grid container mt={"10%"}>
      {isError ? (
        <Grid
          item
          xs={12}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}>
          <Alert
            sx={{
              fontSize: 25,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "30%",
              height: "80px",
              "& .MuiAlert-icon": { fontSize: 35 },
            }}
            severity="error">
            {errorMessage}
          </Alert>
        </Grid>
      ) : (
        <Grid item xs={12}>
          <Typography color={"white"} fontSize={30}>
            Verifying your magic link
          </Typography>
        </Grid>
      )}
      {success ? (
        <Grid
          item
          xs={12}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}>
          <Alert
            sx={{
              fontSize: 25,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "30%",
              height: "80px",
              "& .MuiAlert-icon": { fontSize: 35 },
            }}
            severity="success">
            {welcomeMessage}
          </Alert>
        </Grid>
      ) : (
        <></>
      )}
      <Grid
        item
        xs={12}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          mt: 5,
        }}>
        {!errorMessage ? (
          <FadeLoader color={"white"} loading={true} css={override} size={50} />
        ) : (
          <></>
        )}
      </Grid>
    </Grid>
  );
}
