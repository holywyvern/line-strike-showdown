import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";

import { WebAudio } from "./utils/WebAudio.js";

import "./index.css";
import "react-modern-drawer/dist/index.css";

console.log("Web Audio", WebAudio.initialize());

// ReactDOM.createRoot(document.getElementById("root")).render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
