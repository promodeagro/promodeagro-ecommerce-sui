// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// export const createCustomer = createAsyncThunk(
//   'customer/addcustomer',
//   async ({ name, phone }) => {
//     const response = await createCustomers(name, phone);
//     return response.data; // Assuming your API returns data after creating the customer
//   }
// );
// const customerSlice = createSlice({
//   name: 'customer',
//   initialState: {
//     customers: [],
//     status: 'idle',
//     error: null,
//   },
//   reducers: {
//     addCustomer: (state, action) => {
//       state.customers.push(action.payload);
//       console.log('added user in slice',action.payload)
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(createCustomer.pending, (state) => {
//         state.status = 'loading';
//       })
//       .addCase(createCustomer.fulfilled, (state, action) => {
//         state.status = 'idle';
//         // Handle success or update state if needed
//       })
//       .addCase(createCustomer.rejected, (state, action) => {
//         state.status = 'idle';
//         state.error = action.error.message; // Handle error or update state if needed
//       });
//   },
// });

// export default customerSlice.reducer;
// export const { addCustomer} = customerSlice.actions;