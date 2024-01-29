import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import ProtectedRoute from "./lib/ProtectedRoute";
import Enter from "./scenes/components/Enter";
import Home from "./scenes/home/Home";
import MagicLogin from "./scenes/login/MagicLogin";
import PromptTemplates from "./scenes/prompt/PromptTemplates";
import Collection from "./scenes/prompt/Collection";
import Cafe from "./Cafe";

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
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <Routes>
          <Route path="/login" element={<MagicLogin />} />
          <Route path="enter/:email/:link" element={<Enter />} />
          <Route
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
            path="/"
          />

          <Route
            path="/prompt-templates"
            element={
              <ProtectedRoute>
                <PromptTemplates />
              </ProtectedRoute>
            }
          />

          <Route path="/collection" element={<Collection />} />
          {/* <Route path="/cafe" element={<Cafe />} /> */}

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
