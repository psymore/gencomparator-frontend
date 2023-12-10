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

const theme = createTheme({
  components: {
    MuiTypography: {
      defaultProps: {
        color: "#FFFFFF",
        textTransform: "none",
        fontSize: "2rem",
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          fontSize: "1.3rem",
          textTransform: "none",
          color: "white",
          backgroundColor: "#282e59",
          ":hover": {
            backgroundColor: "#A8F3FD",
            color: "black",
          },
        },
      },
    },
  },

  typography: { fontSize: 13 },
});

function App() {
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <Routes>
          <Route path="/" element={<Home />} />
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
        </Routes>
      </ThemeProvider>
    </div>
  );
}

export default App;
