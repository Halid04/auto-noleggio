import React from "react";
import { MapPin } from "lucide-react";

function CardAuto({ marca }) {
  return (
    <div className=" w-64 cursor-pointer bg-white border border-gray-200 rounded-lg shadow hover:scale-[.95] transition-transform duration-300 ease-in-out">
      <img
        className="carpic"
        src="https://assets.volkswagen.com/is/image/volkswagenag/NuovaPolo-1920x1080-Promo?Zml0PWNyb3AsMSZmbXQ9d2VicCZxbHQ9Nzkmd2lkPTE5MjAmaGVpPTEwODAmYWxpZ249MC4wMCwwLjAwJmJmYz1vZmYmM2E1Nw=="
        alt="auto"
        loading="lazy"
      />
      <div className="px-2 py-5 flex flex-col justify-start items-start gap-2">
        <a href="#" className="infoCar flex items-baseline gap-1">
          <h5 className="whitespace-nowrap text-xl font-bold tracking-tight text-gray-900 dark:text-white">
            {marca}
          </h5>
          <p className="whitespace-nowrap text-sm font-normal text-gray-700 dark:text-gray-400">
            - 1.0 TSI Edition
          </p>
        </a>
        <p className="text-sm font-normal text-gray-700 dark:text-gray-400">
          05/10/2015 | Deisel | 80.000 km
        </p>
        <div className="tags flex gap-1 mb-2">
          <span className=" inline-flex items-center px-3 h-7 text-sm font-normal text-center text-white bg-[#FF690F] rounded-lg hover:bg-[#d55508] ">
            Family
          </span>
          <span className="inline-flex items-center px-3 h-7 text-sm font-normal text-center text-white bg-[#FF690F] rounded-lg hover:bg-[#d55508] ">
            Spaziosa
          </span>
          <span className="inline-flex items-center px-3 h-7 text-sm font-normal text-center text-white bg-[#FF690F] rounded-lg hover:bg-[#d55508] ">
            Blu
          </span>
        </div>
        <div className="oneline">
          <MapPin />{" "}
          <p className=" font-normal text-gray-700 dark:text-gray-400">
            {" "}
            Brescia, Via BLa bla
          </p>
        </div>
      </div>
    </div>
  );
}

export default CardAuto;
