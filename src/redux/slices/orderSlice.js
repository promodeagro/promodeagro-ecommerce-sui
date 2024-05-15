import { createSlice } from '@reduxjs/toolkit';

const orderSlice = createSlice({
  name: 'orders',
  initialState: {
    //selectedOrder: [],
    ordersList: [], 
  },
  reducers: {
    // setSelectedOrder: (state, action) => {
    //   state.selectedOrder = action.payload;
    // },
    saveOrdersList: (state, action) => {
      state.ordersList = action.payload;
      
    },
  },
});
// setSelectedOrder,

export const {  saveOrdersList } = orderSlice.actions;
export default orderSlice.reducer;