'use client'
import React, { useState } from 'react';
import { DatePicker, Space } from 'antd';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import Link from "next/link"
import { useMediaQuery } from 'react-responsive';


const { RangePicker } = DatePicker;


const App = () => {
  const isWidth200to399 = useMediaQuery({  minWidth:200,maxWidth: 399 });
  const isWidth400to766 = useMediaQuery({ minWidth: 400, maxWidth: 767 });

  const [selectedDateRange, setSelectedDateRange] = useState([]);

  const handleDateRangeChange = (dates) => {
    setSelectedDateRange(dates);
  };

  const data = [
    { date: '2022-01-01', value: 10, type: 'A' },
    { date: '2022-01-02', value: 15, type: 'A' },
    { date: '2022-01-03', value: 8, type: 'A' },
    // Add more data points as needed
  ];
  
  return (
    <div>
      <h1 className="font-bold text-2xl mt-6">Analytics</h1>
      <div className="flex gap-4 mt-4">
        <Space direction="vertical" size={12}>
          <RangePicker renderExtraFooter={() => 'extra footer'} onChange={handleDateRangeChange} />
        </Space>
        <p>{selectedDateRange.length > 0 && `Compared From ${selectedDateRange[0].format('YYYY-MM-DD')} to ${selectedDateRange[1].format('YYYY-MM-DD')}`}</p>
      </div>
      <div className={`grid ${
      isWidth200to399 
        ? 'grid-cols-1' 
        : isWidth400to766 
          ? 'grid-cols-2' 
          : 'grid-cols-3'
    }`}>

      <div className="bg-white rounded-md border border-1 h-[450px] mt-2 w-[95%] ">
        <div className="grid grid-rows-4 gap-3 m-6">
        <div className="flex justify-between">
        <h2 className="border-dashed border-b border-gray-400">Total Sales</h2>
        <Link href="/" className="text-blue-500">View report</Link>
        </div>
        <div className="flex justify-between">
        <h1 className="font-bold text-2xl">₹816745,98</h1>
        <span className="font-bold text-2xl">-</span>
        </div>
        <div className="flex justify-between">
        <h3>Draft Orders</h3>
        <span>7854,787  <span>-</span></span>
       
        </div>
        <div>
        <span className="border-dashed border-b border-gray-400">Sales Over Time</span>
        </div>
        </div>

        
        <ResponsiveContainer height={200} width="100%" className="pr-2">
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis  axisLine={false}/>
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="value" name="Value" stroke="#8884d8" curve="basis" />
      </LineChart>
    </ResponsiveContainer>
      </div>
      
      <div className="bg-white rounded-md border border-1 h-[450px] mt-2 w-[95%]">
        <div className="grid grid-rows-4 gap-3 m-6">
        <div className="flex justify-between">
        <h2 className="border-dashed border-b border-gray-400">Total Sales</h2>
        <Link href="/" className="text-blue-500">View report</Link>
        </div>
        <div className="flex justify-between">
        <h1 className="font-bold text-2xl">₹816745,98</h1>
        <span className="font-bold text-2xl">-</span>
        </div>
        <div className="flex justify-between">
        <h3>Draft Orders</h3>
        <span>7854,787  <span>-</span></span>
       
        </div>
        <div>
        <span className="border-dashed border-b border-gray-400">Sales Over Time</span>
        </div>
        </div>

        
        <ResponsiveContainer height={200} width="100%" className="pr-2">
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis  axisLine={false}/>
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="value" name="Value" stroke="#8884d8" curve="basis" />
      </LineChart>
    </ResponsiveContainer>
      </div>
      <div className="bg-white rounded-md border border-1 h-[450px] mt-2 w-[95%]">
        <div className="grid grid-rows-4 gap-3 m-6">
        <div className="flex justify-between">
        <h2 className="border-dashed border-b border-gray-400">Total Sales</h2>
        <Link href="/" className="text-blue-500">View report</Link>
        </div>
        <div className="flex justify-between">
        <h1 className="font-bold text-2xl">₹816745,98</h1>
        <span className="font-bold text-2xl">-</span>
        </div>
        <div className="flex justify-between">
        <h3>Draft Orders</h3>
        <span>7854,787  <span>-</span></span>
       
        </div>
        <div>
        <span className="border-dashed border-b border-gray-400">Sales Over Time</span>
        </div>
        </div>

        
        <ResponsiveContainer height={200} width="100%" className="pr-2">
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis  axisLine={false}/>
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="value" name="Value" stroke="#8884d8" curve="basis" />
      </LineChart>
    </ResponsiveContainer>
      </div>
      <div className="bg-white rounded-md border border-1 h-[450px] mt-2 w-[95%]">
        <div className="grid grid-rows-4 gap-3 m-6">
        <div className="flex justify-between">
        <h2 className="border-dashed border-b border-gray-400">Total Sales</h2>
        <Link href="/" className="text-blue-500">View report</Link>
        </div>
        <div className="flex justify-between">
        <h1 className="font-bold text-2xl">₹816745,98</h1>
        <span className="font-bold text-2xl">-</span>
        </div>
        <div className="flex justify-between">
        <h3>Draft Orders</h3>
        <span>7854,787  <span>-</span></span>
       
        </div>
        <div>
        <span className="border-dashed border-b border-gray-400">Sales Over Time</span>
        </div>
        </div>

        
        <ResponsiveContainer height={200} width="100%" className="pr-2">
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis  axisLine={false}/>
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="value" name="Value" stroke="#8884d8" curve="basis" />
      </LineChart>
    </ResponsiveContainer>
      </div>
      <div className="bg-white rounded-md border border-1 h-[450px] mt-2 w-[95%]">
        <div className="grid grid-rows-4 gap-3 m-6">
        <div className="flex justify-between">
        <h2 className="border-dashed border-b border-gray-400">Total Sales</h2>
        <Link href="/" className="text-blue-500">View report</Link>
        </div>
        <div className="flex justify-between">
        <h1 className="font-bold text-2xl">₹816745,98</h1>
        <span className="font-bold text-2xl">-</span>
        </div>
        <div className="flex justify-between">
        <h3>Draft Orders</h3>
        <span>7854,787  <span>-</span></span>
       
        </div>
        <div>
        <span className="border-dashed border-b border-gray-400">Sales Over Time</span>
        </div>
        </div>

        
        <ResponsiveContainer height={200} width="100%" className="pr-2">
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis  axisLine={false}/>
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="value" name="Value" stroke="#8884d8" curve="basis" />
      </LineChart>
    </ResponsiveContainer>
      </div>
      <div className="bg-white rounded-md border border-1 h-[450px] mt-2 w-[95%]">
        <div className="grid grid-rows-4 gap-3 m-6">
        <div className="flex justify-between">
        <h2 className="border-dashed border-b border-gray-400">Total Sales</h2>
        <Link href="/" className="text-blue-500">View report</Link>
        </div>
        <div className="flex justify-between">
        <h1 className="font-bold text-2xl">₹816745,98</h1>
        <span className="font-bold text-2xl">-</span>
        </div>
        <div className="flex justify-between">
        <h3>Draft Orders</h3>
        <span>7854,787  <span>-</span></span>
       
        </div>
        <div>
        <span className="border-dashed border-b border-gray-400">Sales Over Time</span>
        </div>
        </div>

        
        <ResponsiveContainer height={200} width="100%" className="pr-2">
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis  axisLine={false}/>
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="value" name="Value" stroke="#8884d8" curve="basis" />
      </LineChart>
    </ResponsiveContainer>
      </div>
      </div>
      
    </div>
  );
};

export default App;
