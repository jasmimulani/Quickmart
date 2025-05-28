import React from 'react'
import Navbar from './Components/Navbar'
import Home from './Pages/Home'
import { Route, Routes, useLocation } from 'react-router-dom'
import {Toaster} from 'react-hot-toast'
import Fotter from './Components/Fotter'
const App = () => {

    const  isSellerpath = useLocation().pathname.includes("seller")

  return (
    <div>

      {isSellerpath ? null : <Navbar/>}

        <Toaster />

      <div className={` ${isSellerpath ? "" : " px-6 md:px-16 lg:px-24 xl:px-32"} `}>
        <Routes>
          <Route path='/' element={<Home/>}/>
        </Routes>
      </div>
     { ! isSellerpath && <Fotter/>} 
    </div>
  )
}

export default App
