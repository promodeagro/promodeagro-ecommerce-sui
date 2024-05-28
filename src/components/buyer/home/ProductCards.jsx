'use client'
import { useState } from 'react';
import { CiBookmark } from 'react-icons/ci';
import { FaRupeeSign } from 'react-icons/fa';
import Link from 'next/link';
import Image from 'next/image';
import { useDispatch } from 'react-redux';
import { addToCart, remove } from '@/redux/slices/CartSlice';
import { addToSaveForLater, removeFromSave } from '@/redux/slices/saveForLaterSlice';
import { notification } from 'antd';
import { IoCheckmarkDoneCircleSharp } from "react-icons/io5";

const ProductCards = ({ data, searchQuery }) => {
  const [addedToCart, setAddedToCart] = useState(false);
  const [saveItem, setSaveItem] = useState(false);
  const dispatch = useDispatch();

  // Function to add item to cart and local storage
  const cartAdd = (data) => {
    dispatch(addToCart(data));
    setAddedToCart(true);

    // Retrieve cart items from local storage or create an empty array
    const cartItemsFromStorage = JSON.parse(localStorage.getItem('addcartitems')) || [];
    // Add the new item to the cart items array
    const updatedCartItems = [...cartItemsFromStorage, data];
    // Update local storage with the updated cart items array
    localStorage.setItem('addcartitems', JSON.stringify(updatedCartItems));
  };

  // Function to remove item from save for later and local storage
  const removeFromSave = (id) => {
    dispatch(removeFromSave(id));
    setSaveItem(false);

    // Remove the item from local storage
    const cartItemsFromStorage = JSON.parse(localStorage.getItem('addcartitems')) || [];
    const updatedCartItems = cartItemsFromStorage.filter(item => item.id !== id);
    localStorage.setItem('addcartitems', JSON.stringify(updatedCartItems));
  };

  // Function to remove item from cart and local storage
  const removeToCart = (id) => {
    dispatch(removeFromCart(id));
    setAddedToCart(false);

    // Remove the item from local storage
    const cartItemsFromStorage = JSON.parse(localStorage.getItem('addcartitems')) || [];
    const updatedCartItems = cartItemsFromStorage.filter(item => item.id !== id);
    localStorage.setItem('addcartitems', JSON.stringify(updatedCartItems));
  };

  const saveForLater = (data) => {
    dispatch(addToSaveForLater(data));
    notification.success({
      message: 'Product Saved For Later Successfully!',
    });
    setSaveItem(true);
  };

  return (
    <div className="w-[90%] h-[38vh] sm:w-[45%] sm:h-[55vh] md:w-[30%] md:h-[65vh] lg:w-[24%] lg:h-[70vh]">
      <div className="container-fluid bg-white rounded-lg p-3 flex flex-col justify-between flex-wrap items-center gap-1 sm:gap-3 shadow-lg">
        <div className="rounded-md w-[100%] h-[40%] md:h-[30vh] border p-2">
          <Link
            href={{
              pathname: '/buyer/product',
              query: { id: data.id },
            }}
          >
            <Image
              src={data.image}
              width={100}
              height={100}
              loading="lazy"
              style={{ width: 'auto', height: 'auto' }}
              alt="product image"
              unoptimized
              className="rounded-md"
            />
          </Link>
        </div>
        <div className="text-lg font-semibold flex m-1 justify-center items-center">
          {data.name}
        </div>
        <div className="gap-2">
          <h2 className="text-lg h-6">Category: {data.category}</h2>
        </div>
        <div className="text-lg font-semibold flex m-1 justify-center items-center">
          Unit:{data.unit} : <FaRupeeSign />
          Price:{data.price}
        </div>
        <div className="flex justify-between items-center w-[100%] h-[10%]">
          {saveItem ? (
            <IoCheckmarkDoneCircleSharp className='ml-3 h-8 w-8' onClick={()=>removeFromSave(data.id)}/>
          ) : (
            <button className="p-2 md:p-3 border rounded-md" onClick={() => saveForLater(data)}>
              <CiBookmark
                className="font-bold text-lg md:text-lg" 
              />
            </button>
          )}
          {addedToCart ? (
            <button className="p-1 md:p-2 border border-green-500 w-[70%] rounded-md" onClick={() => removeToCart(data.id)}>
              Remove from Cart
            </button>
          ) : (
            <button
              onClick={() => cartAdd(data)}
              className="border-red-600 bg-white p-1 md:p-2 w-[70%] border hover:shadow-2xl rounded-md"
            >
              Add To cart
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCards;
