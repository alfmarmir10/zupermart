import React, { useReducer } from 'react'

const initialState = {
  Amount: 0,
  Total: 0,
  Products:[]
}
const CartContext = React.createContext(initialState);

const CartContextProvider = ({children}) => {

  function reducer (state, action){
    switch (action.type) {
      case "ADD_PRODUCT":
        return{
          ...state,
          Total: Number(state["Total"]) + Number(action.payload.Price),
          Amount: state["Amount"] + action.payload.Amount,
          Products:{
              ...state.Products,
              [action.payload.id] : {
              Id: action.payload.id,
              Description: action.payload.Description,
              Price: action.payload.Price,
              Total: (state["Products"][action.payload.id]) ? state["Products"][action.payload.id]["Total"]+action.payload.Price : action.payload.Price,
              Amount: (state["Products"][action.payload.id]) ? state["Products"][action.payload.id]["Amount"]+action.payload.Amount : action.payload.Amount,
              Img: action.payload.Img
            }
          }
        }
      case "DISCOUNT_PRODUCT":
        return{
          ...state,
          Total: Number(state["Total"]) - Number(action.payload.Price),
          Amount: state["Amount"] - action.payload.Amount,
          Products:{
              ...state.Products,
              [action.payload.id] : {
              Id: action.payload.id,
              Description: action.payload.Description,
              Price: action.payload.Price,
              Total: (state["Products"][action.payload.id]) ? state["Products"][action.payload.id]["Total"]-action.payload.Price : action.payload.Price,
              Amount: (state["Products"][action.payload.id]) ? state["Products"][action.payload.id]["Amount"]-action.payload.Amount : action.payload.Amount,
              Img: action.payload.Img
            }
          }
        }
      case "REMOVE_PRODUCT":
        let newProductsArray = Object.values(state.Products);
        newProductsArray = newProductsArray.filter(item => item.Id !== action.payload.id);
        return{
          ...state,
          Total: Number(state["Total"]) - Number(action.payload.Price),
          Amount: state["Amount"] - action.payload.Amount,
          Products: newProductsArray
        }
      default:
        break;
    }

  }

  const [cartState, dispatchCart] = useReducer(reducer, initialState);

  const val={cartState, dispatchCart};

  return (
    <CartContext.Provider value={val}>{children}</CartContext.Provider>
  )
}

export {CartContext};
export default CartContextProvider;
