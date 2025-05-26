import React, { useState } from "react";

const Navbar = () => {
  const [productMenuOpen, setProductMenuOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md z-50 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <h2 className="text-3xl  text-blue-800  sm:text-3xl">BlueCart</h2>


          <div className="hidden md:flex space-x-8 items-center">
            <a
              href="#"
              className=" hover:text-gray-500 font-medium"
            >
              Home
            </a>

            <div className="relative">
              <button
                onClick={() => setProductMenuOpen(!productMenuOpen)}
                className=" hover:text-gray-500 font-medium focus:outline-none"
              >
                Products ▾
              </button>
              {productMenuOpen && (
                <div className="absolute left-0 mt-2 w-48 bg-white shadow-lg rounded-lg py-2 z-50">
                  {["Nuts", "Spices", "Beans", "Grains", "Food Oils"].map(
                    (item) => (
                      <a
                        key={item}
                        href="#"
                        className="block px-4 py-2 text-gray-600 hover:bg-indigo-50  hover:text-gray-500"
                      >
                        {item}
                      </a>
                    )
                  )}
                </div>
              )}
            </div>

            <a
              href="#"
              className="  hover:text-gray-500 font-medium"
            >
              About
            </a>
            <a
              href="#"
              className=" hover:text-gray-500 font-medium"
            >
              Contact
            </a>
          </div>

          <div className="md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-gray-700 focus:outline-none"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {mobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden px-4 py-3 space-y-2 bg-white shadow-md">
          <a
            href="#"
            className="block text-gray-700  hover:text-gray-500 font-medium"
          >
            Home
          </a>
          <button
            onClick={() => setProductMenuOpen(!productMenuOpen)}
            className="w-full text-left text-gray-700 hover:text-gray-500 font-medium focus:outline-none"
          >
            Products ▾
          </button>
          {productMenuOpen && (
            <div className="ml-4 space-y-1">
              {[
                "Nuts",
                "Groceries",
                "Spices",
                "Beans",
                "Grains",
                "Food Oils",
              ].map((item) => (
                <a
                  key={item}
                  href="#"
                  className="block text-gray-700  hover:text-gray-500"
                >
                  {item}
                </a>
              ))}
            </div>
          )}
          <a
            href="#"
            className="block text-gray-700  hover:text-gray-500 font-medium"
          >
            About
          </a>
          <a
            href="#"
            className="block text-gray-700 hover:text-gray-500 font-medium"
          >
            Contact
          </a>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
