import React, { useContext } from "react";
import SignUpForm from "./pages/onboarding/Signup";
import "./App.css";
import "./index.css";
import { Route, Routes } from "react-router-dom";
import { authRoutes } from "./constant/authRoutes";
import { routes } from "./constant/routes";
import { AuthContext } from "./context/AuthContext";


function App() {
  const { token } = useContext(AuthContext);



  return (
      <Routes>
        
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
