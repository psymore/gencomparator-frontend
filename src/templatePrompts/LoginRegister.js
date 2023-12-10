import { Autocomplete, Grid, TextField } from "@mui/material";
import { useState } from "react";

export default function LoginRegister() {
  const [sendCredentials, setSendCredentials] = useState("");

  const credentials = [`"Username"`, `"Email"`];
  const component = ["MUI Textfield components", "input fields"];
  const linkOptions = ["MUI Link", "a tag"];
  const styleOptions = [
    "inside sx props of MUI components",
    "with the inline style attribute",
  ];

  return (
    <Grid container spacing={0}>
      <Grid item xs={2}></Grid>

      <Grid item xs={8}>
        <p style={{ textAlign: "justify", lineHeight: "2.1rem" }}>
          You are a front-end javascript developer who is only working with
          ReactJS. You must only use functional components of ReactJS. You
          should produce a code which is ready to work and able to be pasted
          into an App.js file. Your task requirements are given in the following
          part, be sure that you implement every one of these requirements.
          <br />
          <br />
          <b>Application Definition:</b> It is a single page app which contains
          Login and Register components which are switchable between with a text
          containing a link on the current component. Switch functionality will
          be detailed further.
          <br />
          <br />
          <b>Features & Functions & Components:</b> Login page must have
          {
            <Autocomplete
              id="combo-box-demo"
              freeSolo
              innerElementType="li"
              options={credentials}
              sx={{
                width: 200,
                display: "inline-flex",
                mr: 0.5,
                ml: 1,
                // border: "1px solid",
                borderRadius: "0.4rem",
              }}
              renderInput={params => (
                <TextField
                  label={"username"}
                  {...params}
                  size="small"
                  variant="outlined"
                  sx={{ ml: 0.5 }}
                  onChange={setSendCredentials}
                />
              )}
            />
          }
          , "Password"
          {
            <Autocomplete
              id="combo-box-demo"
              freeSolo
              options={component}
              sx={{
                width: 200,
                display: "inline-flex",
                ml: 1,
                border: "1px solid",
                borderRadius: "0.4rem",
              }}
              renderInput={params => (
                <TextField {...params} variant="standard" sx={{ ml: 0.5 }} />
              )}
            />
          }{" "}
          and a "Login" button. Register page should have
          {
            <Autocomplete
              id="combo-box-demo"
              freeSolo
              options={credentials}
              sx={{
                width: 200,
                display: "inline-flex",
                mr: 0.5,
                ml: 1,
                border: "1px solid",
                borderRadius: "0.4rem",
              }}
              renderInput={params => (
                <TextField {...params} variant="standard" sx={{ ml: 0.5 }} />
              )}
            />
          }
          , "Password", "Password again"{" "}
          {
            <Autocomplete
              id="combo-box-demo"
              freeSolo
              options={component}
              sx={{
                width: 200,
                display: "inline-flex",
                ml: 1,
                border: "1px solid",
                borderRadius: "0.4rem",
              }}
              renderInput={params => (
                <TextField {...params} variant="standard" sx={{ ml: 0.5 }} />
              )}
            />
          }{" "}
          and a "Register" button. Both pages should have their own text on the
          bottom of all components. Texts are "Do you have an account? Login”
          and "If you don’t have an account, Register". Two pages must be
          switchable amongst themselves using conditional rendering with links
          to the login or register page while using{" "}
          {
            <Autocomplete
              id="combo-box-demo"
              freeSolo
              options={linkOptions}
              sx={{
                width: 200,
                display: "inline-flex",
                border: "1px solid",
                borderRadius: "0.4rem",
              }}
              renderInput={params => (
                <TextField {...params} variant="standard" sx={{ ml: 0.5 }} />
              )}
            />
          }{" "}
          on “Login” and “Register” texts.
          <br />
          <br />
          <b>Design Details:</b> You must do all of the styling implementations{" "}
          {
            <Autocomplete
              id="combo-box-demo"
              freeSolo
              options={styleOptions}
              sx={{
                width: 200,
                display: "inline-flex",
                border: "1px solid",
                borderRadius: "0.4rem",
              }}
              renderInput={params => (
                <TextField {...params} variant="standard" sx={{ ml: 0.5 }} />
              )}
            />
          }
          . Whole app must be inside a MUI Grid container and all the individual
          components must be inside a Grid item with xs prop having a value of
          8. All individual components must be aligned in a column and have 20px
          margin top value, using the sx prop. sx={"{{....}}"}. Page must have a
          linear gradient background from left to right with these properties:
          “to bottom right, #FFFFFF, #9198e5”. All the MUI Text Field components
          should have a white background color.
          <br />
          <br />
          <b>Additional guidance notes:</b> All the code you produce should be
          on a single App.js file which is a modified version of a standard
          React app's App.js file. Use Material UI grids and mt prop for
          stylings.
        </p>
      </Grid>
      <Grid item xs={2}></Grid>
    </Grid>
  );
}
