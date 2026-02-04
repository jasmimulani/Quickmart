import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { assets } from "../assets/assets";
import { useAppContext } from "../Context/AppContext";
import toast from "react-hot-toast";

const Navbar = () => {
  const [open, setOpen] = React.useState(false);
  const {
    user,
    setUser,
    SetShowUserLogin,
    navigate,
    searchQuery,
    SetSearchQuery,
    getCartCount,
    axios
  } = useAppContext();

  const logout = async () => {
    try {
      const { data } = await axios.get('/api/user/logout')
      if(data.success){
        toast.success(data.message)
        setUser(null);
        navigate("/");
      }else{
        toast.error(data.message)
      }
    } catch (error) {
         toast.error(error.message)
    }
  };

  useEffect(() => {
    if (searchQuery.length > 0) {
      navigate("/products");
    }
  }, [searchQuery]);

  return (
    <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <NavLink to="/" onClick={() => setOpen(false)} className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">Q</span>
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Quickmart
            </span>
          </NavLink>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <NavLink 
              to="/" 
              className={({isActive}) => `font-medium transition-colors duration-200 ${isActive ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600'}`}
            >
              Home
            </NavLink>
            <NavLink 
              to="/products" 
              className={({isActive}) => `font-medium transition-colors duration-200 ${isActive ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600'}`}
            >
              Products
            </NavLink>
            <NavLink 
              to="/about" 
              className={({isActive}) => `font-medium transition-colors duration-200 ${isActive ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600'}`}
            >
              About
            </NavLink>
            <NavLink 
              to="/contact" 
              className={({isActive}) => `font-medium transition-colors duration-200 ${isActive ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600'}`}
            >
              Contact
            </NavLink>
            <NavLink 
              to="/seller" 
              className={({isActive}) => `font-medium transition-colors duration-200 ${isActive ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600'}`}
            >
              Seller
            </NavLink>

            {/* Search Bar */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <img src={assets.search_icon} alt="search" className="w-4 h-4 text-gray-400" />
              </div>
              <input
                onChange={(e) => SetSearchQuery(e.target.value)}
                className="block w-72 pl-10 pr-3 py-2 border border-gray-200 rounded-lg text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                type="text"
                placeholder="Search products..."
              />
            </div>

            {/* Cart */}
            <div
              onClick={() => navigate("/cart")}
              className="relative cursor-pointer p-2 hover:bg-gray-50 rounded-lg transition-colors duration-200"
            >
              <img
                src={assets.nav_cart_icon}
                alt="cart"
                className="w-6 h-6 text-gray-600"
              />
              {getCartCount() > 0 && (
                <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium">
                  {getCartCount()}
                </span>
              )}
            </div>

            {/* User Menu */}
            {!user ? (
              <button
                onClick={() => SetShowUserLogin(true)}
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-lg font-medium transition-all duration-200 hover:shadow-medium hover-lift"
              >
                Sign In
              </button>
            ) : (
              <div className="relative group">
                <div className="flex items-center space-x-2 cursor-pointer p-2 hover:bg-gray-50 rounded-lg transition-colors duration-200">
                  <img src={assets.profile_icon} className="w-8 h-8 rounded-full" alt="Profile" />
                  <span className="text-sm font-medium text-gray-700">{user.name}</span>
                </div>
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-strong border border-gray-100 py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                  <div
                    onClick={() => navigate("my-orders")}
                    className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 cursor-pointer transition-colors duration-200"
                  >
                    My Orders
                  </div>
                  <div
                    onClick={logout}
                    className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 cursor-pointer transition-colors duration-200"
                  >
                    Sign Out
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-4">
            <div
              onClick={() => navigate("/cart")}
              className="relative cursor-pointer p-2"
            >
              <img
                src={assets.nav_cart_icon}
                alt="cart"
                className="w-6 h-6"
              />
              {getCartCount() > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {getCartCount()}
                </span>
              )}
            </div>
            <button
              onClick={() => setOpen(!open)}
              className="p-2 rounded-lg hover:bg-gray-50 transition-colors duration-200"
            >
              <img src={assets.menu_icon} alt="menu" className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {open && (
          <div className="md:hidden border-t border-gray-100 py-4 space-y-2">
            <NavLink 
              to="/" 
              onClick={() => setOpen(false)}
              className="block px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors duration-200"
            >
              Home
            </NavLink>
            <NavLink 
              to="/products" 
              onClick={() => setOpen(false)}
              className="block px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors duration-200"
            >
              Products
            </NavLink>
            <NavLink 
              to="/about" 
              onClick={() => setOpen(false)}
              className="block px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors duration-200"
            >
              About
            </NavLink>
            <NavLink 
              to="/contact" 
              onClick={() => setOpen(false)}
              className="block px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors duration-200"
            >
              Contact
            </NavLink>
            <NavLink 
              to="/seller" 
              onClick={() => setOpen(false)}
              className="block px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors duration-200"
            >
              Seller
            </NavLink>
            {user && (
              <NavLink 
                to="my-orders" 
                onClick={() => setOpen(false)}
                className="block px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors duration-200"
              >
                My Orders
              </NavLink>
            )}
            <div className="px-4 pt-2">
              {!user ? (
                <button
                  onClick={() => {
                    setOpen(false);
                    SetShowUserLogin(true);
                  }}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-lg font-medium hover:shadow-medium transition-all duration-200"
                >
                  Sign In
                </button>
              ) : (
                <button
                  onClick={logout}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-lg font-medium hover:shadow-medium transition-all duration-200"
                >
                  Sign Out
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
