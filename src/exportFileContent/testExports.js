export const chatGPTFileContent = `
import React, { useState } from "react";

const LoginPage = () => {
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const [rememberMe, setRememberMe] = useState(false);

const handleEmailChange = e => {
  setEmail(e.target.value);
};

const handlePasswordChange = e => {
  setPassword(e.target.value);
};

const handleRememberMeChange = () => {
  setRememberMe(!rememberMe);
};

const handleLogin = () => {
  // Add your login logic here, e.g., send a request to your server.
};

const containerStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100vh",
};

const formStyle = {
  width: "50%",
  textAlign: "center",
};

const inputStyle = {
  borderRadius: "8px",
  fontSize: "2rem",
  margin: "10px 0",
  padding: "10px",
  width: "100%",
};

const buttonStyle = {
  borderRadius: "8px",
  fontSize: "2rem",
  padding: "10px 20px",
};

const labelStyle = {
  fontSize: "20px",
};

return (
  <div className="login-page" style={containerStyle}>
    <div className="login-container" style={formStyle}>
      <h1 style={{ fontSize: "3rem" }}>Login</h1>
      <div className="form-field">
        <label style={labelStyle}>Email:</label>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={handleEmailChange}
          style={inputStyle}
        />
      </div>
      <div className="form-field">
        <label style={labelStyle}>Password:</label>
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={handlePasswordChange}
          style={inputStyle}
        />
      </div>
      <div className="form-field">
        <label style={labelStyle}>
          <input
            type="checkbox"
            checked={rememberMe}
            onChange={handleRememberMeChange}
          />
          Remember Me
        </label>
      </div>
      <button onClick={handleLogin} style={buttonStyle}>
        Login
      </button>
    </div>
  </div>
);
};

export default LoginPage;

// Render the ChatGPT component
// ReactDOM.render(<ChatGPT />, document.getElementById("root"));
`;

export const indexJsContent = `import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
`;

export const indexCssContent = `body {
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

code {
  font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
    monospace;
}
`;

export const appJsContent = `import { Route, Routes } from "react-router-dom";
import ChatGPT from "./ChatGPT";


function App() {
  return (
    <div className="App">
      <Routes>
          <Route path="/" element={<ChatGPT />} />

      </Routes>
    </div>
  );
}

export default App;
`;

// const webVitalsContent = `const reportWebVitals = ${reportWebVitalsString}; export default reportWebVitals;`;
export const webVitalsContent = `const reportWebVitals = onPerfEntry => {
  if (onPerfEntry && onPerfEntry instanceof Function) {
    import("web-vitals").then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
      getCLS(onPerfEntry);
      getFID(onPerfEntry);
      getFCP(onPerfEntry);
      getLCP(onPerfEntry);
      getTTFB(onPerfEntry);
    });
  }
};

export const reportWebVitalsString = reportWebVitals.toString();

export default reportWebVitals;
`;

export const packageJsonContent = `
{
  "name": "gencomparator",
  "version": "0.1.0",
  "private": true,
  "dependencies": {
    "@emotion/react": "^11.11.1",
    "@mui/icons-material": "^5.14.15",
    "@mui/material": "^5.14.15",
    "@testing-library/jest-dom": "^5.17.0",
    "@testing-library/react": "^13.4.0",
    "@testing-library/user-event": "^13.5.0",
    "@types/react-transition-group": "^4.4.8",
    "clsx": "^2.0.0",
    "prop-types": "^15.8.1",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-router-dom": "^6.17.0",
    "react-scripts": "5.0.1",
    "read-file": "^0.2.0",
    "web-vitals": "^2.1.4",
    "@emotion/styled": "11.11.0"
  },
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject"
  },
  "eslintConfig": {
    "extends": [
      "react-app",
      "react-app/jest"
    ]
  },
  "browserslist": {
    "production": [
      ">0.2%",
      "not dead",
      "not op_mini all"
    ],
    "development": [
      "last 1 chrome version",
      "last 1 firefox version",
      "last 1 safari version"
    ]
  },
  "devDependencies": {
    "@babel/plugin-proposal-private-property-in-object": "^7.21.11"
  }
}
`;
