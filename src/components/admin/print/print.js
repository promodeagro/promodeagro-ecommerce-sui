'use client'
import React, { useState, useEffect } from 'react';
import { DownOutlined } from '@ant-design/icons';
import { Button, Dropdown, Space, Form, Modal, Input } from 'antd';
import html2pdf from 'html2pdf.js';
import { useRouter } from "next/navigation";
import axios from "@/Api/axios";

const ProductList = () => {
    const [products, setProducts] = useState([]);
   
    const [form] = Form.useForm();    const [searchValue, setSearchValue] = useState('');

    const handleShare = () => {
      router.push("/admin/Share"
    );
    };
    const router = useRouter();

    // useEffect(() => {
    //     const fetchData = async () => {
    //         try {
    //             const result = await fetchProducts();
    //             setProducts(result.data.listProducts.items);
    //         } catch (error) {
    //             console.error("Error fetching products:", error);
    //         }
    //     };

    //     fetchData();
    // }, []);
    useEffect(() => {
        const fetchData = async () => {
            if(typeof window !== 'undefined'){
              try {
                const result = await axios.get("/product");
                  setProducts(result.data);
              } catch (error) {
                  console.error("Error fetching products:", error);
              }
            }
        };

        fetchData();
    }, []);


    const handlePrint = (category) => {
        const filteredProducts = category ? products.filter((product) => product.category === category) : products;

        const printWindow = window.open('', '_blank');
        printWindow.document.write(`
            <html>
            <head>
                <title>Product List</title>
                <style>
                body {
                  font-family: Arial, sans-serif;
                  margin: 0;
                }
      
                .product-list {
                  display: grid;
                  grid-template-columns: repeat(5, 1fr); /* Adjust the number of columns as needed */
                  gap: 8px; /* Adjust the gap between columns */
                  flex-wrap: wrap;
                  justify-content: flex-start;
                  margin: 0;
                  padding: 0;
                  margin-left: 10px;
                }
                
      
                .product-card {
                
                  margin: 5px;
                  padding: 5px;
                  text-align: center;
                  width: calc(33.33% - 20px);

                  box-sizing: border-box;
                  border-radius: 2px;
                
                }
      
                .product-image {
                  max-width: 150px;
                  max-height: 150px;
                  border: 1px solid #ddd;
                  border-radius: 5px;
                  margin-bottom: 5px;
                }
      
                .product-details {
                  margin-top: 10px;
                }
      
                .product-name {
                  font-size: 16px;
                  margin-bottom: 5px;
                }
      
                .product-price {
                  font-size: 14px;
                  color: blue;
                }
              </style>
            </head>
            <body>
              <div class="product-list">
        `);
      
        filteredProducts.forEach((product, index) =>  {
          printWindow.document.write(`
            <div class="product-card">
      <Image
        src=${product.image}
        alt=${product.name}
        class="product-image"
        height=${200} // Adjust the height as needed
        width=${200}  // Adjust the width as needed
        style={{ borderRadius: 10 }}
      />
      <div class="product-details ml-5">
        <h3 class="product-name">${product.name}</h3>
        <p class="product-price">Price:₹${product.price}</p>
        <p class="product-unit">Unit:${product.unit}</p>

      </div>
    </div>
          `);
        });
      
        printWindow.document.write(`
              </div>
            </body>
          </html>
        `);
      
        printWindow.document.close();
      
        // Wait for images to load before triggering the print

        printWindow.addEventListener('load', () => {
          printWindow.print();
        });
      };

      // console.log(products)
  //};


  const items = [
    {
        label: 'All Products',
        key: '1',
        onClick: () => handlePrint(),
    },
    {
        label: 'Fruits',
        key: '2',
        onClick: () => handlePrint('FRUITS'),
    },
    {
        label: 'Leafy Vegetables',
        key: '3',
        onClick: () => handlePrint('LEAFY_VEGETABLES'),
    },
    {
        label: 'Vegetables',
        key: '4',
        onClick: () => handlePrint('VEGETABLES'),
    },
];

const menuProps = {
    items,
};

return (
  <div className=" md:flex flex-col product-list-container">
      {/* Print button with categories */}
      <Space>
          <Dropdown menu={menuProps}>
              <Button className='h-9 border-black'>
                  <Space>
                      Print
                      <DownOutlined />
                  </Space>
              </Button>
          </Dropdown>
          <button
              key="link"
              className="bg-black text-white rounded-md px-8 py-2"
              onClick={handleShare}
          >
              Share
          </button>
      </Space>

   
     
  </div>
);
};

export default ProductList;

