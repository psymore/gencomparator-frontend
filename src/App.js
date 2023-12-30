import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Enter from "./scenes/components/Enter";
import Home from "./scenes/home/Home";
import MagicLogin from "./scenes/login/MagicLogin";
import ProtectedRoute from "./lib/ProtectedRoute";
import Evaluation from "./scenes/results/Evaluation";
import PromptTemplates from "./scenes/templatePrompts/PromptTemplates";
import SetApiKeys from "./scenes/apiKeys/SetApiKeys";

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
            element={
              <ProtectedRoute isLoggedIn={token}>
                <SetApiKeys />
              </ProtectedRoute>
            }
            path="/set-keys"
          />

          <Route
            path="/prompt-templates"
            element={
              // <ProtectedRoute isLoggedIn={token}>
              <PromptTemplates />
              // </ProtectedRoute>
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
