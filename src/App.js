import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Dashboard from "./pages/Dashboard";
import Settings from "./pages/Settings";
import SendJSON from "./pages/SendJSON/SendJSON";
import SideBar from "./components/SideBar";

function App() {
  return (
    <div className="flex">
      <BrowserRouter>
        <SideBar />

        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/send" element={<SendJSON />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
