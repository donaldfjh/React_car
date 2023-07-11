import {
  ADD_TO_CART,
  CLEAR_CART,
  COUNT_CART_TOTALS,
  REMOVE_CART_ITEM,
  TOGGLE_CART_ITEM_AMOUNT,
} from '../actions'

const cart_reducer = (state, action) => {
  if(action.type ===ADD_TO_CART){
    const {id,amount,product,color} = action.payload
    console.log(state.cart)
    // because item is combine with different color, so in item id we set cart item id = id + color
    const tempItem = state.cart.find((item)=>item.id === id + color)
    //check where is the item , and overwrite the caritem 
    if(tempItem){
      const tempCart = state.cart.map((item)=>{
        if(item.id === id + color){
          let newAmount = item.amount + amount
          if(newAmount > item.max){
            newAmount = item.max
          }
          return {...item,amount : newAmount}
        }else{
          return item
        }
      })
    
      return {...state, cart:tempCart}
    }else{
      const newItem = {
        id: id + color,
        name: product.name,
        color: color,
        amount:amount,
        image : product.images[0].url,
        price:product.price,
        max: product.stock

      }
      return {...state,cart:[...state.cart,newItem]}
    }
    
    
  }
  if(action.type === REMOVE_CART_ITEM){
    const tempCart = state.cart.filter((item)=>item.id !== action.payload)
    return {...state, cart:tempCart}
  }

  if(action.type === CLEAR_CART){
    return {...state,cart:[]}
  }
//the amount only happend when we iterate the product 
  if(action.type === TOGGLE_CART_ITEM_AMOUNT){
    const {id,value} = action.payload
    const tempCart = state.cart.map((item)=>{
      if(item.id === id){
        if(value === 'inc'){
          let newAmount = item.amount + 1
          if(newAmount > item.max){
            newAmount = item.max
          }
          return {...item, amount : newAmount}
        }
        if(value === 'dec'){
          let newAmount = item.amount - 1
          if(newAmount < 1){
             newAmount = 1
          }
          return {...item, amount : newAmount}
        }
      }else{
        return item
      }
      return {...item}
    })
    return {...state, cart:tempCart}
  }

  if(action.type === COUNT_CART_TOTALS){
    const {final_items, final_amounts} = state.cart.reduce((total, cartItem) => {
      console.log(total,cartItem)
      const {amount,price} = cartItem
      total.final_items = total.final_items + amount
      total.final_amounts = total.final_amounts +(amount * price)

      return total
    }, {
      final_items:0,
      final_amounts:0
    })

    
    return {...state,total_amount:final_amounts, total_items:final_items}
    
  }
  throw new Error(`No Matching "${action.type}" - action type`)
}

export default cart_reducer
