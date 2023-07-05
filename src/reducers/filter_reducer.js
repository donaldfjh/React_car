import {
  LOAD_PRODUCTS,
  SET_LISTVIEW,
  SET_GRIDVIEW,
  UPDATE_SORT,
  SORT_PRODUCTS,
  UPDATE_FILTERS,
  FILTER_PRODUCTS,
  CLEAR_FILTERS,
} from '../actions'

const filter_reducer = (state, action) => {
  if(action.type === LOAD_PRODUCTS){
    const products = action.payload
    return {...state, all_products: products, filtered_products:products}
  }

  if(action.type === SET_GRIDVIEW){
    return {...state, grid_view: true}
  }

  if(action.type === SET_LISTVIEW){
    return {...state, grid_view:false}
  }

  if(action.type === UPDATE_SORT){
    const sort_type = action.payload
    return {...state, sort: sort_type}
  }

  if(action.type === SORT_PRODUCTS){
    const {sort, filtered_products} = state
   
    let temProducts = [...filtered_products] ;
    if(sort ==='price-lowest'){
      // a represent current item, b represent next item
      // when a-b >0 then it become b,a
      // temProducts = temProducts.sort((a,b)=> a.price-b.price)
      temProducts = temProducts.sort((a,b)=> {
        if(a.price < b.price){
          return -1
        }
        if(a.price > b.price){
          return 1 
        }
        return 0
      })
    }
    if(sort ==='price-highest'){
      temProducts = temProducts.sort((a,b)=> b.price-a.price)
    }
    if(sort ==='name-a'){
      temProducts = temProducts.sort((a,b)=>{
        return a.name.localeCompare(b.name)
      })
    }
    if(sort ==='name-z'){
      temProducts = temProducts.sort((a,b)=>{
        return b.name.localeCompare(a.name)
      })
    }
    return {...state, filtered_products:temProducts}
  }
  return state
  throw new Error(`No Matching "${action.type}" - action type`)
}

export default filter_reducer
