import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import "./App.css";
import ChatGPT from "./llms/ChatGPT";
import Palm from "./llms/Palm";
import Codesandbox from "./sandboxes/Codesandbox";
import CodesandboxTest from "./sandboxes/CodesandboxTest";
import CodesandboxUrl from "./sandboxes/CodesandboxUrl";
import CodyBotList from "./llms/Cody/CodyListBots";
import CodyConversation from "./llms/Cody/CodyConversation";
import CodyMessages from "./llms/Cody/CodyMessage";
import LoginRegister from "./templatePrompts/LoginRegister";
import PromptTemplates from "./templatePrompts/PromptTemplates";
import Home from "./home/Home";
import SendTemplate from "./templatePrompts/SendTemplate";
import Enter from "./components/Enter";
import UserEmail from "./components/UserEmail";
import { useEffect, useState } from "react";
import axios from "axios";
import MagicLogin from "./login/MagicLogin";
import Evaluation from "./Results/Evaluation";
import ProtectedRoute from "./ProtectedRoute";
import { Button, Grid, Typography } from "@mui/material";

const theme = createTheme({
  components: {
    MuiTypography: {
      defaultProps: {
        color: "black",
        textTransform: "none",
        fontSize: 18,
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          fontSize: "1.3rem",
          textTransform: "none",
          color: "white",
          backgroundColor: "#572bb1",
          border: "2px solid grey",
          ":hover": {
            // backgroundColor: "#A8F3FD",
            backgroundColor: "#00e7e7",
            color: "black",
          },
        },
      },
    },
  },
});

function App() {
  const token = localStorage.getItem("token");

  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <Routes>
          <Route path="/login" element={<MagicLogin />} />
          <Route path="enter/:email/:link" element={<Enter />} />
          <Route
            element={
              <ProtectedRoute isLoggedIn={token}>
                <Home />
              </ProtectedRoute>
            }
            path="/"
          />

          <Route
            path="/prompt-templates"
            element={
              <ProtectedRoute isLoggedIn={token}>
                <PromptTemplates />
              </ProtectedRoute>
            }
          />

          <Route
            path="/evaluation"
            element={
              <ProtectedRoute isLoggedIn={token}>
                <Evaluation />
              </ProtectedRoute>
            }
          />
          {/* <Route path="/send-template" element={<SendTemplate />} /> */}
        </Routes>
      </ThemeProvider>
    </div>
  );
}

export default App;
