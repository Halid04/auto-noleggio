import React from "react";
import { MapPin } from "lucide-react";

function CardAuto() {
  return (
    <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <a href="#">
        <img
          className="rounded-t-lg"
          src="/docs/images/blog/image-1.jpg"
          alt=""
        />
      </a>
      <img
        class="carpic"
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSN2y62HUIzYHAWWREFbGfp60vPAKxXcndZqJ09vPCO3w&s"
        alt="auto"
      />
      <div class="p-5">
        <a href="#" class="oneline">
          <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            Nome Macchina
          </h5>
          <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">
            - Modello
          </p>
        </a>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
          data acquisto | carburante | km
        </p>
        <div className="tags">
          <a
            href="#"
            className="card-auto-anchor inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-orange-700 rounded-lg hover:bg-orange-800 focus:ring-4 focus:outline-none focus:ring-orange-300 dark:bg-orange-600 dark:hover:bg-orange-700 dark:focus:ring-orange-800"
          >
            tag1
          </a>
          <a
            href="#"
            className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-orange-700 rounded-lg hover:bg-orange-800 focus:ring-4 focus:outline-none focus:ring-orange-300 dark:bg-orange-600 dark:hover:bg-orange-700 dark:focus:ring-orange-800"
          >
            tag2
          </a>
          <a
            href="#"
            className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-orange-700 rounded-lg hover:bg-orange-800 focus:ring-4 focus:outline-none focus:ring-orange-300 dark:bg-orange-600 dark:hover:bg-orange-700 dark:focus:ring-orange-800"
          >
            tag3
          </a>
        </div>
        <div class="oneline">
          <MapPin />{" "}
          <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">
            {" "}
            - location
          </p>
        </div>
      </div>
    </div>
  );
}

export default CardAuto;
