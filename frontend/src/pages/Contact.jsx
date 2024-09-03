import React, { useContext } from "react";
import { Context } from "../main";
import Loading from "../components/Loading";
import { Navigate } from "react-router-dom";
import { FaLinkedin, FaInstagram, FaTwitter, FaEnvelope } from "react-icons/fa";
import "../styles/contact.css";

const Contact = () => {
  const { isAuthenticated, loading } = useContext(Context);
  if (!isAuthenticated) return <Navigate to="/login" />;

  return loading ? (
    <Loading />
  ) : (
    <div className=" screen flex items-center justify-center">
      <div className="bg-green-300 rounded-lg p-7 px-20 contact-box">
        <div className="md:flex">
          <div className="md:w-full p-6">
            <h2 className="text-4xl md:text-5xl text-center mb-4 text-gray-800 font-bold">
              Developer Contact
            </h2>
            <br />

            <p className="mb-4 text-xl flex items-center">
              <FaEnvelope className="icon text-2xl mr-3" />{" "}
              <a
                href="mailto:
                  ipsdebojeet5101@gmail.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
              >
                ipsdebojeet5101@gmail.com
              </a>
            </p>
            <p className="mb-4 text-xl flex items-center">
              <FaLinkedin className="icon text-2xl mr-3" />{" "}
              <a
                href="https://www.linkedin.com/in/debojeet-nathan-b422a926b/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
              >
                LinkedIn profile
              </a>
            </p>
            <p className="mb-4 text-xl flex items-center">
              <FaInstagram className="icon text-2xl mr-3" />{" "}
              <a
                href="https://www.instagram.com/debojeetnathan"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
              >
                Instagram profile
              </a>
            </p>
            <p className="mb-4 text-xl flex items-center">
              <FaTwitter className="icon text-2xl mr-3" />{" "}
              <a
                href="https://twitter.com/debojeetnathan"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
              >
                Twitter profile
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
