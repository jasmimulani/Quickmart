import React, { useEffect, useState } from "react";
import { assets } from "../assets/assets";
import { useAppContext } from "../Context/AppContext";
import toast from "react-hot-toast";

const Cart = () => {
  const {
    products,
    currency,
    removeFromeCart,
    cartItems,
    getCartCount,
    updateCartItem,
    navigate,
    getCartAmount,
    axios,
    user,
    SetCartItems,
  } = useAppContext();

  const [cartArray, setCartArray] = useState([]);
  const [addresses, setAddress] = useState([]);
  const [showAddress, setShowAddress] = useState(false);
  const [selectAddress, setSelectAdress] = useState(null);
  const [paymentOption, setPaymentOption] = useState("COD");

  const getCart = () => {
    let tempArray = [];
    for (const key in cartItems) {
      const product = products.find((item) => item._id === key);
      // guard: product may be undefined if products not loaded yet
      if (!product) continue;
      // do not mutate original product object from products state
      const productCopy = { ...product, quantity: cartItems[key] };
      tempArray.push(productCopy);
    }
    setCartArray(tempArray);
  };

  const getUserAddress = async () => {
    try {
      const { data } = await axios.get("/api/address/get");
      if (data.success) {
        setAddress(data.address);
        if (data.address.length > 0) {
          setSelectAdress(data.address[0]);
        }
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const PlaceOrder = async () => {
    try {
      if (!selectAddress) {
        return toast.error("please select addres");
      }

      //    with cod
      if (paymentOption === "COD") {
        const { data } = await axios.post("/api/order/cod", {
          userId: user._id,
          items: cartArray.map((item) => ({
            product: item._id,
            quantity: item.quantity,
          })),
          address: selectAddress._id,
        });

        if (data.success) {
          toast.success(data.message);
          SetCartItems({});
          navigate("/my-orders");
        } else {
          toast.error(data.message);
        }
      }else{
        //  plce order with stripe

        const { data } = await axios.post("/api/order/stripe", {
          userId: user._id,
          items: cartArray.map((item) => ({
            product: item._id,
            quantity: item.quantity,
          })),
          address: selectAddress._id,
        });

        if (data.success) {
                    SetCartItems({});
          window.location.replace(data.url)
        } else {
          toast.error(data.message);
        }
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (products.length > 0 && cartItems) {
      getCart();
    }
  }, [products, cartItems]);

  useEffect(() => {
    if (user) {
      getUserAddress();
    }
  }, [user]);

  return products.length > 0 && cartItems ? (
    <div className="flex flex-col md:flex-row mt-16">
      <div className="flex-1 max-w-4xl">
        <h1 className="text-3xl font-medium mb-6">
          Shopping Cart{" "}
          <span className="text-sm text-primary">{getCartCount()} Items</span>
        </h1>

        <div className="grid grid-cols-[2fr_1fr_1fr] text-gray-500 text-base font-medium pb-3">
          <p className="text-left">Product Details</p>
          <p className="text-center">Subtotal</p>
          <p className="text-center">Action</p>
        </div>

        {cartArray.map((product) => (
          <div
            key={product._id}
            className="grid grid-cols-[2fr_1fr_1fr] text-gray-500 items-center text-sm md:text-base font-medium pt-3"
          >
            <div className="flex items-center md:gap-6 gap-3">
              <div
                onClick={() => {
                  navigate(
                    `/products/${product.category.toLowerCase()}/${product._id}`
                  );
                  scrollTo(0, 0);
                }}
                className="cursor-pointer w-24 h-24 flex items-center justify-center border border-gray-300 rounded"
              >
                <img
                  className="max-w-full h-full object-cover"
                  src={product.image[0]}
                  alt={product.name}
                />
              </div>
              <div>
                <p className="hidden md:block font-semibold">{product.name}</p>
                <div className="font-normal text-gray-500/70 mt-2">
                  <div className="flex items-center gap-3 mt-2">
                    <p className="text-xs text-gray-500 uppercase">Qty:</p>
                    <div className="flex items-center justify-center gap-2 w-20 h-8 bg-gray-100 rounded-lg border border-gray-200">
                      <button
                        onClick={() => {
                          const newQty = cartItems[product._id] - 1;
                          if (newQty > 0) {
                            updateCartItem(product._id, newQty);
                          } else {
                            removeFromeCart(product._id);
                          }
                        }}
                        className="cursor-pointer font-bold text-primary hover:text-primary-dull transition px-2 h-full flex items-center"
                      >
                        −
                      </button>
                      <span className="w-6 text-center font-semibold text-gray-700">
                        {cartItems[product._id]}
                      </span>
                      <button
                        onClick={() => updateCartItem(product._id, cartItems[product._id] + 1)}
                        className="cursor-pointer font-bold text-primary hover:text-primary-dull transition px-2 h-full flex items-center"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <p className="text-center">
              {currency}
              {product.offerprice * product.quantity}
            </p>
            <button
              onClick={() => removeFromeCart(product._id)}
              className="cursor-pointer mx-auto"
            >
              <img
                src={assets.remove_icon}
                alt="remove"
                className=" inline-block w-6 h-6"
              />
            </button>
          </div>
        ))}

        <button
          onClick={() => {
            navigate("/products");
            scrollTo(0, 0);
          }}
          className="group cursor-pointer flex items-center mt-8 gap-2 text-primary font-medium"
        >
          <img
            className="group-hover:translate-x-1 transition"
            src={assets.arrow_right_icon_colored}
            alt="arrow"
          />
          Continue Shopping
        </button>
      </div>

      <div className="max-w-[360px] w-full bg-gray-100/40 p-5 max-md:mt-16 border border-gray-300/70">
        <h2 className="text-xl md:text-xl font-medium">Order Summary</h2>
        <hr className="border-gray-300 my-5" />

        <div className="mb-6">
          <p className="text-sm font-medium uppercase">Delivery Address</p>
          <div className="relative flex justify-between items-start mt-2">
            <p className="text-gray-500">
              {selectAddress
                ? `${selectAddress.street || ""}, ${
                    selectAddress.city || ""
                  }, ${selectAddress.state || ""}, ${
                    selectAddress.country || ""
                  }`
                : "No address found"}
            </p>
            <button
              onClick={() => setShowAddress(!showAddress)}
              className="text-primary hover:underline cursor-pointer"
            >
             Add-Address
            </button>
            {showAddress && (
              <div className="absolute top-12 py-1 bg-white border border-gray-300 text-sm w-full">
                {addresses.map((address, index) => (
                  <p
                    key={address.id || index}
                    onClick={() => {
                      setSelectAdress(address);
                      setShowAddress(false);
                    }}
                    className="text-gray-500 p-2 hover:bg-gray-100"
                  >
                    {address.street},{address.city},{address.state},
                    {address.country}
                  </p>
                ))}

                <p
                  onClick={() => navigate("/add-address")}
                  className="text-peimary text-center cursor-pointer p-2 hover:bg-indigo-500/10"
                >
                  Add address
                </p>
              </div>
            )}
          </div>

          <p className="text-sm font-medium uppercase mt-6">Payment Method</p>

          <select
            onChange={(e) => setPaymentOption(e.target.value)}
            className="w-full border border-gray-300 bg-white px-3 py-2 mt-2 outline-none"
          >
            <option value="COD">Cash On Delivery</option>
            <option value="Online">Online Payment</option>
          </select>
        </div>

        <hr className="border-gray-300" />

        <div className="text-gray-500 mt-4 space-y-2">
          <p className="flex justify-between">
            <span>Price</span>
            <span>
              {currency}
              {getCartAmount()}
            </span>
          </p>
          <p className="flex justify-between">
            <span>Shipping Fee</span>
            <span className="text-green-600">Free</span>
          </p>
         {/* <p className="flex justify-between">
  <span>Tax (2%)</span>
  <span>
    {currency}
    {getCartAmount() + (getCartAmount() * 2) / 100}
  </span>
</p> */}
<p className="flex justify-between text-lg font-medium mt-3">
  <span>Total Amount:</span>
  <span>
    {currency}
    {getCartAmount()}
  </span>
</p>

        </div>

        <button
          onClick={PlaceOrder}
          className="w-full py-3 mt-6 cursor-pointer bg-primary text-white font-medium hover:bg-primary-dull transition"
        >
          {paymentOption === "COD" ? "Place Order" : "Proceed to Checkout"}
        </button>
      </div>
    </div>
  ) : null;
};

export default Cart;
