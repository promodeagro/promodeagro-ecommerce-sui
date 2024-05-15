import { createSlice} from "@reduxjs/toolkit";
const initialState = {
    cart: [],
  };
  const cartDetails = createSlice({
    name: "cartItems",
    initialState,
    reducers: {
      addToCart: (state, action) => {
        console.log('dispatching cart items',action.payload)
        state.cart.push(action.payload);
        console.log('payload',action.payload) 
          },
          remove: (state, action) => {
            state.cart = state.cart.filter(item => item.id !== action.payload);
          }
    },
  });
  
  export const { addToCart,remove } = cartDetails.actions;
  export default cartDetails.reducer;
  