// store.js
import { configureStore } from "@reduxjs/toolkit";
import productSlice from '../slices/addProductSlice';
import customerSlice from '../slices/addCustomerSlice';
import orderSlice from "../slices/orderSlice"; 
import allProducts from "../slices/products"; 
import cartDetails from "../slices/CartSlice"
import adminCartDetails from "../slices/admincartSlice";
import saveSlice from "../slices/saveForLaterSlice"

const store = configureStore({
  reducer: {
    productData: productSlice,
    // customerSlice: customerSlice, 
    ordersData: orderSlice,
    allProducts :allProducts,
    cartDetails:cartDetails,
    adminCartDetails:adminCartDetails,
    saveForLaterSlice: saveSlice
  },
});

export default store;


