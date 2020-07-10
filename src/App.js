import React from "react";
import { BrowserRouter } from "react-router-dom";
import Layout from "./components/Layout";
import "./sass/main.scss";

function App() {
  return (
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  );
}

export default App;
