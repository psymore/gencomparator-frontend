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
        text: res?.data?.message,
        title: "Login Link Sent Successfully",
        success: true,
      });

      setOpenDialog(true);
    } catch (e) {
      setDialogContent({
        title: "An error ocurred.",
        text: "Unable to login.",
        success: false,
      });
      setOpenDialog(true);
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
    setOpenDialog(false);
  };

  // const LoginDialog = () => {
  //   return (
  //     <CustomDialog
  //       open={openDialog}
  //       onClose={handleClose}
  //       title={dialogContent.title}
  //       text={dialogContent.text}
  //       success={success}
  //     />
  //     /* <Dialog open={openDialog} onClose={handleClose}>
  //       <Grid item xs={12} p={3}>
  //         <Typography
  //           sx={{
  //             display: "flex",
  //             alignItems: "center",
  //             justifyContent: "left",
  //           }}>
  //           {dialogContent.title}
  //           {dialogContent.success === true ? (
  //             <DoneIcon
  //               sx={{
  //                 mb: 0.6,
  //                 ml: 0.5,
  //               }}
  //             />
  //           ) : (
  //             <CancelOutlinedIcon
  //               sx={{
  //                 mb: 0.6,
  //                 ml: 0.5,
  //               }}
  //             />
  //           )}
  //         </Typography>
  //         <Typography
  //           sx={{
  //             mt: 1,
  //             fontSize: 15,
  //             textAlign: "justify",
  //           }}>
  //           {dialogContent.text}
  //         </Typography>
  //         <Typography
  //           sx={{
  //             mt: 3,
  //             fontSize: 11,
  //             textAlign: "justify",
  //             display: "flex",
  //             alignItems: "center",
  //             justifyContent: "left",
  //           }}>
  //           -- Click outside of this message to close. --
  //         </Typography>
  //       </Grid>
  //     </Dialog> */
  //   );
  // };

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
