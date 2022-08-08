import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import './index.css';
import App from "./App";
import reportWebVitals from './reportWebVitals';

// Material Dashboard 2 React Context Provider
import { MaterialUIControllerProvider } from "./context";

ReactDOM.render(
  <BrowserRouter>
    <MaterialUIControllerProvider>
      <App />
    </MaterialUIControllerProvider>
  </BrowserRouter>,
  document.getElementById("root")
);

reportWebVitals();
