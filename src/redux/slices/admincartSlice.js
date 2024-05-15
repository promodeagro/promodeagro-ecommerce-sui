import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  adminCart: [],
};
const adminCartDetails = createSlice({
  name: "AdminCartItems",
  initialState,
  reducers: {
    addToAdminCart: (state, action) => {
      // console.log('dispatching cart items',action.payload)
      state.adminCart.push(action.payload);
      // console.log('payload',action.payload)
    },
    remove: (state, action) => {
      state.adminCart = state.adminCart.filter(item => item.id !== action.payload);
    }
  },
});

export const { addToAdminCart,remove } = adminCartDetails.actions;
export default adminCartDetails.reducer;
