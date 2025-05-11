import React from "react";
import Shopcategori from "./Shopcategori.json";

const Shopcategories = () => {
  return (
    <section className="py-12 px-4 md:px-8 bg-white">
    <h2 className="text-2xl md:text-3xl font-bold text-center mb-10 text-gray-800">
      Shop by Categories
    </h2>
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6 justify-items-center">
      {Shopcategori.map((Shopcategori, index) => (
        <div
          key={index}
          className="flex flex-col items-center text-center transition transform hover:scale-105 cursor-pointer"
        >
          <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-full overflow-hidden shadow-md mb-2 border-2 border-gray-100">
            <img
              src={Shopcategori.img}
              alt={Shopcategori.title}
              className="object-cover w-full h-full"
            />
          </div>
          <p className="text-sm font-medium text-gray-700">{Shopcategori.title}</p>
        </div>
      ))}
    </div>
  </section>
  );
};

export default Shopcategories;