"use client";
import React, { useEffect, useRef, useState } from "react";
import { SearchOutlined } from "@ant-design/icons";
import { Button, Input, Space, Table } from "antd";
import Highlighter from "react-highlight-words";
import { useRouter } from "next/navigation";
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { notification } from "antd";
import axios from "@/Api/axios";
export const Share = () => {
  const router = useRouter();
  const [customers, setcustomers] = useState([]);
  const searchInput = useRef(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios.get("/getAllCustomer");
        console.log("customers", result);
        setcustomers(result.data);
        // dispatch(setAllcustomers(result.data));
        console.log(result.data)
      } catch (error) {
        console.error("Error fetching customers:", error);
      }
    };

    fetchData();
  }, []);

  const AddCustomers = () => {


   
    router.push('/admin/Share/addcustomer');
  };

  const [products, setProducts] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios.get("/product");
        console.log("products", result);
        setProducts(result.data);
        // dispatch(setAllProducts(result.data));
        // console.log(result.data)
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchData();
  }, []);
  const urlToBase64 = async (url) => {
    const response = await fetch(url)
    const blob = await response.blob();
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        resolve(reader.result);
      };
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  };
  const [show, setshow] = useState(false);

  const handleShare = async (phoneNumber) => {
    try {
      const pdf = new jsPDF();  
      // Add title
      pdf.text("Synectiks Farm", 10, 10);
      // Add date and time
      const currentDate = new Date().toLocaleDateString();
      const currentTime = new Date().toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      });
      pdf.text(currentDate + ' ' + currentTime, 10, 20);

  
      const columns = ["ID", "Name", "Image", "Price", "Category", "Unit"];
      const rows = await Promise.all(products.map(async (product, index) => {
        const base64Image = await urlToBase64(product.image);
        console.log(base64Image);
        return [
          index + 1,
          product.name,
          base64Image,
          product.price,
          product.category,
          product.unit
        ];
      }));
  
      // Add table using jspdf-autotable
      pdf.autoTable({
        head: [columns],
        body: rows,
        startY: 30,
        didDrawCell: (data) => {
          if (data.section === 'body' && data.column.index === 2) {
            const base64Image = rows[data.row.index][2]; // Fetch base64Image from rows
            pdf.addImage(base64Image, 'PNG', data.cell.x + 2, data.cell.y + 2, 10, 10)
          }
        }
      });
      // Save or send the PDF
      console.log(phoneNumber);
      const base64String = pdf.output('datauristring');
      const prefixLength = "data:application/pdf;filename=generated.pdf;base64,".length;
      const remainingString = base64String.substring(prefixLength);
      await shareProducts(remainingString,phoneNumber);
  
      // Set show state to true after PDF is generated
      setshow(true);
    } catch (error) {
      console.error('Error generating PDF:', error);
      // Show error message
    }
  };
      console.log(products);
  // ------- api fetching------
  const shareProducts = async (content, phoneNumber)=> {
    console.log(phoneNumber);
    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');

  const raw = JSON.stringify({
      content: content,
      name: 'directory',
      phoneNumber: phoneNumber,
    });

    const requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
    };
    try {
      const response = await fetch(
        'https://2evfwh96lk.execute-api.us-east-1.amazonaws.com/sendBills',
        requestOptions,
      ); // Corrected options to requestOptions
      if (response.ok) {
        console.log('Pdf send');
        notification.success({
          message: 'PDF Sent successfully!',
        });
      }
      if (!response.ok) {
        // throw new Error(HTTP error! Status: ${response.status});
      }
      return await response.text();
    } catch (error) {
      console.error(error);
      return null; // Return null or handle the error as needed
    }
  };
  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
        <div
        style={{
          padding: 8,
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: 'block',
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
              
            }}
            className="bg-black text-white hover:bg-black"
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({
                closeDropdown: false,
              });
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? '#1677ff' : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{
           
            padding: 0,
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ) : (
        text
      ),
  });

  const columns = [
    {
      ...getColumnSearchProps("name"),
      title: "Customer name",
      dataIndex: "name",
      key: "name",
      width: 50,
      render: (name,record) => (
        <div>
          {name}
          <button
             onClick={() =>{ handleShare(record.phone)
              console.log(record.phone);
             }}
             className="border border-black text-xs m-1 rounded-md px-2 py-1 float-end hover:bg-gray-200" >
             <p>Share</p>
       </button>
        </div>
      )
    }
  ];
      return (
        <div>
          <button
            key="link"
          
            className="bg-black m-10 float-end text-white rounded-md px-4 py-1"
            // loading={loading}
            onClick={AddCustomers}
            
          >
            Add New Customer
          </button>
          
      <Table
      
      // rowSelection={{
      //   ...rowSelection,
      // }}
      columns={columns}
      dataSource={customers}
      pagination={false}
      scroll={{ x: 0, y: 900 }}
       className="mt-5"
    />
  </div>
);
};
export default Share;