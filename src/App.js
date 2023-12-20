import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Route, Routes } from "react-router-dom";
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
import Evaluation from "./Results/Evaluation";
import MagicLogin from "./login/MagicLogin";

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
  const [loggedIn, setLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState("");

  const URL = "http://localhost:3001";

  // Dealing with the token
  const token = JSON.parse(localStorage.getItem("token"));

  useEffect(() => {
    const verify_token = async () => {
      if (token === null) return setLoggedIn(false);
      try {
        axios.defaults.headers.common["Authorization"] = token;
        const response = await axios.post(`${URL}/users/verify`);
        return response.data.ok ? login(token) : logout();
      } catch (error) {
        console.log(error);
      }
    };
    verify_token();
  }, []);

  // ---

  // Sign in, log in, log out
  const login = token => {
    localStorage.setItem("token", JSON.stringify(token));
    setLoggedIn(true);
  };
  const logout = () => {
    localStorage.removeItem("token");
    setLoggedIn(false);
  };
  const signIn = async (email, magicLink) => {
    try {
      const res = await axios.post(`${URL}/users/enter`, { email, magicLink });
      if (res.data.token) {
        alert(res.data.message);
        login(res.data.token);
      } else {
        alert(res.data.message);
      }
    } catch (e) {
      alert(e);
    }
  };
  // ---

  // Event listeners
  const enterEmail = e => {
    setUserEmail(e.target.value);
  };

  const emailSubmit = e => {
    e.preventDefault();
    signIn(userEmail);
    setUserEmail("");
  };
  // ---

  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <p>You are logged {loggedIn ? "in" : "out"}</p>
        {!loggedIn ? (
          <UserEmail
            enterEmail={enterEmail}
            emailSubmit={emailSubmit}
            userEmail={userEmail}
            setUserEmail={setUserEmail}
          />
        ) : (
          <button onClick={logout}>Logout</button>
        )}
        <Routes>
          <Route path="/" element={<MagicLogin />} />
          <Route path="/home" element={<Home />} />
          <Route path="/evaluation" element={<Evaluation />} />
          <Route
            path="enter/:email/:link"
            element={<Enter signIn={signIn} />}
          />
          <Route
            path="/cody-create-conversation"
            element={<CodyConversation />}
          />
          <Route path="/cody-bot-list" element={<CodyBotList />} />
          <Route path="/cody-message" element={<CodyMessages />} />
          <Route path="/chatGPT" element={<ChatGPT />} />
          {/* <Route path="/codesandbox-test" element={<CodesandboxTest />} /> */}
          {/* <Route path="/codesandbox" element={<Codesandbox />} /> */}
          <Route path="/login-register" element={<LoginRegister />} />
          <Route path="/prompt-templates" element={<PromptTemplates />} />
          <Route path="/codesandbox-url" element={<CodesandboxUrl />} />
          <Route path="/palm" element={<Palm />} />
          <Route path="/send-template" element={<SendTemplate />} />
        </Routes>
      </ThemeProvider>
    </div>
  );
}

export default App;
