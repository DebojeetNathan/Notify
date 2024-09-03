import React from "react";
import { NavLink } from "react-router-dom";

const NoRemindersMessage = () => {
  return (
    <div className="text-center py-6">
      <div className="bg-green-400 rounded-full w-48 h-48 mx-auto mb-4 flex items-center justify-center">
        <img
          src="/no-notification.svg"
          alt="No Reminders"
          className="w-32 h-32"
        />
      </div>
      <br />
      <p className="text-2xl font-semibold mb-2 text-gray-800">
        Ohh!! You don't have any reminders set.
      </p>
      <p className="text-gray-600 my-2 text-lg mb-8">Set your reminders now!</p>
      <NavLink
        to="/"
        className="text-green-700 font-semibold text-xl hover:underline"
      >
        Reminders
      </NavLink>
    </div>
  );
};

export default NoRemindersMessage;
