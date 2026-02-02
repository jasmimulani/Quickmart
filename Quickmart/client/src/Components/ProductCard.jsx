import React from "react";
import { assets } from "../assets/assets";
import { useAppContext } from "../Context/AppContext";

const ProductCard = ({ product }) => {
  const [count, setCount] = React.useState(0);
  const { currency, addToCart, removeFromCart, cartItems, navigate } =
    useAppContext();

  return (
    product && (
      <div
        onClick={() => {
          navigate(
            `/products/${product.category.toLowerCase()}/${product._id}`
          );
          scrollTo(0, 0);
        }}
        className="group bg-white rounded-2xl border border-gray-100 shadow-soft hover:shadow-medium hover:-translate-y-0.5 cursor-pointer overflow-hidden transition-all duration-300"
      >
        {/* Product Image */}
        <div className="relative h-48 bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-6">
          <img
            className="group-hover:scale-105 transition-transform duration-300 max-h-32 w-auto object-contain"
            src={product.image[0]}
            alt={product.name}
          />

          {/* Category Badge */}
          <div className="absolute top-3 left-3">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700 ring-1 ring-blue-200">
              {product.category}
            </span>
          </div>

          {/* Discount Badge */}
          {product.price > product.offerprice && (
            <div className="absolute top-3 right-3">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-50 text-red-700 ring-1 ring-red-200">
                {Math.round(
                  ((product.price - product.offerprice) / product.price) * 100
                )}
                % OFF
              </span>
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="p-4">
          {/* Product Name */}
          <h3 className="font-semibold text-gray-900 text-lg mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors duration-200">
            {product.name}
          </h3>

          {/* Rating */}
          <div className="flex items-center gap-1 mb-3">
            <div className="flex items-center">
              {Array(5)
                .fill("")
                .map((_, i) => (
                  <svg
                    key={i}
                    className={`w-4 h-4 ${
                      i < 4 ? "text-yellow-400" : "text-gray-300"
                    }`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
            </div>
            <span className="text-sm text-gray-500 ml-1">(4.0)</span>
          </div>

          {/* Price */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <span className="text-xl font-bold text-gray-900">
                {currency}
                {product.offerprice}
              </span>
              {product.price > product.offerprice && (
                <span className="text-sm text-gray-500 line-through">
                  {currency}
                  {product.price}
                </span>
              )}
            </div>
          </div>

          {/* Add to Cart Button */}
          <div className="w-full">
            {!cartItems[product._id] ? (
              <button
                className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-3 px-4 rounded-xl font-medium transition-all duration-200 hover:shadow-medium hover:-translate-y-0.5"
                onClick={(e) => {
                  e.stopPropagation();
                  addToCart(product._id);
                }}
              >
                {/* <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6m8 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01" />
                            </svg> */}
                <img
                  src={assets.nav_cart_icon}
                  alt="cart"
                  className="w-6 h-6 text-gray-600"
                />
                Add to Cart
              </button>
            ) : (
              <div className="flex items-center justify-between bg-gray-50 rounded-xl p-2">
                <button
                  className="w-10 h-10 flex items-center justify-center bg-white rounded-lg shadow-soft hover:shadow-medium transition-all duration-200 text-gray-600 hover:text-gray-900"
                  onClick={(e) => {
                    e.stopPropagation();
                    removeFromCart(product._id);
                  }}
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M20 12H4"
                    />
                  </svg>
                </button>
                <span className="font-semibold text-gray-900 min-w-[40px] text-center">
                  {cartItems[product._id]}
                </span>
                <button
                  className="w-10 h-10 flex items-center justify-center bg-white rounded-lg shadow-soft hover:shadow-medium transition-all duration-200 text-gray-600 hover:text-gray-900"
                  onClick={(e) => {
                    e.stopPropagation();
                    addToCart(product._id);
                  }}
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 4v16m8-8H4"
                    />
                  </svg>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    )
  );
};

export default ProductCard;
