// UserDashboard.js
import React, { useState, useEffect } from "react";
import EditUserModal from "../components/EditUserModal";

const UserDashboard = () => {
  const [isModalVisible, setModalVisible] = useState(false);

  const [pastRentals, setPastRentals] = useState([]);
  const [upcomingRentals, setUpcomingRentals] = useState([]);

  useEffect(() => {
    getPastRentals();
    getUpcomingRentals();
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

  const getUpcomingRentals = () => {
    const url = `http://localhost/auto-noleggio/backend/public/transazioni/noleggiFuturi`;

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
        console.log("futureRentals", data.content);
        setUpcomingRentals(data.content);
      })
      .catch((error) => {
        console.error(
          "Errore durante il recupero dei noleggi",
          error
        );
      });
  };

  const user = {
    name: localStorage.getItem("userName") + " " + localStorage.getItem("userSurname"),
    email: localStorage.getItem("userEmail"),
    phone: localStorage.getItem("userPhone"),
    status: "Frequent Renter",
  };

  //const rentalHistory = getPastRentals();

  //const upcomingRentals = getUpcomingRentals();

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
              Modifica profilo
            </button>
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
                {pastRentals.map((rental, index) => (
                  <tr key={index} className="border-t">
                    <td className="px-4 py-2">{new Date(rental.data_inizio).toLocaleDateString(undefined, {
  year: 'numeric',
  month: 'long',
  day: 'numeric'})}</td>
                    <td className="px-4 py-2">{rental.marca + " " + rental.modello}</td>
                    <td className="px-4 py-2">{Math.ceil((new Date(rental.data_fine) - new Date(rental.data_inizio)) / (1000 * 60 * 60 * 24))} giorni</td>
                    <td className="px-4 py-2">{rental.importo}</td>
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
             
                    <td className="px-4 py-2">{new Date(rental.data_inizio).toLocaleDateString(undefined, {
  year: 'numeric',
  month: 'long',
  day: 'numeric'})}</td>
                    <td className="px-4 py-2">{rental.marca + " " + rental.modello}</td>
                    <td className="px-4 py-2">{Math.ceil((new Date(rental.data_fine) - new Date(rental.data_inizio)) / (1000 * 60 * 60 * 24))} giorni</td>
                    <td className="px-4 py-2">{rental.importo}</td>
                  
                    <td className="px-4 py-2">
                      <button className="bg-red-500 text-white py-1 px-3 rounded-lg" onClick={() => handleCancel(index)}>
                        Annulla
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
