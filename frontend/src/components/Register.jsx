import React from "react";
import { X } from "lucide-react";

function Register({ viewLogin, setVisible }) {
  return (
    <div className="authCard flex z-20 flex-col justify-start items-start  md:w-[40vw] p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:px-8 md:py-4 ">
      <div className="w-full flex justify-end items-center py-2">
        <X className="cursor-pointer" onClick={() => setVisible(false)} />
      </div>
      <form className="space-y-6 w-full" action="#">
        <h5 className="text-xl font-medium text-gray-900 dark:text-white">
          Registrati a Autonoleggio.itis
        </h5>
        <div>
          <label
            htmlFor="nome"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Nome
          </label>
          <input
            type="text"
            name="nome"
            id="nome"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5 "
            placeholder="Mario"
            required
          />
        </div>
        <div>
          <label
            htmlFor="cognome"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Cognome
          </label>
          <input
            type="text"
            name="cognome"
            id="cognome"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5 "
            placeholder="Rossi"
            required
          />
        </div>
        <div>
          <label
            htmlFor="telefono"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Numero di telefono
          </label>
          <input
            type="text"
            name="telefono"
            id="telefono"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5 "
            placeholder="33333333333"
            required
          />
        </div>
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
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5 "
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
            placeholder="••••••••"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5  "
            required
          />
        </div>
        <div>
          <label
            htmlFor="dataDiNascita"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Data di nascita
          </label>
          <input
            type="date"
            name="dataDiNascita"
            id="dataDiNascita"
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
        <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
          sei già registrato?{" "}
          <a
            href="#"
            onClick={() => viewLogin()}
            className="text-[#FF690F] hover:underline "
          >
            Accedi
          </a>
        </div>
      </form>
    </div>
  );
}

export default Register;
