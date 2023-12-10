import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { transitions, positions, Provider as AlertProvider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

const options = {
  timeout: 3000,
  position: positions.TOP_RIGHT,
  transition: transitions.SCALE,
};

root.render(
  // <React.StrictMode>
  <AlertProvider template={AlertTemplate} {...options}>
    <App />
  </AlertProvider>
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals())
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
