import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Dashboard from "./components/Dashboard/Dashboard";

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-b to-zinc-900 from-indigo-950 text-zinc-100">
      <Dashboard />
    </div>
  );
}

export default App;
