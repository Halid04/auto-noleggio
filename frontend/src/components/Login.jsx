import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useParams, useNavigate } from "react-router-dom";
import { X } from "lucide-react";

function Login({ viewRegister, setVisible }) {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLoginSubmit = (e) => {
    e.preventDefault();

    const url = "http://localhost/auto-noleggio/backend/public/login";
    const headers = {
      Accept: "application/json",
      "Content-Type": "application/json",
    };

    const requestBody = {
      email: email,
      password: password,
    };

    console.log("Request body:", requestBody);

    fetch(url, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(requestBody),
    })
      .then(async (response) => {
        if (!response.ok) {
          return response.text().then((text) => {
            throw new Error(text);
          });
        } else {
          toast.success("Login avvenuto con successo", {
            duration: 1500,
          });

          return response.json(); // Moved inside the else block
        }
      })
      .then((data) => {
        console.log(data);
        localStorage.setItem("userToken", data.auth.jwt);

        setTimeout(() => {
          setVisible(false);
          navigate("/auto");
          window.location.reload();
        }, 1000);
      })
      .catch((error) => {
        const errorString = error.message.replace("Error: ", "");
        const errorObject = JSON.parse(errorString);
        toast.error(errorObject.message, {
          duration: 1500,
        });
      });
  };

  return (
    <div className="login-card flex z-20 flex-col justify-start items-start w-full max-w-sm md:w-[40vw] p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:px-8 md:py-4 ">
      {/* <Toaster /> */}
      <div className="w-full flex justify-end items-center py-2">
        <X className="cursor-pointer" onClick={() => setVisible(false)} />
      </div>
      <form className="space-y-6 md:w-full" onSubmit={handleLoginSubmit}>
        <h5 className="text-xl font-medium text-gray-900 dark:text-white">
          Accedi a Autonoleggio.itis
        </h5>
        <div>
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            pattern="^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5"
            placeholder="name@company.com"
            required
          />
        </div>
        <div>
          <label
            htmlFor="password"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Password
          </label>
          <input
            type="password"
            name="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5"
            required
          />
        </div>
        <div className="flex items-center justify-start w-full">
          <a href="#" className="text-sm text-[#FF690F] hover:underline">
            Password dimenticata?
          </a>
        </div>
        <button
          type="submit"
          className="w-full text-white bg-[#FF690F] hover:bg-[#d55508] focus:ring-4 focus:outline-none focus:ring-orange-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
        >
          Accedi
        </button>
        <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
          Non sei registrato?{" "}
          <a
            href="#"
            onClick={() => viewRegister()}
            className="text-[#FF690F] hover:underline"
          >
            Crea un account
          </a>
        </div>
      </form>
    </div>
  );
}

export default Login;
