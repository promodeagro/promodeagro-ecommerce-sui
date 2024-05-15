'use client'
import React, { useEffect, useState } from "react";
import { removeSave } from "@/redux/slices/saveForLaterSlice";
import { useSelector, useDispatch } from "react-redux";
import Header from "../home/Header";
import Image from 'next/image';
import { addToCart } from "@/redux/slices/CartSlice";
import empty from "../../admin/images/empty.jpg"
import Link from "next/link"
import { ShoppingCartOutlined } from '@ant-design/icons'; // Import the Ant Design icon
import { Button } from "antd";


const SaveForlater = () => {
  const dispatch = useDispatch();
  const saveForLater = useSelector(state => state.saveForLaterSlice.saveForLater);

  const removeFromSave = (id) => {
    dispatch(removeSave(id));
  };

  const cartAdd = (data) => {
    dispatch(addToCart(data));
  };

  // Render icon and text when cart is empty
  if (saveForLater.length === 0) {
    return (
      <div className="empty-cart mt-5 mb-5">
        <div className="flex gap-4 justify-between">
          <h1 className="text-lg font-bold">Add some items to save for later</h1>
          <Link href="/">
            <Button style={{ height: '30px' }} className="mb-1">
              Home
            </Button>
          </Link>
        </div>
        <Image src={empty} height={500} width={500} alt="image" />
        
      </div>
    );
  }

    // Render icon and text when cart is empty
    if (saveForLater.length === 0) {
      return (
        <div className="empty-cart mt-5 mb-5">
          {/* <ShoppingCartOutlined style={{ fontSize: '500px', color: '#ccc' }} /> */}
          <Image src={empty} height={500} width={500} alt="image"></Image>
          <div className="flex gap-5">
          <h1 className="text-lg font-bold">Add some items to save for later</h1>
          <Link href="/">
              <button
                
                style={{ marginTop: '16px', height: '40px', borderRadius: '20px' }}
                icon={<ShoppingCartOutlined />}
              >
                Back Home
              </button>
            </Link>
            </div>
        </div>
      );
    }


  const cards = saveForLater.map((product) => (

    <div className="m-10 flex justify-center gap-7 w-[100%]" key={product.id}>
      <div
        className="bg-white shadow-lg rounded-lg flex justify-evenly  "
        style={{ width: "100%" }}
      >
        <figure className="flex-shrink-0 p-5 rounded-lg pl-10">
          <Image
            src={product.image}
            className="w-[100%] h-48 object-cover p-3"
            alt="product"
            width={100}
            height={100}
          />
        </figure>
        <div className="p-6 flex flex-col justify-between">
          <div>
            <h2 className="text-xl font-bold mb-2">{product.name}</h2>
            <p className="text-xl font-bold text-gray-600">INR: ₹{product.price}</p>
            <h2 className="text-xl font-lg mb-2"><b>Category :</b> {product.category}</h2>
            <h2 className="text-xl font-lg mb-2"><b>Unit available :</b> {product.unit}</h2>
          </div>
          <div className="mt-4 flex justify-end  gap-4 items-end">
            <button className="btn bg-red-600 text-white font-semibold p-3 rounded-lg" onClick={()=>removeFromSave(product.id)}>Remove</button>
            <button className="btn bg-green-500 text-white font-semibold p-3 rounded-lg" onClick={()=>cartAdd(product)}>Add To Cart</button>

          </div>
        </div>
      </div>
    </div>
  ));

  return (
    <>


   {cards}
   </>
  )

};

export default SaveForlater;