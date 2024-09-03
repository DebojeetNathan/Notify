import React, { useState, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-hot-toast";
import axios from "axios";
import { Context, server } from "../main.jsx";
import Loading from "../components/Loading.jsx";

const Reset = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();
  const { setLoading, loading } = useContext(Context);
  const params = useParams();

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data } = await axios.put(
        `${server}/users/password/reset/${params.token}`,
        {
          password: newPassword,
          confirmPassword,
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
      <div className="bg-green-300 rounded-lg py-4 px-16 contact-box">
        <div className="md:flex">
          <form onSubmit={submitHandler}>
            <div className="md:w-full p-6">
              <h2 className="text-4xl md:text-4xl text-center mb-4 text-gray-800 font-bold">
                Reset Password
              </h2>
              <br />
              <div className="mb-6">
                <input
                  type="password"
                  className="w-full p-2 border-b-2 border-gray-400 focus:outline-none focus:border-blue-500 rounded-xl"
                  placeholder="New Password"
                  required
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </div>
              <div className="mb-6">
                <input
                  type="password"
                  className="w-full p-2 border-b-2 border-gray-400 focus:outline-none focus:border-blue-500 rounded-xl"
                  placeholder="Confrim Password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
              <div className="text-center">
                <button
                  className="bg-blue-500 hover-bg-blue-700 text-white font-bold py-2 px-4 rounded w-5/6"
                  type="submit"
                >
                  Reset
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Reset;
