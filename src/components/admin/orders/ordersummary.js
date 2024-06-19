"use client";
import React, { useState, useEffect } from "react";
import { Button, Input, message, Upload, Steps } from "antd";
import { ArrowLeftOutlined, EditOutlined } from "@ant-design/icons";
import { useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { useSearchParams } from "next/navigation";
import { saveOrdersList } from "@/redux/slices/orderSlice";
import axios from "@/Api/axios";
import { List } from 'antd';


const OrderInfo = () => {
  const [comment, setComment] = useState("");
  const router = useRouter();
  const dispatch = useDispatch();
  const searchParams = useSearchParams();
  const data = searchParams.get("data");

  const [order, setOrder] = useState(null); // State to store order details
  const [customer, setCustomer] = useState(null); // State to store customer details
  const [product, setproduct] = useState(null); 
  useEffect(() => {
    const fetchOrder = async (orderId) => {
      try {
        // Make an API call to fetch order details based on the id parameter
        const response = await axios.get(`/getOrderById/${orderId}`);
        setOrder(response.data.order);
      } catch (error) {
        console.error("Error fetching order details:", error);
      }
    };

    if (data) {
      fetchOrder(data);
      // Fetch order details when the id parameter is available
    }
  }, [data]);

  useEffect(() => {
    if (order?.customerId) {
      const fetchCustomerDetails = async (customerId) => {
        try {
          // Make an API call to fetch customer details based on the id parameter
          const response = await axios.get(`/getCustomerById/${customerId}`);
          setCustomer(response.data);
        } catch (error) {
          console.error("Error fetching customer details:", error);
        }
      };

      fetchCustomerDetails(order.customerId); // Fetch customer details when the customerId is available
    }
  }, [order]);
  console.log(customer,"customerby id data");
  console.log(order,"order data");
  useEffect(() => {
    if (order?.items) {
      const fetchProductDetails = async () => {
        try {
          const productDetails = await Promise.all(
            order.items.map(async (item) => {
              const response = await axios.get(`/product/${item.productId}`);
              return response.data;
            })
          );
          setproduct(productDetails);
        } catch (error) {
          console.error("Error fetching product details:", error);
        }
      };

      fetchProductDetails(); // Fetch product details for all items in the order
    }
  }, [order]);

  console.log(product, "products by id data");

  


  const backToOrders = () => {
    router.push("/admin/orders");
  };

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
      console.log("Deleting order");
      const response = await axios.delete(`/deleteCustomerById/${id}`);
      console.log("Success", response);
      // Remove the deleted order from the state
      setOrder((prevOrders) => prevOrders.filter(order => order.id !== id));
    } catch (error) {
      console.log("Error deleting order", error);
    }
  };

  const currentStep = statusToStepIndex[order?.status] || 0;
  
  function Refund() {
    router.push("/admin/orders/Refund");
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
              <h1 className="font-bold text-xl mt-1">#{order?.id || data}</h1>
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
        <div className="ml-10">{order?.createdAt}</div>
      </div>
      <div class="grid grid-cols-9 gap-4">
      <div class="col-span-6"> <h1 className="text-2xl font-bold mb-1">Product Details</h1>
          <div className="border-2 shadow-md w-[37.5rem] h-auto bg-white rounded-xl p-4">
            
          <ul className="list-disc pl-5 p-10  gap-7">
              {product?.map((product, index) => (
                <li key={index} className="mb-2">
                      <img
                    src={product.image}
                    alt={product.name}
                    className="w-16 h-16 object-cover mb-2"
                    height={5}
                    width={5}
                  />
                  <p className="font-semibold">Product Name: {product.name}</p>
                  
                  <p>Quantity: {order.items.find(item => item.productId === product.id)?.quantity}</p>
                 
                </li>
              ))}
            </ul>
          
          </div>
          <div className="border-2 shadow-md w-[37.5rem] h-48 bg-white p-4 mt-5 rounded-xl">
            <div className='border border-slate-200 rounded-md'>
              <div className='border-b h-16 p-2'>
                <div className="flex justify-between">
                  <p>Sub total</p>
                  <p>{order?.items?.length} items</p>
                  <p>${order?.totalPrice}</p>
                </div>
                <div className="py-1 justify-between flex">
                  <p className="font-semibold">Total</p>
                  <p>${order?.totalPrice}</p>
                </div>
              </div>
              <div className='h-12 py-3 px-2 flex justify-between'>
                <p>{order?.status}</p>
                <p>${order?.totalPrice}</p>
              </div>
            </div>
          </div>
          <div className='mt-8'>
          <p className="font-semibold text-base px-2 py-2">Timeline</p>
          <div className="h-20 w-10/12 bg-white rounded-xl py-7 px-2 shadow-md">
            <Steps
              size="small"
              current={currentStep} // Set the current step dynamically based on order status
              items={[
                { title: "Order Placed" },
                { title: "Order Confirmed" },
                { title: "Order Processed" },
                { title: "Shipped" },
                { title: "Out for Delivery" },
                { title: "Delivered" },
              ]}
            />
          </div>  
                 
              </div>
            </div>
        
        
         
     <div class="col-span-3 border-2 shadow-md w-72 h-72 bg-white mt-5 rounded-xl p-2 font-semibold text-slate-800">
            
      <h1 className="text-2xl font-bold mb-1">Customer Details</h1>
      {customer ? (
        <List
        className="rounded-lg p-2"
          itemLayout="vertical"
          dataSource={[customer]} // Wrap the customer object in an array
          renderItem={(item) => (
            <List.Item >
              <List.Item.Meta
                title="ID"
                description={item.id}
              />
              <List.Item.Meta
                title="Name"
                description={item.name}
              />
                <List.Item.Meta
                title="phone"
                description={item.phone}
              />
             
             
             
            </List.Item>
          )}
        />
      ) : (
        <p>Loading...</p>
      )}
 
         
          </div>
       
        </div>
      
    </>
  );
};

export default OrderInfo;
