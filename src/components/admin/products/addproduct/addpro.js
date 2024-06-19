"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useDispatch } from "react-redux";
import Image from "next/image";
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
} from "antd";
import {
  ArrowLeftOutlined,
  LoadingOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { useRouter } from "next/navigation";
import axios from "@/Api/axios";
import { setCreateProduct } from "@/redux/slices/addProductSlice";
const { Option } = Select;
const { TextArea } = Input;

// Function to convert file to base64
const getBase64 = (img, callback) => {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result));
  reader.readAsDataURL(img);
};

const beforeUpload = (file) => {
  const isPngOrJpeg = file.type === "image/png" || file.type === "image/jpeg";
  if (!isPngOrJpeg) {
    message.error("You can only upload PNG or JPEG files!");
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error("Image must be smaller than 2MB!");
  }
  return isPngOrJpeg && isLt2M;
};

const config = {
  rules: [
    {
      type: "object",
      message: "Please select time!",
    },
  ],
};

const Addproduct = () => {
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState();
  const [formData, setFormData] = useState({
    availability: "",
    brand: "",
    category: "",
    description: "",
    image: null,
    name: "",
    price: "",
    currency: "",
    unit: "",
    imageType: "",
  });

  const handleChange = (info) => {
    if (info.file.status === "uploading") {
      setLoading(true);
      return;
    }
    if (info.file.status === "done") {
      getBase64(info.file.originFileObj, (url) => {
        setLoading(false);
        setImageUrl(url);
        const base64Data = url.split(",")[1];
        setFormData({ ...formData, image: base64Data });
        console.log("Base64 Image:", base64Data);
      });
    }
  };

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </div>
  );

  const onFinish = (fieldsValue) => {
    const values = {
      ...fieldsValue,
      "date-time-picker": fieldsValue["date-time-picker"].format(
        "YYYY-MM-DD HH:mm:ss"
      ),
    };
    console.log("Received values of form: ", values);
  };

  const dispatch = useDispatch();
  const router = useRouter();

  const handleInputChange = (e) => {
    if (e && e.target) {
      const { name, value } = e.target;
      setFormData({ ...formData, [name]: value });
    } else {
      console.log("Event or event target is undefined");
    }
  };

  const handleDropDownChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleFormSubmit = async () => {
    const data = {
      availability: formData.availability,
      brand: formData.brand,
      category: formData.category,
      description: formData.description,
      image: formData.image,
      name: formData.name,
      price: formData.price,
      currency: formData.currency,
      unit: formData.unit,
      imageType: formData.imageType,
    };
    console.log("Submitting Data: ", data);
    try {
      const response = await axios.post("/product", data);
      if (response.status === 200) {
        dispatch(setCreateProduct(data));
        console.log(response);
        router.push("/admin/products");
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  const backToProducts = () => {
    router.push("/admin/products");
  };

  return (
    <div className="p-8 flex flex-col ">
      <header className="flex gap-5">
        <ArrowLeftOutlined
          className="text-lg font-semibold"
          onClick={backToProducts}
        />
        <h1 className="font-bold text-2xl">Add Product</h1>
      </header>
      <main className="flex gap-8 justify-center">
        <section className="w-[50%]">
          {/* title and description form  */}
          <Form
            requiredMark={false}
            className="border-2 font-semibold bg-white w-full shadow-md px-8 py-5 rounded-xl"
            layout="vertical"
            name="basic"
            labelCol={{
              span: 8,
            }}
            initialValues={{
              remember: true,
            }}
            onFinish={handleFormSubmit}
          >
            <Form.Item
              label="Title"
              name="name"
              rules={[
                {
                  required: true,
                  message: "Please input Title of the product!",
                },
              ]}
            >
              <Input
                name="name"
                placeholder="Short sleeve t-shirt"
                className="border border-black"
                onChange={handleInputChange}
              />
            </Form.Item>
            <Form.Item label="Description" name="description">
              <TextArea
                name="description"
                rows={5}
                className="border border-black"
                placeholder="Mention the description of your Product here!"
                onChange={handleInputChange}
              />
            </Form.Item>
          </Form>

          {/* image upload code */}
          <div className="border-2 shadow-md h-[15rem] w-full  bg-white px-8 pt-3 mt-5 rounded-xl">
            <Form
          requiredMark={false}
            >
          <Col span={26}>
              <Form.Item
                label="Image Type"
                name="imageType"
                rules={[
                  {
                    required: true,
                    message: "Please input Image Type!",
                  },
                ]}
              >
                <Select
                  className="border rounded-md border-black"
                  placeholder="Select a option for Image Type"
                  onChange={(value) => handleDropDownChange("imageType", value)}
                  name="imageType"
                  allowClear
                >
                  <Option value="image">image</Option>
                  <Option value="png">png</Option>
                </Select>
              </Form.Item>
            </Col>
            </Form>
            <h1 className="text-md font-semibold mt-1">Media</h1>
            <div className="pl-[40%]">
              <Upload
                name="image"
                listType="picture-card"
                className="avatar-uploader"
                showUploadList={false}
                beforeUpload={beforeUpload}
                onChange={handleChange}
              >
                {imageUrl ? (
                  <Image
                    src={imageUrl}
                    alt="avatar"
                    width={100}
                    height={100}
                    style={{ width: "100%" }}
                  />
                ) : (
                  uploadButton
                )}
              </Upload>
            
            </div>
            <p className="pl-[30%]">Accepts images of type PNG/Image</p>

          </div>

          {/* pricing form code */}
          <div className="border-2 shadow-md w-full h-[19.5rem] bg-white px-8 pt-3 mt-5 rounded-xl">
            <h1 className="text-md font-semibold mt-1">Pricing</h1>
            <Form
              requiredMark={false}
              layout="vertical"
              labelCol={{
                span: 20,
              }}
            >
              <Row gutter={20}>
                <Col span={12}>
                  <Form.Item
                    label="Category"
                    name="category"
                    rules={[
                      {
                        required: true,
                        message: "Please input Category!",
                      },
                    ]}
                  >
                    <Select
                      className="border rounded-md border-black"
                      placeholder="Select a option for Category"
                      onChange={(value) =>
                        handleDropDownChange("category", value)
                      }
                      name="category"
                      allowClear
                    >
                      <Option value="VEGETABLES">VEGETABLES</Option>
                      <Option value="LEAFY_VEGETABLES">LEAFY_VEGETABLES</Option>
                      <Option value="FRUITS">FRUITS</Option>
                      <Option value="TESTING">TESTING</Option>
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    label="Brand"
                    name="brand"
                    rules={[
                      {
                        required: true,
                        message: "Please input Brand!",
                      },
                    ]}
                  >
                    <Input
                      name="brand"
                      placeholder="brand"
                      className="border border-black"
                      onChange={handleInputChange}
                    />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={20}>
                <Col span={12}>
                  <Form.Item
                    label="Unit"
                    name="unit"
                    rules={[
                      {
                        required: true,
                        message: "Please input Unit!",
                      },
                    ]}
                  >
                    <Select
                      className="border rounded-md border-black"
                      placeholder="Select a option for UNIT"
                      onChange={(value) => handleDropDownChange("unit", value)}
                      name="unit"
                      allowClear
                    >
                      <Option value="kg">KG</Option>
                      <Option value="piece">PIECE</Option>
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    label="Availability"
                    name="availability"
                    rules={[
                      {
                        required: true,
                        message: "Please input the availability!",
                      },
                    ]}
                  >
                    <Select
                      className="border rounded-md border-black"
                      placeholder="Select a option for availability"
                      onChange={(value) =>
                        handleDropDownChange("availability", value)
                      }
                      name="availability"
                      allowClear
                    >
                      <Option value="in stock">in stock</Option>
                      <Option value="out of stock">out of stock</Option>
                    </Select>
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={20}>
                <Col span={12}>
                  <Form.Item
                    label="Currency"
                    name="currency"
                    rules={[
                      {
                        required: true,
                        message: "Please input currency!",
                      },
                    ]}
                  >
                    <Input
                      name="currency"
                      placeholder="currency"
                      className="border border-black"
                      onChange={handleInputChange}
                    />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    label="Price"
                    name="price"
                    rules={[
                      {
                        required: true,
                        message: "Please input Price!",
                      },
                    ]}
                  >
                    <Input
                      name="price"
                      placeholder="Price"
                      className="border border-black"
                      onChange={handleInputChange}
                    />
                  </Form.Item>
                </Col>
              </Row>
            </Form>
          </div>
        </section>
        <section className="w-[25%]">
          <div className="border-2 shadow-md h-[6.75rem] bg-white px-8 pt-3 rounded-xl">
            <h1 className="text-md font-semibold mt-1">Status</h1>
            <Form className="mt-2 border-black">
              <Form.Item>
                <Select>
                  <Select.Option value="active">Active</Select.Option>
                  <Select.Option value="draft">Draft</Select.Option>
                </Select>
              </Form.Item>
            </Form>
          </div>
          <div className="border-2 shadow-md h-[20rem] bg-white px-8 pt-3 mt-5 rounded-xl">
            <h1 className="text-md font-semibold mt-1">Publishing</h1>
            <p className="font-semibold">Sales channels</p>
            <ul>
              <li type="circle">
                Online Store
                <Form
                  name="time_related_controls"
                  onFinish={onFinish}
                  style={{
                    maxWidth: 600,
                  }}
                >
                  <Form.Item
                    labelWrap
                    name="date-time-picker"
                    label="Schedule"
                    {...config}
                  >
                    <DatePicker
                      showTime={{ format: "HH:mm:ss" }}
                      format="YYYY-MM-DD HH:mm:ss"
                      placeholder="Enter the date and time"
                    />
                  </Form.Item>
                </Form>
              </li>
              <li type="circle">
                Point of Sale
                <p>
                  Point of Sale has not been set up. Finish the remaining steps
                  to start selling in person.
                </p>
              </li>
              <Link href="/" className="text-blue-600 underline">
                Learn more
              </Link>
            </ul>
            <br />
            <p className="font-semibold">Markets</p>
            <ul>
              <li type="circle">India and International</li>
            </ul>
          </div>
        </section>
      </main>
      <br />
      <br />
      <div className="flex">
        <Button
          type="primary"
          style={{
            color: "white",
            backgroundColor: "black",
            borderRadius: "5px",
            width: "40%",
          }}
          onClick={handleFormSubmit}
          className="ml-44"
        >
          Submit
        </Button>
      </div>
    </div>
  );
};

export default Addproduct;
