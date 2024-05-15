'use client';
import { InboxOutlined } from '@ant-design/icons';
import React, { useState,useEffect } from 'react';
import { SearchOutlined,EditOutlined, DeleteOutlined } from "@ant-design/icons";
import Link from 'next/link';
import { Button, Modal,Space, Radio,Table,Form,Input, Popconfirm } from 'antd';
import { useDispatch,useSelector } from 'react-redux';
import { saveOrdersList } from '@/redux/slices/orderSlice';
import { useRouter } from 'next/navigation';
import { useSearchParams } from 'next/navigation';
// import { data } from 'autoprefixer';
import axios from "@/Api/axios";

const Orders = () => {
  const [editingOrders, setEditingOrders] = useState(null);
  const [editedData, setEditedData] = useState({});
  const [openEditModal, setOpenEditModal] = useState(false);
  const [open, setOpen] = useState(false);

  const router = useRouter()
  // const HandlePush = (record)=>{
  //   router.push(
  //    '/admin/orders/summary',
  //  {query:{data:record}})
  // }

  const [filterOption, setFilterOption] = useState('all'); 
  const showModalForEdit = (record) => {
    setOpen(true);
    setOpenEditModal(true);
    console.log("Editing orders:", record);
    setEditingOrders(record);
    setEditedData(record);
  };

  const handleSaveForEdit = () => {
    console.log("Saving edited data:", editedData);
    setEditingOrders(null);
    setEditedData({});
    putRequest(editedData);
    setOpenEditModal(false);
  };

  const putRequest = async (values) => {
    let data = {
      id: values.id,
      createdAt: values.createdAt,
      customerName: values.customerName,
      totalPrice: values.totalPrice,
      paymentMethod: values.paymentMethod,
      status: values.status,
      items: values.items,
      _lastChangedAt: values._lastChangedAt,
    };

    try {
      console.log("stored data", data);
      const response = await axios.put(`/updateOrder/${values.id}`, data); 
      console.log("success", response);
    } catch (error) {
      console.log("error", error);
    }
  };
  
  const searchParams = useSearchParams()
  console.log("data",searchParams.get('data')) 
  const id = searchParams.get('data')
  const order = useSelector((state) => state.ordersData.ordersList); 
    const data = order.filter((item)=>{
    return item.id === id
  })
  console.log('filter value',data);

  const handleFilterOptionChange = (option) => {
    setFilterOption(option);
  };

  const handleCancelForEdit = () => {
    setOpenEditModal(false);
  };

  const filteredOrders = order.filter((item) => {
    if (filterOption === 'all') {
      return true; 
    } else if (filterOption === 'pending') {
      return item.status === 'PENDING';
    } else if (filterOption === 'upi') {
      return item.paymentMethod === 'UPI'; 
    }
    return true;
  });

  const columns = [
    {
      title: 'Order',
      dataIndex: 'id',
      // className: 'text-xs', 
      render: (text, record) => (
      //  <span onClick={()=>HandlePush(record)}>{text}</span>
      <Link
  href={{
    pathname: '/admin/orders/summary',
    query: {
    data:`${record.id}`
    }
  }}
>
  <span>#{text}</span>
      </Link>
        ),
    },
    {
      title: 'Date',
      // className: 'text-xs', 
      dataIndex: 'createdAt',
      key: "createdAt",
      render: (createdAt) => `${createdAt}`,
    },
    {
      title: 'Customer Name',
      // className: 'text-xs', 
      dataIndex: 'customerName',
      key: "customerName",
      render: (customerName) => `${customerName}`,
    },
    {
      title: 'Total Price',
      dataIndex: 'totalPrice',
      key: "totalPrice",
      render: (totalPrice) => `$${totalPrice}`,
    },
    {
      title: 'Payment Method',
      // className: 'text-xs',   
      dataIndex: 'paymentMethod',
      key: "paymentMethod",
      render: (paymentMethod) => `${paymentMethod}`,
    },
    {
      title: 'Order Status',
      // className: 'text-xs',   
      dataIndex: 'status',
      key: "status",
      render: (status) => `${status}`,
    },
    // {
    //   title: 'items',
    //   // className: 'text-xs',   
    //   dataIndex: 'items',
    //   key: "items",
    //   render: (items) => `${items}`,
    // },
    {
      title: 'items',
      // className: 'text-xs',   
      dataIndex: 'items',
      key: "items",
      render: (items) => `${items.length}`,
    },
    {
      title: 'Last changed at',
      // className: 'text-xs',   
      dataIndex: '_lastChangedAt',
      key: "_lastChangedAt",
      render: (_lastChangedAt) => `${_lastChangedAt}`,
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
          <span style={{ marginRight: 8, marginLeft: 8 }}></span> {/* Add space between icons */}
        <Popconfirm 
          title="Want to delete this order?"
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
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [exportOption, setExportOption] = useState('option1');
  //const [orders, setOrders] = useState([]);
  // Correct usage of useSelector
 // const orders = useSelector((state) => state.ordersData.ordersList);

  const dispatch = useDispatch();

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       console.log('fetching');
  //       const result = await FetchOrders();
  //       console.log('result', result);
  //       dispatch(saveOrdersList(result.data.listOrders.items));
  //     } catch (error) {
  //       console.error('Error fetching orders:', error);
  //     }
  //   };

  //   fetchData(); // Call fetchData immediately after defining it
  // }, [dispatch]); // Include dispatch in the dependency array, since it's used inside useEffect

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios.get("/getAllOrders");
        console.log("orders", result);
        console.log("ids",result.data)
        const items = result.data.map((item => item.items))
        console.log("items",items)
        dispatch(saveOrdersList(result.data)); // save fetched data in Redux store
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    fetchData();
  }, [dispatch]);


  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleExportOptionChange = (e) => {
    setExportOption(e.target.value);
  };

  const handleDeleteItem = async (id) => {
    try {
      console.log("Deleting order");
      const response = await axios.delete(`/deleteOrderById/${id}`);
      console.log("Success", response);
      // Remove the deleted customer from the state
      //setcustomers(customers.filter(customer => customer.id !== id));
    } catch (error) {
      console.log("Error deleting order", error);
    }
  };
  
  return (
    <>
      <div className='mr-2 px-'>
        <div className='flex justify-between mt-4 items-center'>
          <div>
            <p className="font-bold text-2xl">Orders</p>
          </div>
          <div className="flex gap-2">
          <>
      <button
      style={{
        backgroundColor: "#E3E3E3",
        borderRadius: "5px",
        padding: "8px 15px 8px 15px",
      }}
        onClick={showModal}
        className='mr-1'
        >
        Export
      </button>
      <Modal
  open={isModalOpen}
  onCancel={handleCancel}
  style={{ padding: 0 }}
  footer={[
    <div key="buttons" style={{ display: 'flex' }} className='justify-center items-end gap-1 mt-6 ml-28'>
      <button className="shadow-lg h-7 rounded-lg border border-gray-200 w-18 px-2" onClick={handleCancel}>
        Cancel
      </button>
      <button className="shadow-lg rounded-lg border border-gray-200 w-48 h-7 px-2">
        Export transaction histories
      </button>
      <button className="bg-gray-800 text-white rounded-lg h-7 w-30 px-2">
        Export orders
      </button>
    </div>
  ]}
>
  <div className='h-10 w-full font-semibold text-slate-800 border-b'>
    <h2 className='text-base font-semibold'>Export Orders</h2>
  </div>
  <div className='py-4'>
    <div>
      <p className='font-medium text-slate-800'>Export</p>
      <div onChange={handleExportOptionChange} value={exportOption} className='mt-2'>
        <Radio value='option1'>Current page</Radio><br/>
        <Radio value='option2'>All orders</Radio><br/>
        <Radio value="C" disabled>Selected: 0 products</Radio><br/>
        <Radio value="D" disabled>50+ orders matching your search</Radio><br/>
        <Radio value='option3'>Orders by date</Radio>
      </div>
    </div>
    <div className='mt-4'>
      <p className='font-medium text-slate-800'>Export as</p>
      <div onChange={handleExportOptionChange} value={exportOption} className='mt-2'>
        <Radio value='option1'>CSV for excel, Numbers, or other spreadsheet programs</Radio><br/>
        <Radio value='option2'>Plain CSV file</Radio>
      </div>
    </div>
  </div>
</Modal>
<Modal
          // title="Title"
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
            <Form layout="vertical"
            className='p-4'>
          <Form.Item label="Order Id">
                <Input
                  value={editedData.
                    id
                    }
                  onChange={(e) =>
                    setEditedData({ ...editedData, id: e.target.value })
                  }
                />
              </Form.Item>
              <Form.Item label="Date">
                <Input
                  value={editedData.createdAt}
                  onChange={(e) =>
                    setEditedData({ ...editedData, createdAt: e.target.value })
                  }
                />
              </Form.Item>  <Form.Item label="Customer Name">
                <Input
                  value={editedData.name}
                  onChange={(e) =>
                    setEditedData({ ...editedData, name: e.target.value })
                  }
                />
              </Form.Item>  <Form.Item label="Total Price">
                <Input
                  value={editedData.totalPrice}
                  onChange={(e) =>
                    setEditedData({ ...editedData, totalPrice: e.target.value })
                  }
                />
              </Form.Item>  <Form.Item label="Payment Method">
                <Input
                  value={editedData.paymentMethod}
                  onChange={(e) =>
                    setEditedData({ ...editedData, paymentMethod: e.target.value })
                  }
                />
              </Form.Item>  <Form.Item label="Payment Status">
                <Input
                  value={editedData.status}
                  onChange={(e) =>
                    setEditedData({ ...editedData, status: e.target.value })
                  }
                />
              </Form.Item>  <Form.Item label="No of Items	">
                <Input
                  value={editedData.items
                  }
                  onChange={(e) =>
                    setEditedData({ ...editedData, items: e.target.value })
                  }
                />
              </Form.Item>  <Form.Item label="Last changed at">
                <Input
                  value={editedData._lastChangedAt}
                  onChange={(e) =>
                    setEditedData({ ...editedData, _lastChangedAt: e.target.value })
                  }
                />
              </Form.Item>
</Form>
        </Modal>

    </>
          </div>
        </div>

        <div className='bg-white rounded-xl h-16 border border-gray-200 flex items-center mb-4 mt-4 mr-1'>
          <div className=' border-r w-32 justify-center flex'>
            <button className='rounded-lg w-28 hover:bg-gray-100 h-12  font-semibold flex justify-center items-center'>
              <div><InboxOutlined /> </div>Today
            </button>
          </div>
          <div className=' border-r w-48 justify-center text-center'>
            <button className='rounded-lg w-44 hover:bg-gray-100 h-12  font-semibold'>Total orders</button>
          </div>
          <div className=' border-r w-48 justify-center text-center'>
            <button className='rounded-lg w-44 hover:bg-gray-100 h-12  font-semibold'>Ordered items over time</button>
          </div>
          <div className=' border-r w-48 justify-center text-center'>
            <button className='rounded-lg w-44 hover:bg-gray-100 h-12  font-semibold'>Return</button>
          </div>
          <div className=' border-r w-48 justify-center text-center'>
            <button className='rounded-lg w-44 hover:bg-gray-100 h-12  font-semibold'>Fulfilled orders over time</button>
          </div>
          <div className='w-48 justify-center text-center'>
            <button className='rounded-lg hover:bg-gray-100 h-12 w-44  font-semibold'>Delivered orders over time</button>
          </div>
        </div>
      </div>

<div className='bg-white p-4 rounded-lg mr-3'>
      <div className='gap-2 h-8'>
      <button className={`rounded-lg w-10 text-xs font-semibold hover:bg-gray-100 ${filterOption === 'all' ? 'bg-gray-100' : ''}`} onClick={() => handleFilterOptionChange('all')}>
              All
            </button>
            <button className={`rounded-lg w-20 text-xs font-semibold hover:bg-gray-100 ${filterOption === 'pending' ? 'bg-gray-100' : ''}`} onClick={() => handleFilterOptionChange('pending')}>
              Pending
            </button>
            <button className={`rounded-lg  w-14 text-xs font-semibold hover:bg-gray-100 ${filterOption === 'upi' ? 'bg-gray-100' : ''}`} onClick={() => handleFilterOptionChange('upi')}>
              UPI
            </button>
        {/* <button className="rounded-lg  w-12 text-xs font-semibold hover:bg-gray-100">Open</button>
        <button className="rounded-lg w-14 text-xs font-semibold hover:bg-gray-100">Closed</button>
        <button className="rounded-lg w-24 text-xs font-semibold hover:bg-gray-100">Local Delivery</button>
        <button className="rounded-lg w-6 text-xs font-semibold hover:bg-gray-100">+</button> */}
      </div>
        <Table
          columns={columns}
          dataSource={filteredOrders}
          pagination={false}
          // pagination={{
          //   position: ['bottomCenter'], 
          //   prevIcon: <Button type='link' className='custom-pagination-btn'>{`<`}</Button>,
          //   nextIcon: <Button type='link' className='custom-pagination-btn'>{`>`}</Button>,
          // }}
        />
      </div>
        </>
    );
};
export default Orders;