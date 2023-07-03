import axios from 'axios'
import React, { useContext, useEffect, useReducer } from 'react'
import reducer from '../reducers/products_reducer'
import { products_url as url } from '../utils/constants'
import {
  SIDEBAR_OPEN,
  SIDEBAR_CLOSE,
  GET_PRODUCTS_BEGIN,
  GET_PRODUCTS_SUCCESS,
  GET_PRODUCTS_ERROR,
  GET_SINGLE_PRODUCT_BEGIN,
  GET_SINGLE_PRODUCT_SUCCESS,
  GET_SINGLE_PRODUCT_ERROR,
} from '../actions'

const initialState = {
  isSideBarOpen:false,
  products_loading:false,
  products_error:false,
  products:[],
  feature_products:[],

}

const ProductsContext = React.createContext()

export const ProductsProvider = ({ children }) => {
  const [state,dispatch] = useReducer(reducer,initialState)

  const openSideBar =()=>{
    dispatch({type:SIDEBAR_OPEN})
  }

  const closeSideBar =()=>{
    dispatch({type:SIDEBAR_CLOSE})
  }

  const fetchProduct = async(url)=>{
    dispatch({type:GET_PRODUCTS_BEGIN})
    try {
      const res = await axios.get(url)
      const data = await res.data
      console.log(data)
      dispatch({type: GET_PRODUCTS_SUCCESS, payload:data})
    } catch (error) {
      console.log(error)
      dispatch({type:GET_PRODUCTS_ERROR})
    }
    
    
  }

  useEffect(()=>{
    fetchProduct(url)
  },[])

  
  return (
    <ProductsContext.Provider value={{...state,openSideBar,closeSideBar}}>
      {children}
    </ProductsContext.Provider>
  )
}
// make sure use
export const useProductsContext = () => {
  return useContext(ProductsContext)
}
