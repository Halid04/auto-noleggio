// EditUserModal.js
import React, { useState } from "react";
import { X } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";

const EditUserModal = ({ setVisible, user }) => {
  const [userData, setUserData] = useState(user);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSaveChanges = (e) => {
    e.preventDefault();

    // Simulate API call to save user data
    setTimeout(() => {
      toast.success("Profile updated successfully", { duration: 1500 });
      setVisible(false);
    }, 500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative w-full max-w-lg bg-white border border-gray-200 rounded-lg shadow-lg p-6">
        <div className="flex justify-end">
          <X className="cursor-pointer" onClick={() => setVisible(false)} />
        </div>
        <form className="space-y-4" onSubmit={handleSaveChanges}>
          <h5 className="text-lg font-medium text-gray-900">Edit Profile</h5>
          {[
            { label: "Name", name: "name" },
            { label: "Email", name: "email" },
            { label: "Phone", name: "phone" },
            { label: "Password", name: "password" },
          ].map((field) => (
            <div key={field.name}>
              <label
                htmlFor={field.name}
                className="block mb-1 text-sm font-medium text-gray-900"
              >
                {field.label}
              </label>
              <input
                type={field.name === "password" ? "password" : "text"}
                name={field.name}
                id={field.name}
                value={userData[field.name]}
                onChange={handleInputChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5"
                required
              />
            </div>
          ))}
          <button
            type="submit"
            className="w-full text-white bg-orange-500 hover:bg-orange-600 focus:ring-4 focus:outline-none focus:ring-orange-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
          >
            Save Changes
          </button>
        </form>
        <Toaster />
      </div>
    </div>
  );
};

export default EditUserModal;
