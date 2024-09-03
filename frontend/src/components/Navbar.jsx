import React, { useState, useEffect, useContext } from "react";
import { NavLink } from "react-router-dom";
import { GiHamburgerMenu, GiCrossMark } from "react-icons/gi";
import { motion, AnimatePresence } from "framer-motion";
import "../styles/navbar.css";
import { server, Context } from "../main";
import toast from "react-hot-toast";
import axios from "axios";
import DarkModeButton from "./Darkreadersetup";

const Navbar = () => {
  const [showMenu, setShowMenu] = useState(false);
  const { setIsAuthenticated, setLoading } = useContext(Context);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 980) {
        setShowMenu(false);
      }
    };

    // Add a listener for window resize events
    window.addEventListener("resize", handleResize);

    // Cleanup the listener when the component unmounts
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const logoutHandler = async () => {
    setLoading(true);
    try {
      await axios.get(`${server}/users/logout`, {
        withCredentials: true,
      });

      toast.success("Logged Out Successfully");
      setIsAuthenticated(false);
      setLoading(false);
    } catch (error) {
      toast.error(error.response.data.message);
      setIsAuthenticated(true);
      setLoading(false);
    }
  };

  const menuVariants = {
    hidden: {
      opacity: 0,
      y: -20,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <>
      <div className="navbarfull bg-green-300">
        <nav className={showMenu ? "main-nav" : "main-nav shadow"}>
          <div className="brand">
            <NavLink to="/">
              <h2>Notify</h2>
            </NavLink>
          </div>

          <div className="menu-link">
            <NavLink to="/">Home</NavLink>
            <NavLink to="/reminders">Reminders</NavLink>
            <NavLink to="/contact">Contact</NavLink>
            <button
              onClick={() => logoutHandler()}
              className="bg-transparent border border-green-800 hover:bg-green-500 hover:text-grey text-grey-100 font-semibold py-1 px-3 rounded-full shadow-xl"
            >
              Logout
            </button>
            <DarkModeButton />
          </div>

          <div className="hamburger-menu">
            <button onClick={() => setShowMenu(!showMenu)}>
              {showMenu ? <GiCrossMark /> : <GiHamburgerMenu />}
            </button>
            &nbsp;&nbsp;&nbsp;&nbsp;
            <DarkModeButton />
          </div>
        </nav>

        <div className={showMenu ? "mobile-menu-open" : "mobile-menu-close"}>
          <AnimatePresence>
            {showMenu && (
              <motion.div
                className="dropdown-menu"
                initial="hidden"
                animate="visible"
                exit="hidden"
                variants={menuVariants}
              >
                <NavLink to="/">Home</NavLink>
                <NavLink to="/reminders">Reminders</NavLink>
                <NavLink to="/contact">Contact</NavLink>
                <button
                  className="mx-auto block font-semibold"
                  onClick={() => logoutHandler()}
                >
                  Logout
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </>
  );
};

export default Navbar;
