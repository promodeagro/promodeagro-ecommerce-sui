"use client";

import React, { useState,useEffect} from "react";
import {
  Form,
  Input,
  Button,
  message,
  Upload,
  Col,
  Select,
  DatePicker,
  Row,
  notification
} from "antd";
import axios from "@/Api/axios";
import { useRouter } from "next/navigation";
import { ArrowLeftOutlined } from "@ant-design/icons";
const { Option } = Select;
const AddInventory = () => {
  const [products, setProducts] = useState([]);
  const [productOptions, setProductOptions] = useState([]);
  const [form] = Form.useForm(); 


  const router = useRouter();
  const backToInventory = () => {
    router.push("/admin/products/inventory");
  };
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios.get("/product");
        console.log("products", result.data);
        setProducts(result.data);      
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    
    fetchData();
  }, []);
  
  const handleInputChange = (e) => {
    console.log("form data", formData);
    if (e && e.target) {
      const { name, value } = e.target;
      setFormData({ ...formData, [name]: value });
      console.log(name, value, "change");
    } else {
      console.log("Event or event target is undefined");
    }
  };
  useEffect(() => {
    const options = products.map(item => ({ name: item.name, id: item.id }));
    setProductOptions(options);
  }, [products]);
  
  const handleDropDownChange = (name, value) => {
    setFormData({ ...formData, [name]: value }); 
    console.log(name, value, "change");
  };
  

  const [formData, setFormData] = useState({
    productId: "",
    availableQuantity: "",
    unit: "",
  });
  const handleFormSubmit = async () => {
    const data = {
      productId: formData.productId,
      availableQuantity: parseFloat(formData.availableQuantity), // Convert to number
      unit: formData.unit,
    };
    console.log(data, "stored");
    // "Invalid input. "productId" and "availableQuantity" are required and "availableQuantity" must be a number. "unit" must be a non-empty string."
    try {
      console.log("data", data);
      const response = await axios.post("/inventory", data);
      console.log("response", response);
      if (response.status == 200) {
        form.resetFields();
        // dispatch(setCreateProduct(data));
        notification.success({
          message: 'Product added to Inventory Successfully!',
        });
        console.log(formData)
      }
    } catch (error) {
      console.log("error", error);
    }
  };
  return (
    <div className="border-2 flex flex-col shadow-md h-full bg-white px-8 pt-3 mt-5 rounded-xl">
      <header className="flex gap-5">
        <ArrowLeftOutlined
          className="text-lg font-semibold"
          onClick={backToInventory}
        />
        <h1 className="font-bold text-2xl">Add Inventory</h1>
      </header>
      {/* <h1 className="text-md font-semibold mt-1">Add Inventory</h1> */}
      <Form
        requiredMark={false}
        layout="vertical"
        form={form}
        labelCol={{
          span: 20,
        }}
      >
        <Col span={12}>
          <Form.Item
            label="Unit"
            name="unit"
            // onChange={handleDropDownChange}               
            rules={[
              {
                required: true,
                message: "Please input Unit!",
              },
            ]}
          >
            {/* <Input
              name="unit"
              placeholder="unit"
              className="border border-black"
              onChange={handleInputChange}
              type="string"
            /> */}
            <Select
            onChange={(value) => handleDropDownChange("unit", value)}
            name="unit"
              className="border rounded-md border-black"
              placeholder="Select a option for UNIT"
              allowClear
            >
              <Option value="kg">KG</Option>
              <Option value="piece">PIECE</Option>
            </Select>
          
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            label="Availabe Quantity"
            name="availableQuantity"
            rules={[
              {
                required: true,
                message: "Please input the availability!",
              },
            ]}
          >
            <Input
              name="availableQuantity"
              placeholder="Availabe Quantity"
              className="border border-black"
              onChange={handleInputChange}
              type="number"
              value={formData.availableQuantity}
              />
          </Form.Item>
        </Col>

        <Col span={12}>
          <Form.Item
                label="Product"
                name="productId"
                // onChange={handleDropDownChange}
                rules={[
                  {
                    required: true,
                    message: "Please select productId!",
                  },
                ]}
                >
            <Select
            className="rounded-md border-none"
            placeholder="Select a Product"
            onChange={(value) => handleDropDownChange("productId", value)}
            allowClear
            type="string"
          >
            {productOptions.map((option, index) => (
              <Option key={index} value={option.id}>
                {`${option.name} - ${option.id}`}
              </Option>
            ))}
          </Select>
              </Form.Item>
        </Col>
        {/* <Col span={12}>
          <Form.Item
            label="Id "
            name="id"
            rules={[
              {
                required: true,
                message: "Please input Price!",
              },
            ]}
          >
            <Input
              name="id"
              placeholder="ID"
              className="border border-black"
              onChange={handleInputChange}
            />
          </Form.Item>
        </Col> */}
      </Form>
      <div className="flex">
        <Button
          type="primary"
          style={{
            color: "white",
            backgroundColor: "black",
            borderRadius: "5px",
            // padding: "8px 0px 0px 90px",
            width: "50%",
          }}
          onClick={handleFormSubmit}
          className="mb-6 w-full"
        >
          Submit
        </Button>
      </div>
    </div>
  );
};

export default AddInventory;
