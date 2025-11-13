import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";

axios.defaults.withCredentials = true;
axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL;

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const currency = import.meta.env.VITE_CURRENCY;

  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [isSeller, setIsSeller] = useState(false);
  const [sellerProfile, setSellerProfile] = useState(null);
  const [showUserLogin, SetShowUserLogin] = useState(false);
  const [products, SetProducts] = useState([]);

  const [cartItems, SetCartItems] = useState({});
  // store an item id attempted to add when user is not logged in
  const [pendingAdd, setPendingAdd] = useState(null);
  const [searchQuery, SetSearchQuery] = useState({});

  //  fetch seller satus
  const fetchSeller = async () => {
    try {
      const { data } = await axios.get("/api/seller/is-auth");
      if (data.success) {
        setIsSeller(true);
        setSellerProfile(data.profile || null);
      } else {
        setIsSeller(false);
        setSellerProfile(null);
      }
    } catch (error) {
      setIsSeller(false);
      setSellerProfile(null);
    }
  };

  //  fetch user auth status , user data and cart item

  const fetchUser = async () => {
    try {
      const { data } = await axios.get("/api/user/is-auth");
      if (data.success) setUser(data.user);
      SetCartItems(data.user.cartItems);
    } catch (error) {
      setUser(null);
    }
  };

  // fetch product

  const fetchProducts = async () => {
    try {
      const { data } = await axios.get("/api/product/list");

      if (data.success) {
        SetProducts(data.products);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  // add product in cart

  const addToCart = (itemId) => {
    // require authentication to add to cart
    if (!user) {
      // open login modal and remember pending add
      setPendingAdd(itemId);
      SetShowUserLogin(true);
      toast.error("Please login or register to add items to cart.");
      return;
    }

    let cartData = structuredClone(cartItems);

    if (cartData[itemId]) {
      cartData[itemId] += 1;
    } else {
      cartData[itemId] = 1;
    }
    SetCartItems(cartData);
    toast.success("Added To Cart.");
  };

  // if user logs in and there was a pending add, perform it automatically
  useEffect(() => {
    if (user && pendingAdd) {
      const itemId = pendingAdd;
      setPendingAdd(null);
      let cartData = structuredClone(cartItems || {});
      if (cartData[itemId]) {
        cartData[itemId] += 1;
      } else {
        cartData[itemId] = 1;
      }
      SetCartItems(cartData);
      toast.success("Added To Cart.");
    }
  }, [user]);

  // update cart item
  const updateCartItem = (itemId, quantity) => {
    let cartData = structuredClone(cartItems);
    cartData[itemId] = quantity;
    SetCartItems(cartData);
    toast.success("Cart updated");
  };

  // remove product into cart

  const removeFromeCart = (itemId) => {
    let cartData = structuredClone(cartItems);
    if (cartData[itemId]) {
      cartData[itemId] -= 1;
      if (cartData[itemId] === 0) {
        delete cartData[itemId];
      }
    }
    toast.success("Remove from Cart.");
    SetCartItems(cartData);
  };

  //  get cart item

  const getCartCount = () => {
    // Return number of distinct product IDs in cartItems (not sum of quantities)
    if (!cartItems) return 0;
    return Object.keys(cartItems).length;
  };

  //   get cart total

  const getCartAmount = () => {
    let total = 0;
    for (let id in cartItems) {
      const product = products.find((p) => p._id === id);
      if (product) {
        total += product.offerprice * cartItems[id];
      }
    }
    // console.log("cartItems", cartItems);
    return total;
  };

  useEffect(() => {
    fetchUser();
    fetchSeller();
    fetchProducts();
  }, []);

  //  update databse cart items

  useEffect(() => {
    const updateCart = async () => {
      try {
        const { data } = await axios.post("/api/cart/update", { cartItems });
        if (!data.success) {
          toast.error(data.message);
        }
      } catch (error) {
        toast.error(error.message);
      }
    };
    if (user) {
      updateCart();
    }
  }, [cartItems]);

  const value = {
    navigate,
    user,
    setUser,
    setIsSeller,
    isSeller,
    sellerProfile,
    setSellerProfile,
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
    getCartCount,
    axios,
    fetchProducts,
    SetCartItems,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
  return useContext(AppContext);
};
