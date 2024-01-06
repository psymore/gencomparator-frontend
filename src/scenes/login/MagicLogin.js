import { Grid } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { Navigate } from "react-router-dom";
import CustomDialog from "../components/CustomDialog";
import UserEmail from "../components/UserEmail";

export default function MagicLogin() {
  const [userEmail, setUserEmail] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogContent, setDialogContent] = useState({
    title: "",
    text: "",
    success: false,
  });

  const URL = "http://localhost:3001";

  if (localStorage.getItem("token")) {
    return <Navigate to={"/"} />;
  }

  const signIn = async email => {
    try {
      const res = await axios.post(`${URL}/users/enter`, { email });
      console.log(res);
      setDialogContent({
        // text: "Please click the link in your email to proceed with the login process.",
        title: res?.data?.ok
          ? "Login Link Sent Successfully"
          : "An error ocurred",
        text: res?.data?.message,
        success: res?.data?.ok,
      });

      setOpenDialog(true);
    } catch (e) {
      setDialogContent({
        title: "An error ocurred.",
        text: "Unable to login.",
        success: res?.data?.ok,
      });
      setOpenDialog(true);
    }
  };

  const enterEmail = e => {
    setUserEmail(e.target.value);
  };

  const emailSubmit = e => {
    e.preventDefault();
    if (!userEmail.trim()) {
      setDialogContent({
        title: "Empty Email",
        text: "Please enter your email address.",
        success: false,
      });
    }
    signIn(userEmail);
    setUserEmail("");
  };
  const handleClose = () => {
    setOpenDialog(false);
  };

  return (
    <Grid container spacing={0}>
      <Grid item xs={12}>
        {openDialog ? (
          <CustomDialog
            open={openDialog}
            onClose={handleClose}
            title={dialogContent.title}
            text={dialogContent.text}
            success={dialogContent.success}
          />
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
