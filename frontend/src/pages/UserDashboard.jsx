// UserDashboard.js
import React, { useState, useEffect } from "react";
import EditUserModal from "../components/EditUserModal";

const UserDashboard = () => {
  const [isModalVisible, setModalVisible] = useState(false);

  const [pastRentals, setPastRentals] = useState([]);

  useEffect(() => {
    getPastRentals();
  }, []);

  const getPastRentals = () => {
    const url = `http://localhost/auto-noleggio/backend/public/transazioni/noleggiPassati`;

    const token = localStorage.getItem("userToken");

    const headers = {
      Accept: "application/json",
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    };

    fetch(url, {
      method: "GET",
      headers: headers,
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log("pastRentals", data.content);
        setPastRentals(data.content);
      })
      .catch((error) => {
        console.error(
          "Errore durante il recupero dei noleggi",
          error
        );
      });
  };

  const user = {
    name: "John Doe",
    email: "johndoe@example.com",
    phone: "+1 (555) 555-5555",
    status: "Frequent Renter",
  };

  const rentalHistory = [
    { date: "May 15, 2023", car: "Toyota Camry", duration: "3 days", total: "$150" },
    { date: "April 22, 2023", car: "Honda Civic", duration: "5 days", total: "$250" },
    { date: "March 10, 2023", car: "Ford Mustang", duration: "2 days", total: "$100" },
  ];

  const upcomingRentals = [
    { date: "June 1, 2023", car: "Jeep Wrangler", duration: "4 days", total: "$200" },
  ];

  return (
    <div className="w-full min-h-screen bg-gray-100 overflow-auto">
      <div className="container mx-auto px-4 py-6 w-full">
        <div className="bg-orange-500 text-white p-6 rounded-lg shadow-md w-full">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold">{user.name}</h1>
              <p className="text-lg">{user.status}</p>
            </div>
            <button
              className="bg-blue-500 text-white py-2 px-4 rounded-lg"
              onClick={() => setModalVisible(true)}
            >
              Edit Profile
            </button>
          </div>
          <div className="flex space-x-4 mt-4">
            <button className="bg-white text-black py-2 px-4 rounded-lg">Rentals</button>
            <button className="bg-gray-600 text-white py-2 px-4 rounded-lg">Preferences</button>
            <button className="bg-gray-600 text-white py-2 px-4 rounded-lg">Billing</button>
          </div>
        </div>

        <div className="mt-6 w-full">
          <h2 className="text-2xl font-semibold">Rental History</h2>
          <div className="overflow-x-auto mt-2 w-full">
            <table className="w-full bg-white rounded-lg shadow-md">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-2 text-left">Date</th>
                  <th className="px-4 py-2 text-left">Car</th>
                  <th className="px-4 py-2 text-left">Duration</th>
                  <th className="px-4 py-2 text-left">Total</th>
                </tr>
              </thead>
              <tbody>
                {rentalHistory.map((rental, index) => (
                  <tr key={index} className="border-t">
                    <td className="px-4 py-2">{rental.date}</td>
                    <td className="px-4 py-2">{rental.car}</td>
                    <td className="px-4 py-2">{rental.duration}</td>
                    <td className="px-4 py-2">{rental.total}</td>
                    
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="mt-6 w-full">
          <h2 className="text-2xl font-semibold">Upcoming Rentals</h2>
          <div className="overflow-x-auto mt-2 w-full">
            <table className="w-full bg-white rounded-lg shadow-md">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-2 text-left">Date</th>
                  <th className="px-4 py-2 text-left">Car</th>
                  <th className="px-4 py-2 text-left">Duration</th>
                  <th className="px-4 py-2 text-left">Total</th>
                  <th className="px-4 py-2 text-left"></th>
                </tr>
              </thead>
              <tbody>
                {upcomingRentals.map((rental, index) => (
                  <tr key={index} className="border-t">
                    <td className="px-4 py-2">{rental.date}</td>
                    <td className="px-4 py-2">{rental.car}</td>
                    <td className="px-4 py-2">{rental.duration}</td>
                    <td className="px-4 py-2">{rental.total}</td>
                    <td className="px-4 py-2">
                      <button className="bg-red-500 text-white py-1 px-3 rounded-lg" onClick={() => handleCancel(index)}>
                        Cancel
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {isModalVisible && <EditUserModal setVisible={setModalVisible} user={user} />}
    </div>
  );
};

export default UserDashboard;
