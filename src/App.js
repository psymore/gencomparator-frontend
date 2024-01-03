import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import ProtectedRoute from "./lib/ProtectedRoute";
import Enter from "./scenes/components/Enter";
import Home from "./scenes/home/Home";
import MagicLogin from "./scenes/login/MagicLogin";
import PromptTemplates from "./scenes/prompt/PromptTemplates";
import SendPrompt from "./scenes/prompt/SendPrompt";

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
          variant: "outlined",
          border: "2px solid grey",
          backgroundColor: "#415ebb",
          ":hover": {
            backgroundColor: "#374151",
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

          <Route path="/send-prompt" element={<SendPrompt />} />

          {/* <Route
            path="/evaluation"
            element={
              <ProtectedRoute isLoggedIn={token}>
                <Evaluation />
              </ProtectedRoute>
            }
          /> */}
        </Routes>
      </ThemeProvider>
    </div>
  );
}

export default App;
