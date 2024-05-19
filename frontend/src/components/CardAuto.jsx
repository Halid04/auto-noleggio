import React from "react";
import { MapPin } from "lucide-react";

function CardAuto() {
  return (
    <div className="w-72 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <a href="#">
        <img
          className="rounded-t-lg"
          src="/docs/images/blog/image-1.jpg"
          alt=""
        />
      </a>
      <img
        class="carpic"
        src="https://assets.volkswagen.com/is/image/volkswagenag/NuovaPolo-1920x1080-Promo?Zml0PWNyb3AsMSZmbXQ9d2VicCZxbHQ9Nzkmd2lkPTE5MjAmaGVpPTEwODAmYWxpZ249MC4wMCwwLjAwJmJmYz1vZmYmM2E1Nw=="
        alt="auto"
      />
      <div class="p-5">
        <a href="#" class="infoCar">
          <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            Nuova Polo
          </h5>
          <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">
            - 1.0 TSI Edition
          </p>
        </a>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
          05/10/2015 | Deisel | 80.000 km
        </p>
        <div class="tags">
          <a
            href="#"
            className="card-auto-anchor inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-orange-700 rounded-lg hover:bg-orange-800 focus:ring-4 focus:outline-none focus:ring-orange-300 dark:bg-orange-600 dark:hover:bg-orange-700 dark:focus:ring-orange-800"
          >
            Family
          </a>
          <a
            href="#"
            className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-orange-700 rounded-lg hover:bg-orange-800 focus:ring-4 focus:outline-none focus:ring-orange-300 dark:bg-orange-600 dark:hover:bg-orange-700 dark:focus:ring-orange-800"
          >
            Spaziosa
          </a>
          <a
            href="#"
            className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-orange-700 rounded-lg hover:bg-orange-800 focus:ring-4 focus:outline-none focus:ring-orange-300 dark:bg-orange-600 dark:hover:bg-orange-700 dark:focus:ring-orange-800"
          >
            Blu
          </a>
        </div>
        <div class="oneline">
          <MapPin />{" "}
          <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">
            {" "}
            Brescia, Via BLa bla
          </p>
        </div>
      </div>
    </div>
  );
}

export default CardAuto;
