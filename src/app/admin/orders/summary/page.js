"use client"
import OrderInfo from '@/components/admin/orders/ordersummary';
import React from 'react';
import { useSearchParams } from 'next/navigation'
// import { data } from 'autoprefixer';
import {useSelector} from 'react-redux'

const Page = () => {
  // const router = useRouter();
  // const record = router.query?.data;
  const searchParams = useSearchParams()
  console.log("data",searchParams.get('data')) 
  const id = searchParams.get('data')
  const orders = useSelector((state) => state.ordersData.ordersList)
  const data = orders.filter((item)=>{
    return item.id === id
  })
  console.log('filter value',data)
  return (
     <OrderInfo/>
    
  );
};

export default Page;


  
