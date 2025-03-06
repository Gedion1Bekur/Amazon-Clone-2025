import React from 'react'
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom'
import Landing from './Components/Pages/Landing/Landing'
import Auth from './Components/Pages/Auth/Auth'

import Orders from './Components/Pages/Orders/Orders'
import Cart from './Components/Pages/Cart/Cart'
import Payment from './Components/Pages/Payment/Payment'
import Results from './Components/Pages/Results/Results'
import ProductDetail from './Components/Pages/ProductDetail/ProductDetail'
function Rounting() {
  return (
    <div>
      <Router>
           <Routes>
            <Route path='/' element={<Landing/>}/>
            <Route path='/Amazon-Clone-2025' element={<Landing/>}/>
            <Route path='/auth' element={<Auth/>}/>
            <Route path='/payment' element={<Payment/>}/>
            <Route path='/orders' element={<Orders/>}/>
            <Route path="/category/:categoryName" element={<Results/>}/>
            <Route path="/products/:productsID" element={<ProductDetail />}/>
            <Route path='/cart' element={<Cart/>}/>
           </Routes>
      </Router>
    </div>
  )
}

export default Rounting
