import React from "react";
import { HashRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Dashboard from "./pages/Dashboard/Dashboard";
import Settings from "./pages/Settings/Settings";
import SendJSON from "./pages/SendJSON/SendJSON";
import SideBar from "./components/SideBar";

function App() {
  return (
    <div className="flex">
      <HashRouter>
        <SideBar />

        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/send" element={<SendJSON />} />
        </Routes>
      </HashRouter>
    </div>
  );
}

export default App;
