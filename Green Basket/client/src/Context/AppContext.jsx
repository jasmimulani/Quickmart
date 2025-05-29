import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { dummyProducts } from "../assets/assets";
import toast from "react-hot-toast";

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const currency = import.meta.VITE_CURRENCY;

  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [isSeller, SetISSeller] = useState(false);
  const [showUserLogin, SetShowUserLogin] = useState(false);
  const [products, SetProducts] = useState([]);

  const [cartItems, SetCartItems] = useState({});
  const [searchQuery, SetSearchQuery] = useState({});

  // fetch product

  const fetchProducts = async () => {
    SetProducts(dummyProducts);
  };

  // add product in cart

  const addToCart = (itemId) => {
    let cartData = structuredClone(cartItems);

    if (cartData[itemId]) {
      cartData[itemId] += 1;
    } else {
      cartData[itemId] = 1;
    }
    SetCartItems(cartData);
    toast.success("Added To Cart.");
  };

  // update cart item
  const updateCartItem = (itemId, quantity) => {
    let cartData = structuredClone(cartItems);
    cartData[itemId] = quantity;
    SetCartItems(cartData);
    toast.success("Cart updated.");
  };

  // remove product into cart

  const removeFromeCart = (itemId) => {
    let cartData = structuredClone(cartItems);
    if(cartData[itemId]){
      cartData[itemId] -=1;
      if(cartData[itemId] === 0 ){
        delete cartData[itemId];
      }
    }
     toast.success("Remove from Cart.")
     SetCartItems(cartData)
  };

  //  get cart item

   const getCartCount = () =>{
    let totalCount = 0;
    for(const item in cartItems){
      totalCount +=cartItems[item];
    }
    return totalCount;
   }


    //   get cart total

    const getCartAmount = ()=>{
      let totalAmount = 0;
      for(const items in cartItems){
        let itemInfo = products.find((product) => product._id === items)
        if(cartItems[items] > 0){
          totalAmount += itemInfo.offerPrice * cartItems[items]
        }
      }
      return Math.floor(totalAmount * 100) / 100;
    }







  useEffect(() => {
    fetchProducts();
  }, []);

  const value = {
    navigate,
    user,
    setUser,
    SetISSeller,
    isSeller,
    showUserLogin,
    SetShowUserLogin,
    products,
    currency,
    addToCart,
    updateCartItem,
    removeFromeCart,
    cartItems,
    searchQuery,
    SetSearchQuery,
     getCartAmount,
     getCartCount ,
   
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
  return useContext(AppContext);
};
