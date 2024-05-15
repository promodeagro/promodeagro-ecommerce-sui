"use client";
import React, { useEffect, useRef, useState } from "react";
import { SearchOutlined,EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { Button, Input, Space, Table, Tag, Modal,Form, Popconfirm, Radio } from "antd";
import Highlighter from "react-highlight-words";
import ImportButton from "./importButton";
import { useRouter } from "next/navigation";
import Link from "next/link"
//import { Radio } from 'antd';
// import { useDispatch } from "react-redux";
import axios from "@/Api/axios";
// import { fetchcustomer } from "@/Api/fetchingcustomers";

// import useFetchCustomers from "@/components/customHooks/useFetchCustomers";

// import Addproduct from "./addproduct";


const Customer = () => {
  const [editingProduct, setEditingProduct] = useState(null);
  const [editedData, setEditedData] = useState({});
  // const [selectedRows, setselectedRows] = useState([]);
  const [openEditModal, setOpenEditModal] = useState(false);
  // const [customers, setCustomers] = useState([]);
  const showModalForEdit = (record) => {
    setOpenEditModal(true);
    console.log("Editing product:", record);
    setEditingProduct(record);
    setEditedData(record);
   
  };
  const [customers, setcustomers] = useState([]);
  const [modalClosed, setModalClosed] = useState(false);
  // const { customers, loadings, error } = useFetchCustomers();
  const [radio1, setradio1] = useState(1);
  const handleSaveForEdit = async () => {
    console.log("Saving edited data:", editedData);

    try {
      const response = await putRequest(editedData); // Capture the response
      // Update the customers state with the new data if response status is 200
      if (response.status === 200) {
        const updatedCustomers = customers.map((customer) =>
          customer.id === editedData.id ? editedData : customer
        );
        setcustomers(updatedCustomers);
        setOpenEditModal(false);
      } else {
        // Handle the case when response status is not 200
        console.log("Update failed");
      }
    } catch (error) {
      console.error("Error saving edit:", error);
    }
    

  };

  const putRequest = async (values) => {
    const { id, name, phone } = values;
    console.log("my id ", id);
    try {
      console.log("stored data", values);
      const response = await axios.put(`/updateCustomer/${id}`, { name, phone });
      console.log("success", response);
      return response; // Return the response
    } catch (error) {
      console.log("error", error);
      throw error; // Re-throw the error
    }
  };
  


  const handleCancelForEdit = () => {
    setOpenEditModal(false);
  };
  
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
  const onChangeRadio1 = (e) => {
    console.log('radio checked', e.target.value);
    setradio1(e.target.value);
  };
  const [radio2, setradio2] = useState(1);
  const onChangeRadio2 = (e) => {
    console.log('radio checked', e.target.value);
    setradio2(e.target.value);
  };
  const handleDeleteItem = async (id) => {
    try {
      console.log("Deleting customer");
      const response = await axios.delete(`/deleteCustomerById/${id}`);
      console.log("Success", response);
      // Remove the deleted customer from the state
      setcustomers(customers.filter(customer => customer.id !== id));
    } catch (error) {
      console.log("Error deleting customer", error);
    }
  };
  

  const router = useRouter();
  const AddCustomers = ()=>{
   
    router.push('/admin/customers/addcustomer')
  }
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const searchInput = useRef(null);
  const showModal = () => {
    setOpen(true);
  };
  const handleOk = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setOpen(false);
    }, 3000);
  };
  const handleCancel = () => {
    setOpen(false);
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
    width: 40, // Adjust the width as needed
    render: (name,record) =>(
    <Link 
    href={{
      pathname: '/admin/customers/CustomerDetails',
      query: {
      data:`${record.id}`
      }
    }}
  ><span>{name}</span>
  </Link>
    )
  },
  {
    title: "Phone",
    dataIndex: "phone",
    key: "phone",
    width: 30, // Adjust the width as needed
    render: (phone) => `${phone}`,
  },
  {
    title: "ID",
    dataIndex: "id",
    key: "id",
    width: 50, // Adjust the width as needed
    render: (id) => `${id}`,
  },
  {
    title: "Action",
    key: "action",
    width: 30,
    align: "center", // Align the title in the center
    
    render: (text, record) => (
      <Space size="middle">
        <button onClick={() => showModalForEdit(record)}>
          <EditOutlined /> Edit
        </button>
        <span style={{ marginRight: 8, marginLeft: 8 }}></span> {/* Add space between icons */}
        <Popconfirm 
          title="Are you sure to delete this Customer?"
          onConfirm={() => handleDeleteItem(record.id)}
          okText="Yes"
          cancelText="No"
        >
          <DeleteOutlined style={{ color: "red", cursor: "pointer" }} />
        </Popconfirm>
      </Space>
    ),
  },
  
  ];
 
  

 

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log("selectedRowKeys:", selectedRowKeys);
      console.log("selectedRows:", selectedRows);
    },
  };

  return (
    <>
      <header className="flex justify-between mt-4">
        <h1 className="font-bold text-2xl">Customers</h1>
        <div className="flex gap-3">
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
          {/* <Link href="/admin/customers/addproduct"> */}
          <button
            key="link"
          
            className="bg-black text-white rounded-md px-8 py-2 mr-3"
            loading={loading}
            onClick={AddCustomers}
          >
            Add Customer
          </button>
          {/* </Link> */}
        </div>
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
          
              <Form.Item label="ID">
                <Input
                  value={editedData.id}
                  onChange={(e) =>
                    setEditedData({ ...editedData, id: e.target.value })
                  }
                />
              </Form.Item>
              
              <Form.Item label="Name">
                <Input
                  value={editedData.name}
                  onChange={(e) =>
                    setEditedData({ ...editedData, name: e.target.value })
                  }
                />
              </Form.Item>
              <Form.Item label="Phone">
                <Input
                  value={editedData.phone}
                  onChange={(e) =>
                    setEditedData({ ...editedData, phone: e.target.value })
                  }
                />
              </Form.Item>

             
                
            </Form>
          </div>
        </Modal>
        <Modal
  open={open}
  title="Export customers"
  onOk={handleOk}
  onCancel={handleCancel}
  footer={[
    <Button key="back" className="shadow-lg" onClick={handleCancel}>
      Cancel
    </Button>,
    <Button
      key="Cancel"
      className="bg-black text-white"
      loading={loading}
      onClick={handleOk}
    >
      Export customers
    </Button>,
  ]}
>
  <hr></hr>
  <div className="mt-5">
  
    
      <div className="m-5">
        <div className="mb-5">
          <Space direction="vertical">
          <h5>Export</h5>
 
      <Radio.Group onChange={onChangeRadio1} value={radio1} defaultValue="A">
      <Space direction="vertical">
      <Radio value="A">Current Page</Radio>
        <Radio value="B">All customers</Radio>
        <Radio value="C" disabled>Selected:0 customers</Radio>
      <Radio value="D" disabled>50+ customers matching your search </Radio>
 </Space>

    </Radio.Group>
    </Space>
        </div>
        <div className="mb-5"> 
        <Space direction="vertical">
          <h5>Export as</h5>
    <Radio.Group onChange={onChangeRadio2} value={radio2} defaultValue="E">
      <Space direction="vertical">
      <Radio value="E">CSV for Excel,Numbers,or other spreadsheet programs</Radio>
      <Radio value="F">Plain CSV file</Radio>
     
 </Space>

    </Radio.Group>
    </Space>
   

        </div>
      </div>
      <hr></hr>
  <p className="m-2">Learn more about <Link href="/" className="text-blue-400 underline">exporting customers to CSV file</Link></p>
 
  
  </div>

  
 
  <hr></hr>
  
  
</Modal>
      </header>
      
     
    
      <Table
      
        // rowSelection={{
        //   ...rowSelection,
        // }}
        
        columns={columns}
        dataSource={customers}
        pagination={false}
        scroll={{ x: 1000, y: 900 }}
         className="mt-5 mr-3"
      />
    </>
  );
};

export default Customer;