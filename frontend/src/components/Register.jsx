import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useParams, useNavigate } from "react-router-dom";
import { X } from "lucide-react";

function Register({ viewLogin, setVisible }) {
  const navigate = useNavigate();
  const [nome, setNome] = useState("");
  const [cognome, setCognome] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [telefono, setTelefono] = useState("");
  const [dataDiNascita, setDataDiNascita] = useState("");

  const calculateAge = (birthDate) => {
    const today = new Date();
    const birthDateObj = new Date(birthDate);
    let age = today.getFullYear() - birthDateObj.getFullYear();
    const monthDifference = today.getMonth() - birthDateObj.getMonth();

    if (
      monthDifference < 0 ||
      (monthDifference === 0 && today.getDate() < birthDateObj.getDate())
    ) {
      age--;
    }
    return age;
  };

  const handleRegistrationSubmit = (e) => {
    e.preventDefault();

    const age = calculateAge(dataDiNascita);
    if (age < 16) {
      toast.error("Devi avere almeno 16 anni per registrarti.", {
        duration: 1500,
      });
      return;
    }

    if (password.length < 8) {
      toast.error("La password deve contenere almeno 8 caratteri.", {
        duration: 1500,
      });
      return;
    }

    const url = "http://localhost/auto-noleggio/backend/public/register";
    const headers = {
      Accept: "application/json",
      "Content-Type": "application/json",
    };

    const requestBody = {
      nome: nome,
      cognome: cognome,
      email: email,
      password: password,
      telefono: telefono,
      data_di_nascita: dataDiNascita,
      admin: 0,
    };

    console.log("Request body:", requestBody);

    fetch(url, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(requestBody),
    })
      .then((response) => {
        if (!response.ok) {
          return response.text().then((text) => {
            throw new Error(text);
          });
        } else {
          toast.success("Registrazione avvenuta con successo", {
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
    <div className="authCard flex z-20 flex-col justify-start items-start md:w-[40vw] p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:px-8 md:py-4">
      {/* <Toaster /> */}
      <div className="w-full flex justify-end items-center py-2">
        <X className="cursor-pointer" onClick={() => setVisible(false)} />
      </div>
      <form className="space-y-6 w-full" onSubmit={handleRegistrationSubmit}>
        <h5 className="text-xl font-medium text-gray-900 ">
          Registrati a Autonoleggio.itis
        </h5>
        <div>
          <label
            htmlFor="nome"
            className="block mb-2 text-sm font-medium text-gray-900 "
          >
            Nome
          </label>
          <input
            type="text"
            name="nome"
            id="nome"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5"
            placeholder="Mario"
            required
          />
        </div>
        <div>
          <label
            htmlFor="cognome"
            className="block mb-2 text-sm font-medium text-gray-900 "
          >
            Cognome
          </label>
          <input
            type="text"
            name="cognome"
            id="cognome"
            value={cognome}
            onChange={(e) => setCognome(e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5"
            placeholder="Rossi"
            required
          />
        </div>
        <div>
          <label
            htmlFor="telefono"
            className="block mb-2 text-sm font-medium text-gray-900 "
          >
            Numero di telefono
          </label>
          <input
            type="tel"
            name="telefono"
            id="telefono"
            value={telefono}
            onChange={(e) => setTelefono(e.target.value)}
            pattern="^\+39\d{10}$"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5"
            placeholder="+391234567890"
            required
          />
        </div>
        <div>
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-gray-900 "
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
            className="block mb-2 text-sm font-medium text-gray-900 "
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
        <div>
          <label
            htmlFor="dataDiNascita"
            className="block mb-2 text-sm font-medium text-gray-900 "
          >
            Data di nascita
          </label>
          <input
            type="date"
            name="dataDiNascita"
            id="dataDiNascita"
            value={dataDiNascita}
            onChange={(e) => setDataDiNascita(e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full text-white bg-[#FF690F] hover:bg-[#d55508] focus:ring-4 focus:outline-none focus:ring-orange-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
        >
          Registrati
        </button>
        <div className="text-sm font-medium text-gray-500 ">
          sei già registrato?{" "}
          <a
            href="#"
            onClick={() => viewLogin()}
            className="text-[#FF690F] hover:underline"
          >
            Accedi
          </a>
        </div>
      </form>
    </div>
  );
}

export default Register;
