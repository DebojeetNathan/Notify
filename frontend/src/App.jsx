import Home from "./pages/Home.jsx";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import Login from "./components/Login.jsx";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignUp from "./components/SignUp.jsx";
import Contact from "./pages/Contact.jsx";
import Reminders from "./pages/Reminders.jsx";
import axios from "axios";
import { Context, server } from "./main";
import { Toaster } from "react-hot-toast";
import { useContext, useEffect } from "react";
import Forgot from "./components/Forgot.jsx";
import Reset from "./components/Reset.jsx";

function App() {
  const { setIsAuthenticated, setLoading, isAuthenticated } =
    useContext(Context);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${server}/users/auth`, {
        withCredentials: true,
      })
      .then((res) => {
        // setUser(res.data.user);
        setIsAuthenticated(true);
        setLoading(false);
      })
      .catch((error) => {
        if (error.response.status === 401) {
          console.error("Unauthorized");
        } else {
          console.error(error); // Log other errors
        }
        // setUser({});
        setIsAuthenticated(false);
        setLoading(false);
      });
  }, [setIsAuthenticated, setLoading]);
  return (
    <>
      <Router>
        {isAuthenticated ? <Navbar /> : null}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgot" element={<Forgot />} />
          <Route path="/reset/:token" element={<Reset />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/reminders" element={<Reminders />} />
        </Routes>
        <Footer />
        <Toaster />
      </Router>
    </>
  );
}

export default App;
