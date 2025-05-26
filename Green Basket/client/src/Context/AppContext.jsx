import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {

   const navigate = useNavigate();
   const [user, setUser] = useState(true)
   const [isSeller, SetISSeller] = useState(false)
   const [showUserLogin, SetShowUserLogin] = useState(false)
   
    const value = {navigate, user , setUser ,SetISSeller ,isSeller,showUserLogin,SetShowUserLogin}
  
  return <AppContext.Provider value={value}>
    {children }
  </AppContext.Provider>
}

export const useAppContext = () =>{
   return useContext(AppContext)
}