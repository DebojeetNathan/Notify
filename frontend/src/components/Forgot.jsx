import React, { useState, useContext } from "react";

import { toast } from "react-hot-toast";
import { server, Context } from "../main";
import axios from "axios";
import Loading from "../components/Loading";

import { useNavigate } from "react-router-dom";

const Forgot = () => {
  const navigate = useNavigate();
  const { setLoading, loading } = useContext(Context);
  const [email, setEmail] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data } = await axios.post(
        `${server}/users/password/forgot`,
        {
          email,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      toast.success(data.message);
      setLoading(false);
      // <Navigate to="/login" />     THIS WONT WORKKK INSIDE SUBMITHANDLER
      navigate("/login");
    } catch (error) {
      toast.error(error.response.data.message);
      setLoading(false);
    }
  };

  return loading ? (
    <Loading />
  ) : (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-green-300 rounded-lg shadow-lg p-6 w-5/6 md:w-3/4 lg:w-2/3 xl:w-1/2">
        <div className="md:flex">
          <div className="md:w-1/2 p-6">
            <h1 className="text-5xl font-bold text-green mb-4">Notify</h1>

            <p className="text-gray text-lg">Forgot your password?</p>
            <p className="text-gray text-lg">
              No worries! Enter your email, check your inbox & spam, reset your
              password from the link.
            </p>
            <p className="text-gray text-lg">It's that simple.</p>
          </div>
          <div className="md:w-1/2 p-6">
            <h5 className="text-3xl font-bold">Forgot!?</h5>
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

              <div className="text-center">
                <button
                  className="bg-blue-500 hover-bg-blue-700 text-white font-bold py-2 px-4 rounded w-5/6"
                  type="submit"
                >
                  Recover
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

export default Forgot;
