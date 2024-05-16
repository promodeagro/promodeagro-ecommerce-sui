'use client'
import { useState, useEffect } from "react";
import Image from "next/image";
import { useDispatch } from "react-redux";
import { notification, Button } from 'antd';
import { HomeOutlined } from '@ant-design/icons'; // Import the Ant Design icon
import empty from "../../admin/images/empty.jpg"
import Link from "next/link"
import { remove } from "@/redux/slices/CartSlice";
import { addToSaveForLater } from "@/redux/slices/saveForLaterSlice";

const Card = () => {
  const dispatch = useDispatch();
  const [productCounts, setProductCounts] = useState({});
  const cartItemsFromStorage1 = localStorage.getItem('addcartitems');
  const cartItemsFromStorage = JSON.parse(cartItemsFromStorage1);

  const updateCount = (id, newCount) => {
    if (newCount < 0) {
      newCount = 0;
    }
    setProductCounts((prevCounts) => ({
      ...prevCounts,
      [id]: newCount
    }));
    // Add or remove item from local storage based on count
    const updatedCartItems = [...cartItemsFromStorage];
    if (newCount > (cartItemsFromStorage.find(item => item.id === id)?.quantity || 0)) {
      updatedCartItems.push({ id, quantity: newCount });
    } else {
      const index = updatedCartItems.findIndex(item => item.id === id);
      if (index !== -1) {
        updatedCartItems.splice(index, 1);
      }
    }
    localStorage.setItem('addcartitems', JSON.stringify(updatedCartItems));
  };

  const removeToCart = (id) => {
    // Remove item from Redux store
    dispatch(remove(id));
    // Remove item from local storage
    const updatedCartItems = cartItemsFromStorage.filter(item => item.id !== id);
    localStorage.setItem('addcartitems', JSON.stringify(updatedCartItems));
  };

  const saveForLater = (id) => {
    // Remove item from Redux store
    dispatch(remove(id));
    dispatch(addToSaveForLater(id));
    // Remove item from local storage
    const updatedCartItems = cartItemsFromStorage.filter(item => item.id !== id);
    localStorage.setItem('addcartitems', JSON.stringify(updatedCartItems));
    notification.success({
      message: 'Product Saved For Later Successfully!',
    });
  };

  if (!cartItemsFromStorage || cartItemsFromStorage.length === 0) {
    return (
      <div className="empty-cart mt-5 mb-5">
        <div className="flex gap-5 mb-2 justify-evenly">
          <h1 className="text-lg font-bold">Please add items to your cart to continue</h1>
          <Link href="/">
            <Button
              style={{ height: '32px' }}
              icon={<HomeOutlined />}
            >
              Home
            </Button>
          </Link>
        </div>
        <Image src={empty} height={500} width={500} alt="image"></Image>
      </div>
    );
  }

  const cards = cartItemsFromStorage.map((product) => (
    <div key={product.id} className="card1 mt-4">
      <h3 className="inline font-semibold">{product.category}</h3>
      <div className="w-10 border border-orange-500 bg-orange-500 mt-2"></div>
      <div className="border border-1 border-[rgba(173,213,102)] rounded-md mt-5">
        <h1 className="bg-gradient-to-r from-[rgba(255,255,255)] to-[rgba(173,213,102)] text-[#476F00] h-10 p-2">
          Har Din Sasta!
        </h1>

        <div className="flex gap-4 mt-2 mx-10">
          <div className="flex">
            {/* Your image rendering code */}
            <Image src={product.image} width={200} height={90} className="pt-5" alt="Product image" />
            <div className="flex flex-col justify-center text-lg py-12 pl-14">
              <h2>{product.name}</h2>
              <b>₹{product.price}</b> &nbsp;
              <p className="line-through inline-block text-[#909090]">₹{product.price * 2}</p>
            </div>
          </div>

          <section className="flex w-[50%] gap-14">
            <div className="py-14 pl-14 pr-0">
              <div className="flex hover:shadow-xl shadow-black border border-stone-400 hover:border-2 gap-10 w-[100%] px-3 rounded-md">
                <button
                  className="hover:bg-red-500 w-10 h-7 mt-1.5 rounded-md"
                  onClick={() => updateCount(product.id, (productCounts[product.id] || 0) - 1)}
                >
                  -
                </button>
                <h2 className="m-2">{productCounts[product.id] || 1}</h2>
                <button
                  className="hover:bg-red-500 w-10 h-7 mt-1.5 rounded-md"
                  onClick={() => updateCount(product.id, (productCounts[product.id] || 0) + 1)}
                >
                  +
                </button>
              </div>
              <div className="mt-2 text-xs text-center text-stone-500">
                <button onClick={() => removeToCart(product.id)}>Delete |&nbsp;</button>
                <button onClick={() => saveForLater(product.id)}> Save for Later</button>
              </div>
            </div>
            <div className="flex flex-col pt-[17%] text-[15px]">
              {/* Your price rendering code */}
            </div>
          </section>
        </div>
      </div>
    </div>
  ));

  return <div>{cards}</div>;
};

export default Card;