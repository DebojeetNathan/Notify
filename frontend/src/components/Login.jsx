import axios from "axios";
import React, { useContext, useState } from "react";
import { toast } from "react-hot-toast";
import { Navigate, NavLink } from "react-router-dom";
import { Context, server } from "../main";

const Login = () => {
  const { isAuthenticated, setIsAuthenticated, setLoading } =
    useContext(Context);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data } = await axios.post(
        `${server}/users/login`,
        {
          email,
          password,
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
      setLoading(false);
      setIsAuthenticated(false);
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
              Say goodbye to missed reminders and hello to a healthier, happier you.
              Welcome to Notify
            </p>
          </div>
          <div className="md:w-1/2 p-6">
            <h5 className="text-4xl font-bold">Login</h5>
            <br />
            <p>
              Don't have an account? <br />
              <NavLink
                to="/signup"
                className="underline decoration-sky-500 text-cyan-700"
              >
                Create Your Account
              </NavLink>{" "}
              it takes less than a minute
            </p>
            <br />
            <form onSubmit={submitHandler}>
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
              <div className="mb-6">
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
                  <input type="checkbox" checked className="form-checkbox" />
                  <span className="text-brown">Remember me</span>
                </label>
                <NavLink to="/forgot" className=" text-grey hover:underline">
                  Forget password?
                </NavLink>
              </div>
              <div className="text-center">
                <button
                  className="bg-blue-500 hover-bg-blue-700 text-white font-bold py-2 px-4 rounded w-5/6"
                  type="submit"
                >
                  Login
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

export default Login;
