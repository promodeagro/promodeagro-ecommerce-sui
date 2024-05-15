"use client"
import React, { useEffect, useState } from "react";
import { ArrowLeftOutlined } from "@ant-design/icons";

import { Input, message, Upload } from "antd";
import { EditOutlined } from "@ant-design/icons";
import { Checkbox } from 'antd';

const Refund = () => {
    const onChange = (e) => {
        console.log(`checked = ${e.target.checked}`);
      };
  

return (
    <>
      <div className="p-8">
        <header className="flex gap-5">
          
        
            <h1 className="font-bold text-2xl">Refund Items</h1>
         
         
        </header>
        <div className="ml-10"></div>
      </div>
      <div className='flex gap-5'>

<div>
      <div className="border-2 shadow-sm w-[37.5rem] h-72 bg-white rounded-none p-4">
      <p className='font-semibold text-base ml-4 text-slate-800 mb-2'>Fulfilled</p>
        
        <div className='flex justify-end mt-2'>
 
</div>

      </div>
      <div className="border-2 shadow-sm w-[37.5rem] h-48 bg-white p-4 mt-5 rounded-none">
      <p className='font-semibold text-base ml-4 text-slate-800 mb-2'>Refund Shipping</p>  
      </div>
      <div className='mt-8'>
    
      <div className="border-2 shadow-sm w-[37.5rem] h-48 bg-white mt-5">
      <p className='font-semibold text-base ml-4 text-slate-800 mt-4'>Reason For refund</p>
      <div className="flex flex-col m-4 space-y-4 items-end">
              
              <Input
                placeholder="Leave a Reason..."
                // value={comment} 
                // onChange={(e) => setComment(e.target.value)}
                className='h-16 rounded-none'
              />
               
    <button
      className="text-gray-500 font-semibold h-6 w-14"
      //onClick={handlePostComment}
      style={{
        backgroundColor: "#E3E3E3",
        borderRadius: "5px",
        
      }}
  
    >
      Submit
    </button>

            </div>
        </div>
        </div>
</div>      
      <div className="border-2 shadow-sm w-80 h-96 bg-white  p-2 font-semibold text-slate-800">
       <p className='font-semibold text-slate-800'>Summary</p> 
       <div className="mt-4">
    <input
      type="text"
      placeholder="Amount For Refund"
      className="border-2 border-gray-300 px-2 py-1  w-full"
    />


<button
      className="bg-black text-white font-semibold h-10 w-full mt-52 "
      //onClick={handlePostComment}
 >
      Refund Amount
    </button>
    <Checkbox onChange={onChange} className="m-4">Send a Notification To the customer</Checkbox>
  </div>


      </div>
</div>
    </>
  );
};

export default Refund;
