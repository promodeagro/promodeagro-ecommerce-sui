"use client";
import React from "react";
import { Space } from "antd";
import pro from "./images/product.svg";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useMediaQuery } from 'react-responsive';


const Home = () => {
  const router = useRouter();

  const AddProducts = () => {
    router.push("/admin/products/addproduct");
  };
  const isSmallScreen = useMediaQuery({ maxWidth: 767 });


  return (
    <div>
      <div className="m-auto w-[70%] p-4"
                          style={{ width: isSmallScreen ? "100%" : "70%" }}
                          >
        <h1 className="text-2xl font-bold">Get ready To sell</h1>

        <p className="mt-2 mb-5">
          Here’s a guide to get started. As your business grows, you’ll get
          fresh tips and insights here.
        </p>
        <div className="rounded-xl w-[100%] xl:h-[600px] md:h-[800px] sm:h-[800px] bg-white p-10 border">
          <div className="w-[100%]">
            <Space direction="vertical" size={12}>
              <h3 className="font-semibold text-[16px]">Setup guide</h3>

              <p className="text-sm md:text-sm lg:text-sm xl:text-sm">
                Use this personalized guide to get your store up and running.
              </p>

              <div className="rounded-lg w-32 border h-[25px] text-center">
                0 / 6 completed
              </div>
              <div className="hover:bg-gray-100 hover:w-full hover:h-auto p-4 hover:rounded-lg">
                <p className="hover:bg-gray-100 hover:w-full hover:h-[30%] hover:rounded-lg hover:cursor-pointer  font-semibold text-gray-800">
                  Add Your First Product
                </p>
                <p>
                  Write a description, add photos, and set pricing for the  products you plan to sell
                 
                </p>
                <button
                  onClick={AddProducts}
                  className="bg-black text-white rounded-md px-4 py-1 mr-2 mt-3"
                >
                  Add Product{" "}
                </button>
                <div className="flex float-end">
                  {/* <Image src={pro} alt="product" height={100} width={100} /> */}
                </div>
                <div className="hover:cursor-pointer mt-3">
                </div>
              </div>
              <div>
                <p className="hover:bg-gray-100 hover:w-full hover:h-[30%] hover:rounded-lg hover:cursor-pointer p-2">
                  Customize Your online store
                </p>
              </div>
              <div>
                <p className="hover:bg-gray-100 hover:w-full hover:h-[30%] hover:rounded-lg hover:cursor-pointer p-2">
                  Name Your Store
                </p>
              </div>
              <div>
                <p className="hover:bg-gray-100 hover:w-full hover:h-[30%] hover:rounded-lg hover:cursor-pointer p-2">
                  Set Your shipping Rates
                </p>
              </div>
              <div>
                <p className="hover:bg-gray-100 hover:w-full hover:h-[30%] hover:rounded-lg hover:cursor-pointer p-2">
                  Place a test order
                </p>
              </div>
              <div>
                <p className="hover:bg-gray-100 hover:w-full hover:h-[30%] hover:rounded-lg hover:cursor-pointer p-2">
                  Remove your store password
                </p>
              </div>
            </Space>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
