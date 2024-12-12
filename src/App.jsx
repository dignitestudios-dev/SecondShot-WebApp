import React from "react";
import ToolboxSection from "./components/ToolboxSection/ToolboxSection ";
import SignUpForm from "./pages/onboarding/Signup";
import "./App.css";
import "./index.css";
import { Route, Routes } from "react-router-dom";
import { authRoutes } from "./constant/authRoutes";
import { routes } from "./constant/routes";

function App() {
  return (
    <Routes>
      <Route path="/" element={<SignUpForm />} />
      {authRoutes.map((route) => {
        return (
          <Route path={route?.url} element={route?.page} key={route?.title} />
        );
      })}
      {routes?.map((route, key) => (
        <Route path={route?.url} element={route?.page} key={key} />
      ))}
    </Routes>
  );
}

export default App;
