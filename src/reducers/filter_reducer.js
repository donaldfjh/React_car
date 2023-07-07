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
    let maxPrice = action.payload.map((item)=>item.price)
    maxPrice = Math.max(...maxPrice)

    return {...state, all_products: [...action.payload], 
      filtered_products:[...action.payload],
      filters:{...state.filters,max_price:maxPrice, price : maxPrice}
    }
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
          return 1 // when >0 后面的放前面
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
  // we use [name]: value dynamic change the value in side the filters object
  if(action.type ===UPDATE_FILTERS){
    const {name,value} = action.payload
    return {...state, filters:{...state.filters,[name]:value}}
  }

  if(action.type === FILTER_PRODUCTS){
    const {all_products} = state
    const {text,company,category,color,price,shipping} = state.filters

    let tempProduct = [...all_products]
    console.log(tempProduct)

    if(text){
      tempProduct = tempProduct.filter((item)=>{
        return (
          item.name.toLowerCase().startsWith(text)
        )
      })
    }
    if(category !== 'all'){
      tempProduct = tempProduct.filter((item)=>{
        return(
          item.category.toLowerCase() === category
        )
      })
    }

    if(company !== 'all'){
      tempProduct = tempProduct.filter((item)=>{
        return(
          item.company.toLowerCase() === company
        )
      })
    }

    if(color !== 'all'){
      tempProduct = tempProduct.filter((item)=>{
        return(
          item.colors.find((c)=>c===color)
        )
      })
    }

    if(shipping){
      tempProduct = tempProduct.filter((item)=>{
        return (
          item.shipping === true
        )
      })
    }

    tempProduct = tempProduct.filter((item)=>{
      return (
        item.price <= price
      )
    })

    // filtering
    return {...state, filtered_products: tempProduct}
  }

  if(action.type === CLEAR_FILTERS){
    return {...state, filters : { 
    ...state.filters,
    text:'',
    company:'all',
    category:'all',
    color:'all',
    price:0,
    price : state.filters.max_price,
    shipping:false}
  }
  }
  return state
  throw new Error(`No Matching "${action.type}" - action type`)
}

export default filter_reducer
