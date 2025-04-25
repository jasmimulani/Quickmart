import React from "react";
import Shopcategori from "./Shopcategori.json";

const Shopcategories = () => {
  return (
    <div className="w-full ">
      <div>
        <h1 className="text-4xl flex justify-start mx:justify-center m-1">
          Shop by Categories
        </h1>
      </div>
      <section className="bg-white">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-3 p-6">
          {Shopcategori.map((item, index) => (
            <div key={index} className="flex flex-col">
              <img
                src={item.img}
                alt={item.title}
                className="w-full h-auto object-cover hover:md:brightness-50"
              />
              <div className="mt-3">
                  <p className="text-2xl flex  items-center justify-center   transition-colors duration-300"  style={{ color: "#c9ab81", fontFamily: "EB Garamond" }}>
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
