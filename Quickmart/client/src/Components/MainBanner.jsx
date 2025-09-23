import React from "react";
import { Link } from "react-router-dom";

const MainBanner = () => {
  return (
    <section
      className="relative rounded-3xl overflow-hidden shadow-2xl mt-6"
      aria-label="Main promotional banner"
    >
      {/* Background with gradient overlay */}
      <div className="relative h-[500px] md:h-[600px] gradient-bg">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/30 via-purple-900/40 to-indigo-900/30"></div>

        {/* Floating shapes */}
        <div className="absolute top-12 left-12 w-24 h-24 bg-white/10 rounded-full blur-2xl"></div>
        <div className="absolute bottom-16 right-16 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
        <div className="absolute top-1/2 left-1/3 w-20 h-20 bg-white/5 rounded-full blur-xl"></div>
      </div>

      {/* Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center px-6 md:px-12 lg:px-20 text-center">
        <div className="max-w-4xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-5 py-2 bg-white/20 backdrop-blur-md rounded-full text-white text-sm font-medium mb-8 border border-white/30 shadow-lg">
            <span className="w-2.5 h-2.5 bg-green-400 rounded-full animate-pulse"></span>
            Fresh groceries delivered in 30 minutes
          </div>

          {/* Heading */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-white mb-6 leading-tight tracking-tight">
            <span className="block">Freshness You</span>
            <span className="block bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
              Can Trust
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg md:text-xl text-white/90 mb-10 max-w-2xl mx-auto leading-relaxed">
            Discover premium quality groceries at unbeatable prices. Fast
            delivery, fresh products, and exceptional service.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
            <Link
              to="/products"
              className="group flex items-center gap-3 px-8 py-4 bg-white hover:bg-gray-100 transition-all duration-300 rounded-xl text-gray-900 font-semibold shadow-lg hover:shadow-xl text-lg min-w-[200px] justify-center transform hover:-translate-y-1"
              aria-label="Shop now"
            >
              <span>Shop Now</span>
              <svg
                className="w-5 h-5 transition-transform group-hover:translate-x-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </Link>

            <Link
              to="/products"
              className="group flex items-center gap-3 px-8 py-4 bg-transparent hover:bg-white/10 transition-all duration-300 rounded-xl text-white font-semibold border-2 border-white/30 hover:border-white/50 text-lg min-w-[200px] justify-center backdrop-blur-md transform hover:-translate-y-1"
              aria-label="Explore deals"
            >
              <span>Explore Deals</span>
              <svg
                className="w-5 h-5 transition-transform group-hover:translate-x-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </Link>
          </div>

          {/* Trust indicators */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-14 max-w-3xl mx-auto">
            {[
              { label: "Quality Guaranteed", icon: "M10 18a8 8 0 100-16 8 8 0 000 16z" },
              { label: "Fast Delivery", icon: "M3 3h14l-1 9H4L3 3zm5 12a2 2 0 104 0H8z" },
              { label: "Best Prices", icon: "M5 6h10v2H5V6zm0 4h10v2H5v-2zm0 4h6v2H5v-2z" },
            ].map((item, idx) => (
              <div
                key={idx}
                className="flex flex-col items-center bg-white/10 backdrop-blur-lg rounded-xl p-4 border border-white/20 shadow-md hover:shadow-lg transition"
              >
                <svg
                  className="w-8 h-8 mb-2 text-yellow-300"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d={item.icon} />
                </svg>
                <span className="text-sm font-medium text-white/90">
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default MainBanner;
