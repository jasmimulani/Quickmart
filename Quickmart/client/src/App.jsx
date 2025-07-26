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
import ProductCatrgory from './Pages/ProductCatrgory'
import ProductDetails from './Pages/ProductDetails'
import Cart from './Pages/Cart'
import AddAddress from './Pages/AddAddress'
import MyOrder from './Pages/MyOrder'
import SellerLogin from './Pages/Seller/SellerLogin'
import SellerLayout from './Pages/Seller/SellerLayout'
import AddProduct from './Pages/Seller/AddProduct'
import ProductList from './Pages/Seller/ProductList'
import Orders from './Pages/Seller/Orders'

const App = () => {

    const  isSellerpath = useLocation().pathname.includes("seller")
    const {showUserLogin , isSeller} = useAppContext()

  return (
    <div className='text-default min-h-screen text-gray-700 bg-white'>

      {isSellerpath ? null : <Navbar/>}
      {showUserLogin ? <Login/> : null}

        <Toaster />

      <div className={` ${isSellerpath ? "" : " px-6 md:px-16 lg:px-24 xl:px-32"} `}>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/products' element={<AllProduct/>}/>
          <Route path='/products/:category' element={<ProductCatrgory/>}/>
          <Route path='/products/:category/:id' element={<ProductDetails/>}/>
          <Route path='/cart' element={<Cart/>}/>
          <Route path='/add-address' element={<AddAddress/>}/>
          <Route path='/my-orders' element={<MyOrder/>}/>
          <Route path ='/seller' element={isSeller ? <SellerLayout/> : <SellerLogin/>}>
             <Route index element={isSeller ? <AddProduct/> :  null}/>
             <Route path= 'product-list' element={<ProductList/>}/>
             <Route path= 'orders' element={<Orders/>}/>
          </Route>
        </Routes>
      </div>
     { ! isSellerpath && <Fotter/>} 
    </div>
  )
}

export default App
