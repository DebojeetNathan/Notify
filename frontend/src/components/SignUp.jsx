import React, { useContext, useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";
import { Context, server } from "../main";
import toast from "react-hot-toast";
import { NavLink } from "react-router-dom";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");
  const [password, setPassword] = useState("");
  const { isAuthenticated, setIsAuthenticated, loading, setLoading } =
    useContext(Context);

  const submitHandler = async (e) => {
    setLoading(true);
    e.preventDefault();
    try {
      const { data } = await axios.post(
        `${server}/users/register`,
        {
          name,
          email,
          password,
          number,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      toast.success(data.message);
      setIsAuthenticated(true);
      setLoading(false);
    } catch (error) {
      toast.error(error.response.data.message);
      setIsAuthenticated(false);
      setLoading(false);
    }
  };

  if (isAuthenticated) return <Navigate to={"/"} />;
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-green-300 rounded-lg shadow-lg p-6 w-5/6 md:w-3/4 lg:w-2/3 xl:w-1/2">
        <div className="md:flex">
          <div className="md:w-1/2 p-6">
            <h1 className="text-6xl font-bold text-green mb-4">Notify</h1>
            <br />
            <p className="text-gray text-lg">
              Say goodbye to missed doses and hello to a healthier, happier you.
              Welcome to Notify
            </p>
          </div>

          <div className="md:w-1/2 p-6">
            <h5 className="text-4xl text-center font-bold">Sign Up</h5>
            <br />
            <form onSubmit={submitHandler}>
              <div className="mb-4">
                <input
                  type="text"
                  className="w-full p-2 border-b-2 border-gray-400 focus:outline-none focus:border-blue-500 rounded-xl"
                  placeholder="Username"
                  value={name}
                  required
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div className="mb-4">
                <input
                  type="text"
                  className="w-full p-2 border-b-2 border-gray-400 focus:outline-none focus:border-blue-500 rounded-xl"
                  placeholder="Email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <input
                  type="text"
                  className="w-full p-2 border-b-2 border-gray-400 focus:outline-none focus:border-blue-500 rounded-xl"
                  placeholder="Mobile Number"
                  value={number}
                  required
                  onChange={(e) => setNumber(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <input
                  type="password"
                  className="w-full p-2 border-b-2 border-gray-400 focus:outline-none focus:border-blue-500 rounded-xl"
                  placeholder="Password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <div className="flex justify-between items-center mb-4">
                <label className="flex items-center space-x-2">
                  <p className="text-right">
                    {" "}
                    {/* Align the link to the right */}
                    Have an account?
                  </p>
                </label>
                <NavLink
                  to="/login"
                  className="underline decoration-sky-500 text-cyan-700"
                >
                  Login to Your Account
                </NavLink>
              </div>
              <br />
              <div className="text-center">
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-5/6"
                  disabled={loading}
                  type="submit"
                >
                  Sign Up
                </button>
              </div>
              <br />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
