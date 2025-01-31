import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { ToasterContainer } from "./components/toaster/ToasterContainer.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
import { ModalProvider } from "./context/GlobalContext.jsx";
import "swiper/swiper-bundle.css";
createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <ModalProvider>
        <ToasterContainer />
        <AuthProvider>
          <App />
        </AuthProvider>
      </ModalProvider>
    </BrowserRouter>
  </React.StrictMode>
);
