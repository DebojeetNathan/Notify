import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./styles/index.css";
import { createContext } from "react";
import { ChakraProvider } from "@chakra-ui/react";


// export const server = "https://notify-backend-0k4u.onrender.com/api/v1";
// export const server = "https://notify-backend-git-main-anirudhs-projects-92ea9cec.vercel.app/api/v1";
export const server = "http://localhost:7000/api/v1";

export const Context = createContext({ isAuthenticated: false });

const AppWrapper = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(false);
  // const [user, setUser] = useState({});

  return (
    <Context.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
        loading,
        setLoading,
      }}
    >
      <App />
    </Context.Provider>
  );
};

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ChakraProvider>
      <AppWrapper />
    </ChakraProvider>
  </React.StrictMode>
);
