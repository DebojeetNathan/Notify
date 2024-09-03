import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { server, Context } from "../main";
import toast from "react-hot-toast";
import { Navigate } from "react-router-dom";
import Loading from "../components/Loading";
import { BiLogoWhatsapp, BiLogoGmail } from "react-icons/bi";
import NoRemindersMessage from "../components/NoRemindersMessage";

const Reminders = () => {
  const [reminders, setReminders] = useState([]);
  const [refresh, setRefresh] = useState(true);
  const { isAuthenticated, loading, setLoading } = useContext(Context);

  useEffect(() => {
    const fetchReminders = async () => {
      setLoading(true);
      try {
        const { data } = await axios.get(`${server}/reminder/getAllReminder`, {
          withCredentials: true,
        });
        setReminders(data.Reminderlist);
        setLoading(false);
      } catch (error) {
        console.error("Error:", error);
        setLoading(false);
      }
    };

    fetchReminders();
  }, [refresh, setLoading]);

  const deleteReminder = async (id) => {
    try {
      const { data } = await axios.delete(`${server}/reminder/delete/${id}`, {
        withCredentials: true,
      });
      toast.success(data.message);
    } catch (error) {
      toast.error(error.response.data.message);
    }
    setRefresh((prev) => !prev);
  };

  if (!isAuthenticated) return <Navigate to="/login" />;

  return loading ? (
    <Loading />
  ) : (
    <div className="min-h-screen px-5 md:px-14 lg:px-32 py-9 pb-20">
      <h1 className="text-center m-12 text-3xl md:text-4xl lg:text-5xl font-bold">
        Your Reminder List
      </h1>
      {reminders.length === 0 ? (
        <NoRemindersMessage />
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse border border-green-500">
            <thead>
              <tr>
                <th className="border bg-green-200 text-center py-2 px-4">
                  Name
                </th>
                <th className="border bg-green-200 text-center py-2 px-4">
                  Time (24hr : 60min)
                </th>
                <th className="border bg-green-200 text-center py-2 px-4">
                  Notification Methods
                </th>
                <th className="border bg-green-200 text-center py-2 px-4">
                  Delete Reminder
                </th>
              </tr>
            </thead>
            <tbody>
              {reminders.map((reminder) => (
                <tr key={reminder._id}>
                  <td className="border py-2 px-4 text-center">
                    {reminder.medicationName}
                  </td>
                  <td className="border py-2 px-4 text-center">{`${
                    reminder.remindhr
                  }${" "}:${" "}${reminder.remindmin}`}</td>
                  <td className="border py-2 md:px-6 lg:px-8 text-center">
                    <div className="flex items-center justify-around">
                      {reminder.whatsapp ? (
                        <BiLogoWhatsapp className="text-green-700 text-lg sm:text-xl md:text-2xl" />
                      ) : (
                        <BiLogoWhatsapp className="text-gray-400 text-lg sm:text-xl md:text-2xl" />
                      )}

                      {reminder.email ? (
                        <BiLogoGmail className="text-green-700 text-lg sm:text-xl md:text-2xl" />
                      ) : (
                        <BiLogoGmail className="text-gray-400 text-lg sm:text-xl md:text-2xl" />
                      )}
                    </div>
                  </td>
                  <td className="border py-2 px-4 text-center">
                    <button
                      onClick={() => deleteReminder(reminder._id)}
                      className="bg-transparent border border-red-900 hover:bg-red-300  text-grey-100 font-semibold py-0 px-2 rounded-md"
                      // className="bg-red-500 hover:bg-red-600 text-white rounded-md transition duration-300 px-2"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Reminders;
