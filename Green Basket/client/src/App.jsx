import React from 'react'
import Navbar from './Components/Navbar'
import Home from './Pages/Home'
import { Route, Routes, useLocation } from 'react-router-dom'
import {Toaster} from 'react-hot-toast'
import Fotter from './Components/Fotter'
import { useContext } from 'react'
import Login from './Components/Login'
import { useAppContext } from './Context/AppContext'
import AllProduct from './Pages/AllProduct'
const App = () => {

    const  isSellerpath = useLocation().pathname.includes("seller")
    const {showUserLogin} = useAppContext()

  return (
    <div>

      {isSellerpath ? null : <Navbar/>}
      {showUserLogin ? <Login/> : null}

        <Toaster />

      <div className={` ${isSellerpath ? "" : " px-6 md:px-16 lg:px-24 xl:px-32"} `}>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/products' element={<AllProduct/>}/>
        </Routes>
      </div>
     { ! isSellerpath && <Fotter/>} 
    </div>
  )
}

export default App
