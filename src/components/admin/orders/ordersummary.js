"use client"
import React, { useState } from "react";
import { Button, Input, message, Upload } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { useSearchParams } from "next/navigation";
import { saveOrdersList } from "@/redux/slices/orderSlice";
//import { FetchOrders } from "@/Api/fetchingOrders";
//import {Input, message, Upload } from "antd";
import { EditOutlined } from "@ant-design/icons";
import { useEffect } from 'react';
import { Steps } from 'antd';
import axios from "@/Api/axios";

const 
OrderInfo = () => {
  const [comment, setComment] = useState("");
  const router = useRouter();
  const dispatch = useDispatch();
  const searchParams = useSearchParams();
  const idFromParams = searchParams.get("data");
  

  // useEffect(() => {
  //   const fetchOrders = async () => {
  //     try {
  //       const response = await FetchOrders(); 
  //       dispatch(saveOrdersList(response.data.listOrders.items));
  //     } catch (error) {
  //       console.error("Error fetching orders:", error);
  //     }
  //   };

  //   fetchOrders();
  // },[dispatch]);

  const orders = useSelector((state) => state.ordersData.ordersList);
  console.log(orders, "coming from redux");

  const backToOrders = () => {
    router.push("/admin/orders");
  };

  const data = orders.filter((item) => item.id === idFromParams);
  console.log("filter value", data);
const id = data.map((id => id.id));
console.log("id of order",id)

useEffect(() => {
  const fetchData = async (orderId) => {
    if (!orderId) {
      return; // If orderId is null or undefined, return early
    }

    console.log("orderId inside useEffect", orderId);
    try {
      const result = await axios.get(`/getOrderById/${orderId}`);
      console.log("order", result);
      console.log("ids", result.data);
      // const items = result.data.map((item => item.items))
      // console.log("items", items)
      // dispatch(saveOrdersList(result.data)); // save fetched data in Redux store
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  fetchData(id);
}, [id, dispatch]);

  const statusToStepIndex = {
    'PENDING': 0, 
    'CONFIRMED': 1, 
    'PROCESSED': 2,
    'SHIPPED': 3,
    'OUT_FOR_DELIVERY': 4,
    'DELIVERED': 5
  };

  const handleDeleteItem = async (id) => {
    try {
      console.log("Deleting customer");
      const response = await axios.delete(`/deleteCustomerById/${id}`);
      console.log("Success", response);
      setcustomers(customers.filter(customer => customer.id !== id));
    } catch (error) {
      console.log("Error deleting customer", error);
    }
  };

  const currentStep = statusToStepIndex[data[0]?.status] || 0;
  
  function Refund(){
     router.push("/admin/orders/Refund")
  }

  return (
    <>

      <div className="p-8">
        <header className="flex gap-5">
          <ArrowLeftOutlined
            className="text-lg font-semibold"
            onClick={backToOrders}
          />
          <div className="flex justify-between w-10/12">
           <div>
              <h1 className="font-bold text-xl mt-1">#{data?.id || idFromParams}</h1>
            </div>
            <div className="gap-4 flex">

            <button
              style={{
                backgroundColor: "#E3E3E3",
                borderRadius: "5px",
                padding: "8px 15px 8px 15px",
              }}
              onClick={Refund}
            >
              Refund
            </button>
            <button
              style={{
                backgroundColor: "#E3E3E3",
                borderRadius: "5px",
                padding: "8px 15px 8px 15px",
              }}
            >
              Return
            </button>
            <button
              style={{
                backgroundColor: "#E3E3E3",
                borderRadius: "5px",
                padding: "8px 15px 8px 15px",
              }}
            >
              Edit
            </button>
            </div>
          </div>
        </header>
        <div className="ml-10">{data[0]?.createdAt}</div>
      </div>
      <div className='flex gap-5'>
<div>
      <div className="border-2 shadow-md w-[37.5rem] h-72 bg-white rounded-xl p-4">
        <div></div>
        <div className='border border-slate-200 h-44 rounded-md'>
        <div className='border-b h-14'><p></p></div>
        <div className='border-b h-14'></div>
        <div className='h-14'></div></div>
        <div className='flex justify-end mt-2'>
  <button className="bg-gray-800 text-white rounded-lg h-7 w-30 px-2 text-sm">
    Add tracking
  </button>
</div>

      </div>
      <div className="border-2 shadow-md w-[37.5rem] h-48 bg-white p-4 mt-5 rounded-xl">
      <div className='border border-slate-200 rounded-md'>
      <div className='border-b h-16 p-2'>
        <div className="flex justify-between">
        <p>Sub total</p>
      <p>{data[0]?.items.length} items</p>
      <p>${data[0]?.totalPrice}</p></div>
      <div className="py-1 justify-between flex"><p className="font-semibold">Total</p>
      <p>${data[0]?.totalPrice}</p></div>
      </div>
        <div className=' h-12 py-3 px-2 flex justify-between'><p>{data[0]?.status}</p>
        <p>${data[0]?.totalPrice}</p></div>

        </div>
      </div>
      <div className='mt-8'>
      <p className='font-semibold text-base ml-4 text-slate-800 mb-2'>Timeline</p>
      <div className="border-2 shadow-md w-[37.5rem] h-40 bg-white rounded-xl">
      <div className="flex flex-col mt-4 space-y-4 items-end">
              
              <Input
                placeholder="Leave a comment..."
                value={comment} 
                onChange={(e) => setComment(e.target.value)}
                className='border-none hover:border-0 h-16 rounded-none'
              />
                <div className="bg-slate-50 flex justify-end h-full w-full"> {/* Use flex justify-end */}
    <button
      className="text-gray-500 font-semibold h-6 w-12  mt-4 mb-4 mr-3"
      style={{
        backgroundColor: "#E3E3E3",
        borderRadius: "5px",
        
      }}
  
    >
      Post
    </button>
  </div>
            </div>
        </div>
        </div>
      <p className='text-slate-500 text-end'>Only you and other staff can see comments</p>
</div>

<div>
      <div className="border-2 shadow-md w-80 h-20 bg-white p-2 rounded-xl text-slate-800">
        <div className='flex justify-between w-full'>
        <p className='font-semibold text-slate-800'>Notes</p>
      <div><EditOutlined /></div>
        
        </div>
        <div className='text-slate-800 py-2'>No notes from customer</div>
      </div>

      <div className="border-2 shadow-md w-80 h-72 bg-white mt-5 rounded-xl p-2 font-semibold text-slate-800">
       <div><p className='font-semibold text-slate-800'>Customer</p></div> 
       <div className="mt-4">
    <input
      type="text"
      placeholder="Search or create a customer"
      className="border-2 border-gray-300 px-2 py-1 rounded-md w-full"
    />
  </div>
  <div className="justify-between">
  <div className="w-full h-12 mt-4 flex justify-between">
    <p>Contact information</p>
    <div><EditOutlined /></div>
  </div>
  <div className="w-full h-12 mt-2 flex justify-between">
    <p>Shipping address</p>
    <div><EditOutlined /></div>
  </div>
  <div className="w-full mt-2 flex justify-between">
    <p>Billing address</p>
    <div><EditOutlined /></div>
  </div>
</div>

      </div>

      <div className="border-2 shadow-md w-80 h-36 bg-white p-2 rounded-xl mt-5">
        <p className='font-semibold text-slate-800'>Conversion summary</p>
        <p className='text-slate-800 mt-4'>There aren&apos;t any conversion details available for this order.</p>
        <div className="mt-4"><a className='text-sky-500 font-semibold'>Learn more</a></div>
      </div>
      <div className="border-2 shadow-md w-80 h-44 bg-white p-2 mt-5 rounded-xl font-semibold text-slate-800">Fraud analysis</div>
</div>

</div>
<div className="flex"><p className="font-semibold text-base px-2 py-2">Timeline</p>
</div>
<div className="h-20 w-10/12 bg-white rounded-xl py-7 px-2 shadow-md">
      <Steps
          size="small"
          current={currentStep} // Set the current step dynamically based on order status
          items={[
            {
              title: "Order Placed",
            },  
            {
              title: "Order Confirmed",
            },
            {
              title: "Order Processed",
            },
            {
              title: "Shipped",
            },
            {
              title: "Out for Delivery",
            },
            {
              title: "Delivered",
            },
          ]}
        />
      </div>  

    </>
  );
};

export default OrderInfo;