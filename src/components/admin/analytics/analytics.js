'use client'
import React, { useState } from 'react';
import { DatePicker, Space } from 'antd';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import Link from "next/link"

const { RangePicker } = DatePicker;

const App = () => {
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
      <div className="grid grid-cols-3">
      <div className="bg-white rounded-md border border-1 h-[500px] mt-2 w-[95%]">
        <div className="grid grid-rows-4 gap-3 m-8">
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

        
        <ResponsiveContainer height={200} width="100%" className="ml-0" align="center">
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
      
      <div className="bg-white rounded-md border border-1 h-[500px] mt-2 w-[95%]">
        <div className="grid grid-rows-4 gap-3 m-8">
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

        
        <ResponsiveContainer height={200} width="100%" className="ml-0">
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
      <div className="bg-white rounded-md border border-1 h-[500px] mt-2 w-[95%]">
        <div className="grid grid-rows-4 gap-3 m-8">
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

        
        <ResponsiveContainer height={200} width="100%" className="ml-0">
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
      <div className="bg-white rounded-md border border-1 h-[500px] mt-2 w-[95%]">
        <div className="grid grid-rows-4 gap-3 m-8">
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

        
        <ResponsiveContainer height={200} width="100%" className="ml-0">
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
      <div className="bg-white rounded-md border border-1 h-[500px] mt-2 w-[95%]">
        <div className="grid grid-rows-4 gap-3 m-8">
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

        
        <ResponsiveContainer height={200} width="100%" className="ml-0">
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
      <div className="bg-white rounded-md border border-1 h-[500px] mt-2 w-[95%]">
        <div className="grid grid-rows-4 gap-3 m-8">
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

        
        <ResponsiveContainer height={200} width="100%" className="ml-0">
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
