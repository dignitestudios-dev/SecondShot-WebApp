import React from "react";
import SignUpForm from "./pages/onboarding/Signup";
import "./App.css";
import "./index.css";
import { Route, Routes } from "react-router-dom";
import { authRoutes } from "./constant/authRoutes";
import { routes } from "./constant/routes";
import { ModalProvider } from "./context/GlobalContext";

function App() {
  return (
    <ModalProvider>
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
    </ModalProvider>
  );
}

export default App;
