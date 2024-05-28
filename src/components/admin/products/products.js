"use client";
import React, { useRef, useState, useEffect } from "react";
import {
  SearchOutlined,
  EditOutlined,
  PlusOutlined,
  DeleteOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import {
  Button,
  Input,
  Form,
  Upload,
  Space,
  Table,
  Popconfirm,
  Checkbox,
  Modal,
  Select,
} from "antd";
import Highlighter from "react-highlight-words";
import ImportButton from "./importButton";
import { addToAdminCart } from "@/redux/slices/admincartSlice";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Radio } from "antd";
import { setAllProducts } from "@/redux/slices/products";
import ProductList from "../print/print";
import { useDispatch } from "react-redux";
import axios from "@/Api/axios";
import Image from "next/image";
const getBase64 = (img, callback) => {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
};
const beforeUpload = (file) => {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    message.error('You can only upload JPG/PNG file!');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!');
  }
  return isJpgOrPng && isLt2M;
};
const Products = () => {
  const dispatch = useDispatch();
  const { Option } = Select;
  const [imageUrl, setImageUrl] = useState(); // Define imageUrl state variable
  const [openExportModal, setOpenExportModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [editedData, setEditedData] = useState({});
  // const [selectedRows, setselectedRows] = useState([]);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [products, setProducts] = useState([]);
  const [selectedCount, setSelectedCount] = useState(0);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      if(typeof window !== 'undefined'){
        try {
          const result = await axios.get("/product");
          console.log("products", result);
          setProducts(result.data);
          dispatch(setAllProducts(result.data));
          // console.log(result.data)
        } catch (error) {
          console.error("Error fetching products:", error);
        }
      }
    };

    fetchData();
  }, [dispatch]);

  useEffect(() => {
    const updatedCart = products.filter((product) => product.selected);
    setCart(updatedCart);
  }, [products]); // Only include products in the dependency array

  useEffect(() => {
    setSelectedCount(cart.length);
  }, [cart]); // Only include cart in the dependency array

  const showModalForEdit = (record) => {
    setOpen(true);
    setOpenEditModal(true);
    console.log("Editing product:", record);
    setEditingProduct(record);
    setEditedData(record);
    setImageUrl(record.image);
  };
  const handleSaveForEdit = async () => {
    console.log("Saving edited data:", editedData);
    
    try {
      // Make the API call to update the product
      const response = await putRequest(editedData);
      console.log("success", response);
      const updatedProducts = products.map(product =>
        product.id === editedData.id ? editedData : product
      );
      setProducts(updatedProducts);
      setOpenEditModal(false);
    } catch (error) {
      console.log("error", error);
      // Handle error, show error message or handle it in a way appropriate to your application
    }
  };
  
  
  const putRequest = async (values) => {
    let data = {
      id: values.id,
      name: values.name,
      price: values.price,
      image: values.image,
      description: values.description,
      category: values.category,
      availability: values.availability,
      brand: values.brand,
      unit: values.unit,
      currency: values.currency,
    };
    try {
      console.log("stored data", data);
      const response = await axios.put("/product", data);
      console.log("success", response);
    } catch (error) {
      console.log("error", error);
    }
  };

  const handleCancelForEdit = () => {
    setOpenEditModal(false);
  };

  const isEditing = (record) => record === editingProduct;
  const router = useRouter();
  const [radio1, setradio1] = useState(1);
  const onChangeRadio1 = (e) => {
    console.log("radio checked", e.target.value);
    setradio1(e.target.value);
  };
  const [radio2, setradio2] = useState(1);
  const onChangeRadio2 = (e) => {
    console.log("radio checked", e.target.value);
    setradio2(e.target.value);
  };

  const AddProducts = () => {
    router.push("/admin/products/addproduct");
  };
  const handleDeleteItem = async () => {
    try {
      console.log("Deleting product");
      const response = await axios.delete("/product");
      console.log("Success", response.data);
      // Remove the deleted customer from the state
      // setProducts(products.filter)
      // setProducts(products.filter(product => product.id !== id));
    } catch (error) {
      console.log("Error deleting customer", error);
    }
  };
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const [open, setOpen] = useState(false);
  const searchInput = useRef(null);
  const showModal = () => {
    setOpen(true);
    setOpenExportModal(true);
  };
  const handleOk = () => {
    setTimeout(() => {
      setOpen(false);
      setOpenExportModal(true);
    }, 3000);
  };
  const handleCancel = () => {
    setOpenExportModal(false);
  };

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
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
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: "block",
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
          color: filtered ? "#1677ff" : null,
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
            backgroundColor: "#ffc069",
            padding: 0,
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });
  const handleCheckboxChange = (record, checked) => {
    const updatedProducts = products.map((product) =>
      product === record ? { ...product, selected: checked } : product
    );
    setProducts(updatedProducts); // Update products state with the selected record

    if (checked) {
      dispatch(addToAdminCart(record)); // Dispatch the selected record to admincart
    } else {
      // Remove the record from admincart
      const updatedCart = cart.filter((item) => item !== record);
      dispatch(setAllProducts(updatedCart)); // Update the state of admincart
    }
  };

  const uploadButton = (
    <button
      style={{
        border: 0,
        background: 'none',
      }}
      type="button"
      >
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </button>
  );
  const columns = [
    {
      title: () => (
        <Checkbox
          onChange={(e) => {
            const checked = e.target.checked;
            const updatedProducts = products.map((product) => ({
              ...product,
              selected: checked,
            }));
            setProducts(updatedProducts);

            if (checked) {
              dispatch(addToAdminCart(updatedProducts)); // Dispatch all selected products to admincart
            } else {
              dispatch(setAllProducts([])); // Clear the admincart if all checkboxes are unchecked
            }
          }}
          checked={products.every((product) => product.selected)}
          />
          ),
          width: "5%",
          render: (_, record) => (
        <Checkbox
          checked={record.selected}
          onChange={(e) => handleCheckboxChange(record, e.target.checked)}
        />
      ),
    },
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      width: "10%",
      render: (image) => (
        <Image unoptimized src={image} alt="Product" width={60} height={60} />
      ),
    },

    {
      title: "Product",
      dataIndex: "name",
      key: "name",
      width: "16%",
      ...getColumnSearchProps("name"),
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
      width: "16%",
      render: (category) => `${category}`,
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      width: "10%",
      render: (price) => `$${price}`,
    },
    {
      title: "Unit",
      dataIndex: "unit",
      key: "unit",
      width: "10%",
      render: (unit) => `${unit}`,
    },
    {
      title: "Action",
      key: "action",
      width: "8%",
      render: (text, record) => (
        <Space size="middle">
          <button onClick={() => showModalForEdit(record)}>
            <EditOutlined /> Edit
          </button>
        <span style={{ marginLeft: 8 }}></span> {/* Add space between icons */}
          <Popconfirm 
          title="Are you sure to delete this Product?"
          onConfirm={() => handleDeleteItem()}
          okText="Yes"
          cancelText="No"
        >
          <DeleteOutlined style={{ color: "red", cursor: "pointer" }} />
        </Popconfirm>
        </Space>
      ),
    },
  ];
  
  const handleChange = (info) => {
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, (url) => {
        console.log("my image url",imageUrl)
        setEditedData({ ...editedData, image: url });
        setImageUrl(url);
      });
    }

  };
  return (
    <div>
      <header className="flex justify-between items-center mt-4  ">
        <h1 className="font-bold text-2xl">Products</h1>

        <div className="flex gap-3 px-5">
          <button
            style={{
              backgroundColor: "#E3E3E3",
              borderRadius: "5px",
              padding: "8px 15px 8px 15px",
            }}
            onClick={showModal}
            >
            Export
          </button>
          <ImportButton />
          <ProductList />
          {/* <Link href="/admin/products/addproduct"> */}

          <button
            key="link"
            // className="md:text-sm bg-black text-white rounded-md px-8 py-2"
            
            className="bg-black text-white rounded-md px-8 py-2 "
            onClick={AddProducts}
          >
            Add Product
          </button>
          <Link href="/admin/products/adminCart">
            <div className="bg-[#E3E3E3] p-2 px-3 rounded-md flex justify-center items-center">
              <ShoppingCartOutlined className="text-xl font-bold" />
            </div>
          </Link>
        </div>
        <Modal
          open={openExportModal}
          title="Export products"
          onOk={handleOk}
          onCancel={handleCancel}
          footer={[
            <Button key="back" className="shadow-lg" onClick={handleCancel}>
              Cancel
            </Button>,
            <Button
              key="Cancel"
              className="bg-black text-white"
              onClick={handleOk}
            >
              Export Products
            </Button>,
          ]}
        >
          <hr></hr>
          <div className="mt-5 mb-5">
            <p>
              This CSV file can update all product information. To update just
              inventory quantities use the{" "}
              <Link href="/" className="text-blue-500 underline">
                CSV file for inventory.
              </Link>
            </p>

            <div className="m-5">
              <div className="mb-5">
                <Space direction="vertical">
                  <h5>Export</h5>

                  <Radio.Group
                    onChange={onChangeRadio1}
                    value={radio1}
                    defaultValue="A"
                  >
                    <Space direction="vertical">
                      <Radio value="A">Current Page</Radio>
                      <Radio value="B">All products</Radio>
                      <Radio value="C" disabled>
                        Selected:0 products
                      </Radio>
                      <Radio value="D" disabled>
                        1 product matching your search{" "}
                      </Radio>
                    </Space>
                  </Radio.Group>
                </Space>
              </div>
              <div className="mb-5">
                <Space direction="vertical">
                  <h5>Export as</h5>
                  <Radio.Group
                    onChange={onChangeRadio2}
                    value={radio2}
                    defaultValue="E"
                  >
                    <Space direction="vertical">
                      <Radio value="E">
                        CSV for Excel,Numbers,or other spreadsheet programs
                      </Radio>
                      <Radio value="F">Plain CSV file</Radio>
                    </Space>
                  </Radio.Group>
                </Space>
              </div>
            </div>
            <p>
              Learn more about{" "}
              <Link href="/" className="text-blue-400 underline">
                exporting products to CSV file
              </Link>{" "}
              or the{" "}
              <Link href="/" className="text-blue-400 underline">
                bulk editor.
              </Link>
            </p>
          </div>
          <hr></hr>
        </Modal>
        <Modal
          title="Title"
          open={openEditModal}
          onCancel={handleCancelForEdit}
          footer={[
            <button
              key="save"
              className="bg-black text-white px-8 py-2 rounded-lg"
              onClick={handleSaveForEdit}
            >
              Save
            </button>,
          ]}
        >
          <div className="">
            <Form layout="vertical">
              <Form.Item label="Image">
                <Upload
                  name="image"
                  listType="picture-card"
                  className="avatar-uploader"
                  showUploadList={false}
                  // action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
                  beforeUpload={beforeUpload}
                  onChange={handleChange}
                >
                  {imageUrl ? (
                    <Image
                    width={imageUrl ? 100 : null} // Set width if imageUrl is available
                    height={imageUrl ? 100 : null} 
                      src={imageUrl}
                      unoptimized
                      alt="image"
                      style={{ width: "auto",height:"auto" }}
                    />
                  ) : (
                    uploadButton
                  )}
                </Upload>
              </Form.Item>
              <Form.Item label="Product">
                <Input
                  value={editedData.name}
                  onChange={(e) =>
                    setEditedData({ ...editedData, name: e.target.value })
                  }
                />
              </Form.Item>

              <Form.Item
                label="Category"
                // name="category"
                rules={[
                  {
                    required: true,
                    message: "Please select Category!",
                  },
                ]}
              >
                <Select
                  className="rounded-md border-none"
                  placeholder="Select a option for Category"
                  value={editedData.category}
                  onChange={(value) =>
                    setEditedData({ ...editedData, category: value })
                  }
                  allowClear
                >
                  <Option value="VEGETABLES">VEGETABLES</Option>
                  <Option value="LEAFY_VEGETABLES">LEAFY_VEGETABLES</Option>
                  <Option value="FRUITS">FRUITS</Option>
                  <Option value="TESTING">TESTING</Option>
                </Select>
              </Form.Item>
              <Form.Item label="Price">
                <Input
                  value={editedData.price}
                  onChange={(e) =>
                    setEditedData({ ...editedData, price: e.target.value })
                  }
                />
              </Form.Item>

              <Form.Item
                label="Unit"
                // name="unit"
                rules={[
                  {
                    required: true,
                    message: "Please input Unit!",
                  },
                ]}
              >
                <Select
                  className="rounded-md border-none"
                  placeholder="Select a option for UNIT"
                  value={editedData.unit}
                  onChange={(value) =>
                    setEditedData({ ...editedData, unit: value })
                  }
                  // name="unit"
                  allowClear
                >
                  <Option value="kg">KG</Option>
                  <Option value="piece">PIECE</Option>
                </Select>
              </Form.Item>
            </Form>
          </div>
        </Modal>
      </header>
      <br />
      <div>
        <button className="border-2 rounded-lg p-3">
          {selectedCount} Items Added to Cart
        </button>
      </div>
      <Table
        className="mt-5 mr-3"
        columns={columns}
        dataSource={products}
        pagination={false}
        scroll={{ x: 0, y: 4000 }}
      />
    </div>
  );
};

export default Products;
