'use client'
import React from 'react'
import AddCustomer from '../../../../components/admin/customers/addcustomer/addcustomer'
import store from '../../../../redux/store/store'
import {Provider}  from 'react-redux'
const Page = () => {
  return (
    <Provider store={store}>
      <AddCustomer/>
    </Provider>
  )
}

export default Page