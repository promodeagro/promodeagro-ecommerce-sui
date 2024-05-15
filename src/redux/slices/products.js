import { createSlice} from "@reduxjs/toolkit";
const initialState = {
  products: [],
};

const allProducts = createSlice({
  name: "allProducts",
  initialState,
  reducers: {
    setAllProducts: (state, action) => {
      console.log('dispatching ',action.payload)
      state.products = action.payload;
      console.log('payload',action.payload) 
        },
  },
});

export const { setAllProducts } = allProducts.actions;
export default allProducts.reducer;
