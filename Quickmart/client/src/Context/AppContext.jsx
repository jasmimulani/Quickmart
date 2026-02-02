import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";

// ======================
// DEPLOYMENT READY BACKEND URL CONFIGURATION
// ======================
const getBackendUrl = () => {
  // Check for environment variable first
  if (import.meta.env.VITE_BACKEND_URL) {
    return import.meta.env.VITE_BACKEND_URL;
  }
  
  // For production, use the same origin as frontend
  if (import.meta.env.PROD) {
    return window.location.origin;
  }
  
  // Development fallback
  return "http://localhost:5000";
};

const backendUrl = getBackendUrl();

console.log("🌐 API Base URL:", backendUrl);
console.log("🌐 Environment:", import.meta.env.MODE);

const axiosInstance = axios.create({
  baseURL: backendUrl,
  withCredentials: true,
  timeout: 10000, // Add timeout for better error handling
});

// Also align global axios defaults
axios.defaults.baseURL = backendUrl;
axios.defaults.withCredentials = true;

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const currency = import.meta.env.VITE_CURRENCY || "₹";
  const navigate = useNavigate();
  
  const [user, setUser] = useState(null);
  const [isSeller, setIsSeller] = useState(false);
  const [sellerProfile, setSellerProfile] = useState(null);
  const [showUserLogin, SetShowUserLogin] = useState(false);
  const [products, SetProducts] = useState([]);
  const [cartItems, SetCartItems] = useState({});
  const [pendingAdd, setPendingAdd] = useState(null);
  const [searchQuery, SetSearchQuery] = useState({});

  // Fetch seller status
  const fetchSeller = async () => {
    try {
      const { data } = await axiosInstance.get("/api/seller/is-auth");
      if (data.success) {
        setIsSeller(true);
        setSellerProfile(data.profile || null);
      } else {
        setIsSeller(false);
        setSellerProfile(null);
      }
    } catch (error) {
      console.log("Seller not authenticated");
      setIsSeller(false);
      setSellerProfile(null);
    }
  };

  // Fetch user auth status
  const fetchUser = async () => {
    try {
      const { data } = await axiosInstance.get("/api/user/is-auth");
      if (data.success) {
        setUser(data.user);
        SetCartItems(data.user.cartItems || {});
      }
    } catch (error) {
      console.log("User not authenticated");
      setUser(null);
    }
  };

  // Fetch products
  const fetchProducts = async () => {
    try {
      console.log("🔄 Fetching products...");
      const response = await axiosInstance.get("/api/product/list");
      const { data } = response;
      console.log("📦 Raw API response:", data);

      if (data && data.success && data.products) {
        console.log("✅ Products found:", data.products.length);
        SetProducts(data.products);
      } else if (data && Array.isArray(data.products)) {
        console.log("✅ Products array found:", data.products.length);
        SetProducts(data.products);
      } else if (Array.isArray(data)) {
        console.log("✅ Direct array found:", data.length);
        SetProducts(data);
      } else {
        console.log("❌ No products found in response");
      }
    } catch (error) {
      console.error("❌ Error fetching products:", error);
      toast.error("Failed to fetch products");
    }
  };

  // Add product to cart
  const addToCart = (itemId) => {
    if (!user) {
      setPendingAdd(itemId);
      SetShowUserLogin(true);
      toast.error("Please login or register to add items to cart.");
      return;
    }

    let cartData = { ...cartItems };
    cartData[itemId] = (cartData[itemId] || 0) + 1;
    SetCartItems(cartData);
    toast.success("Added To Cart.");
  };

  // Auto-add pending item after login
  useEffect(() => {
    if (user && pendingAdd) {
      const itemId = pendingAdd;
      setPendingAdd(null);
      let cartData = { ...cartItems };
      cartData[itemId] = (cartData[itemId] || 0) + 1;
      SetCartItems(cartItems);
      toast.success("Added To Cart.");
    }
  }, [user]);

  // Update cart item quantity
  const updateCartItem = (itemId, quantity) => {
    let cartData = { ...cartItems };
    cartData[itemId] = quantity;
    SetCartItems(cartData);
    toast.success("Cart updated");
  };

  // Remove product from cart
  const removeFromCart = (itemId) => {
    let cartData = { ...cartItems };
    if (cartData[itemId]) {
      cartData[itemId] -= 1;
      if (cartData[itemId] === 0) {
        delete cartData[itemId];
      }
    }
    toast.success("Removed from Cart.");
    SetCartItems(cartData);
  };

  // Get cart item count
  const getCartCount = () => {
    if (!cartItems) return 0;
    return Object.keys(cartItems).length;
  };

  // Get cart total amount
  const getCartAmount = () => {
    let total = 0;
    for (let id in cartItems) {
      const product = products.find((p) => p._id === id);
      if (product) {
        total += product.offerprice * cartItems[id];
      }
    }
    return total;
  };

  // Initial data fetching
  useEffect(() => {
    fetchUser();
    fetchSeller();
    fetchProducts();
  }, []);

  // Update database cart items
  useEffect(() => {
    const updateCart = async () => {
      try {
        const { data } = await axiosInstance.post("/api/cart/update", { cartItems });
        if (!data.success) {
          toast.error(data.message);
        }
      } catch (error) {
        console.error("Error updating cart:", error);
      }
    };
    
    if (user && Object.keys(cartItems).length > 0) {
      updateCart();
    }
  }, [cartItems, user]);

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
    removeFromCart,
    cartItems,
    searchQuery,
    SetSearchQuery,
    getCartAmount,
    getCartCount,
    axios: axiosInstance,
    fetchProducts,
    SetCartItems,
    fetchUser,
    fetchSeller,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
  return useContext(AppContext);
};