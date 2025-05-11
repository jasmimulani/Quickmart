import React from "react";
import Shopcategori from "./Shopcategori.json";

const Shopcategories = () => {
  return (
    <div className="w-full">
      <div className="mb-6">
        <h2 className="text-3xl font-extrabold text-gray-900 text-center sm:text-4xl">
          Shop by Categories
        </h2>
      </div>
      <section className="bg-white">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 p-6">
          {Shopcategori.map((item, index) => (
            <div key={index} className="flex flex-col items-center">
              <div className="overflow-hidden rounded-md shadow-md hover:shadow-lg transition-shadow duration-300">
                <img
                  src={item.img}
                  alt={item.title}
                  className="w-full h-auto object-cover transform transition-transform duration-500 hover:scale-105"
                />
              </div>
              <div className="mt-3">
                <p
                  className="text-xl font-serif text-center  transition-colors duration-300"
                  style={{ fontFamily: "EB Garamond" }}
                >
                  {item.title}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Shopcategories;