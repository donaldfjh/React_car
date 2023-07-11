import React from 'react'

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Navbar, Sidebar, Footer } from './components'



import {Home, SingleProduct,Cart,CheckOut,Error,About,PrivateRoute,Products,AuthWrapper} from './pages'

function App() {
  return(
    <AuthWrapper>
  <Router>
    <Navbar/>
    <Sidebar/>
    <Routes>
      <Route path='/' element = {<Home/>}/>
      <Route path='about' element = {<About/>}/>
      <Route path='cart' element = {<Cart/>}/>
      <Route path='products' element = {<Products/>}/>
      <Route path='products/:id' element = {<SingleProduct/>}/>
      <Route path='checkout' element = {
        <PrivateRoute>
          <CheckOut/>
        </PrivateRoute>
      }/>
      <Route path='*' element = {<Error/>}/>
    </Routes>
    <Footer/>
  </Router>
  </AuthWrapper>
  ) 
}

export default App
