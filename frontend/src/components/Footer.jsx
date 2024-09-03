import React from "react";
import { NavLink } from "react-router-dom";

const Footer = () => {
  return (
    <>
      <footer className="bg-green-300">
        <div className="w-full max-w-screen-xl mx-auto p-8 md:py-8">
          <div className="sm:flex sm:items-center sm:justify-between">
            <NavLink to="/" className="flex items-center mb-4 sm:mb-0">
              <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-black">
                NOTIFY
              </span>
            </NavLink>
            <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-black sm:mb-0 dark:text-black">
              {/* <li>
                <a href="https://anii693.vercel.app/" className="mr-4 hover:underline md:mr-6">
                  Portfolio
                </a>
              </li> */}

              <NavLink to="/contact" className="hover:underline">
                Contact
              </NavLink>
            </ul>
          </div>
          <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
          {/* <span className="block text-sm text-black sm:text-center dark:text-black">
            ANii693 :{" "}
            <a href="https://github.com/ANii693" className="hover:underline">
              GitHub
            </a>
          </span> */}
        </div>
      </footer>
    </>
  );
};

export default Footer;
