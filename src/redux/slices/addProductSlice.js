// productSlice.js
import { createSlice} from "@reduxjs/toolkit";
// import { CreateProduct } from "@/Api/createProducts";
const initialState = {
  createProduct: [],
  // status: 'idle',
  // error: null, // Change this to an object if you want to store multiple form data
};
// export const createProducts = createAsyncThunk(
//   'product/setCreateProduct',
//   async ({ id, image, name, description, unit, category, price }) => {
//     const response = await CreateProduct(id, image, name, description, unit, category, price);
//     return response.data; // Assuming your API returns data after creating the customer
//   }
// );

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setCreateProduct: (state, action) => {
      state.createProduct.push(action.payload);
      // state.createProduct = [...state.createProduct, action.payload];
    },
  },
  // extraReducers: (builder) => {
  //   builder
  //     .addCase(createProducts.pending, (state) => {
  //       state.status = 'loading';
  //     })
  //     .addCase(createProducts.fulfilled, (state, action) => {
  //       state.status = 'idle';
  //       // Handle success or update state if needed
  //     })
  //     .addCase(createProducts.rejected, (state, action) => {
  //       state.status = 'rejected';
  //       state.error = action.error.message; // Handle error or update state if needed
  //     });
  // },
});

export const { setCreateProduct } = productSlice.actions;
export default productSlice.reducer;
