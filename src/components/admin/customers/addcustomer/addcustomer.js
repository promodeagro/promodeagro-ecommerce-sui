"use client";
import React, { useState } from "react";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { useRouter } from "next/navigation";
import { Form, Input,Button} from "antd";
import { useDispatch, useSelector } from 'react-redux';
import { addCustomer,createCustomer } from "../../../../redux/slices/addCustomerSlice";
import { notification } from 'antd';
import { usePathname } from "next/navigation";
import axios from "@/Api/axios";

// const { Option } = Select;

const AddCustomer = () => {
  const [form] = Form.useForm();

  // const customers = useSelector((state)=> state.customerSlice.customers)
  // console.log(customers);
  //  console.log(customers);
  const dispatch = useDispatch();
  

  const [loading, setLoading] = useState(false);
  
  // const router = useRouter();
  const pathname = usePathname();
  const backToCustomers = () => {
    if(pathname==="/admin/customers/addcustomer"){
    router.push("/admin/customers");
    } else if (pathname==="/admin/Share/addcustomer"){
      router.push("/admin/Share");
    }
  };
  const router = useRouter();
  const onFinish = async (values) => {
    setLoading(true);
    try {
      // console.log("data", data);
      const response = await axios.post("/customerinsert", values);
      console.log("response", response);
      // if (response.status == 200) {
      //   dispatch(setCreateProduct(data));
      // }
      notification.success({
        message: 'Customer created successfully!',
      });
    } catch (error) {
      console.log("error", error);
    }
finally {
      setLoading(false);
    }
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
}
  return( 
  <div>
    <header className="p-8 flex gap-3">
    <ArrowLeftOutlined
          className="text-lg font-semibold"
          onClick={backToCustomers}
       />
      <h1 className="font-bold text-xl">New Customer</h1>
    </header>
    <hr />
    <div className="p-16 md:flex ">
    <Form 
     form={form}
    onFinish={onFinish}
    requiredMark={false}
    labelAlign="left"
    labelCol={{
      span: 5,
    }}
    className="w-[70%] m-auto justify-center">
      <Form.Item 
        label="Name"
        name="name"
        rules={[{ required: true, message: 'Please input customer name!' }]}
       
         >
      
        <Input/>
      </Form.Item>

      <Form.Item
        label="WhatsApp No"
        name="phone"
        rules={[{ required: true, message: 'Please input customer phone number!' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item className=" text-center">
        
        <button type="primary" htmlType="submit" loading={loading} className="bg-black text-white w-36 h-8 rounded-lg">
          Create Customer
        </button>
      </Form.Item>
    </Form>

     {/* <div>  */}
      {/* <Col span={8}>
        <h3 className="font-semibold">Customer Overview</h3>
      </Col>
      <Col span={16}>
        <div className="bg-white rounded-xl p-8 shadow-lg">
          <Form
            layout="vertical"
            requiredMark={false}
            wrapperCol={{ span: 24 }}
          >
            <Row gutter={12}>
              <Col md={{ span: 12 }}>
                <Form.Item
                  label="First Name"
                  name="first-name"
                  rules={[{ required: true, message: "Enter Your First Name" }]}
                >
                  <Input type="text" />
                </Form.Item>
              </Col>
              <Col md={{ span: 12 }}>
                <Form.Item
                  label="Last Name"
                  name="last-name"
                  rules={[
                    { required: true, message: "Enter Your Last Number" },
                  ]}
                >
                  <Input type="text" />
                </Form.Item>
              </Col>
            </Row>

            <Form.Item
              label="Select language"
              name="Select"
              rules={[{ required: true, message: "Please select a language!" }]}
            >
              <Select defaultValue="english">
                <Option value="english">English(default)</Option>
              </Select>
              <p>This customer will receive notifications in this language.</p>
            </Form.Item>

            <Form.Item
              label="Email"
              name="email"
              rules={[
                { required: true, message: "Please input your email!" },
                {
                  type: "email",
                  message: "Please enter a valid email address",
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="InputNumber"
              name="InputNumber"
              rules={[{ required: true, message: "Please input a number!" }]}
            >
              <InputNumber style={{ width: "100%" }} />
            </Form.Item>

            <Form.Item>
              <Checkbox>Customer agreed to receive marketing emails.</Checkbox>
              <br />
              <Checkbox>
                Customer agreed to receive SMS marketing text messages.
              </Checkbox>
            </Form.Item>
            <p>
              You should ask your customers for permission before you subscribe
              them to your marketing emails or SMS.
            </p>
          </Form>
        </div>
      </Col>
    </div>
    <hr />
    <div className="p-16 md:flex">
      <Col span={8}>
        <h3 className="font-semibold">Address</h3>
        <p>The primary address of this customer</p>
      </Col>
      <Col span={16}>
        <div className="bg-white rounded-xl p-8 shadow-lg">
          <Form
            layout="vertical"
            requiredMark={false}
            wrapperCol={{ span: 24 }}
          >
            <Form.Item
              label="Select language"
              name="Select"
              rules={[{ required: true, message: "Please select a language!" }]}
            >
              <Select defaultValue="India">
                <Option value="India">Country/region</Option>
              </Select>
            </Form.Item>
            <Row gutter={12}>
              <Col md={{ span: 12 }}>
                <Form.Item
                  label="First Name"
                  name="first-name"
                  rules={[{ required: true, message: "Enter Your First Name" }]}
                >
                  <Input name="pfNumber" type="text" />
                </Form.Item>
              </Col>
              <Col md={{ span: 12 }}>
                <Form.Item
                  label="Last Name"
                  name="last-name"
                  rules={[{ required: true, message: "Enter your last name" }]}
                >
                  <Input type="text" />
                </Form.Item>
              </Col>
            </Row>

            <Form.Item
              label="Company"
              name="company"
              rules={[{ required: true, message: "Please select a language!" }]}
            >
              <Input type="text" />
            </Form.Item>

            <Form.Item
              label="Address"
              name="address"
              rules={[{ required: true, message: "Please input your Address" }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Apartment,suite,etc."
              name="apartment"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
            <Row gutter={12}>
              <Col md={{ span: 12 }}>
                <Form.Item
                  label="City"
                  name="city"
                  rules={[{ required: true, message: "Enter Your City" }]}
                >
                  <Input type="text" />
                </Form.Item>
              </Col>
              <Col md={{ span: 12 }}>
                <Form.Item
                  label="State"
                  name="state"
                  rules={[{ required: true, message: "Enter your State" }]}
                >
                  {" "}
                  <Select>
                    <Option value="telangana">Telangana</Option>
                  </Select>
                </Form.Item>
              </Col>
            </Row>
            <Form.Item
              label="PIN code"
              name="pin-code"
              rules={[
                { required: true, message: "Please input your PIN code!" },
              ]}
            >
              <InputNumber style={{ width: "100%" }} />
            </Form.Item>
            <Form.Item
              label="Phone"
              name="phone"
              rules={[
                {
                  required: true,
                  pattern: "",
                  message: "Please input your phone number!",
                },
              ]}
            >
              <InputNumber style={{ width: "100%" }} />
            </Form.Item>
          </Form>
        </div>
      </Col>
    </div>
    <hr />
    <div className="p-16 md:flex">
      <Col span={8}>
        <h3 className="font-semibold">Tax exemptions</h3>
      </Col>
      <Col span={16}>
        <div className="bg-white rounded-xl pb-1 px-2 shadow-lg">
          <Form
            layout="vertical"
            requiredMark={false}
            wrapperCol={{ span: 24 }}
          >
            <br />
            <Form.Item>
              <Checkbox>Collect tax</Checkbox>
            </Form.Item>
          </Form>
        </div>
      </Col>
    </div>
    <hr />
    <div className="p-16 md:flex">
      <Col span={8}>
        <h3 className="font-semibold">Notes</h3>
        <p>Notes are private and won't be shared with the customer.</p>
      </Col>
      <Col span={16}>
        <div className="bg-white rounded-xl px-4 py-2 shadow-lg">
          <Form
            layout="vertical"
            requiredMark={false}
            wrapperCol={{ span: 24 }}
          >
            <Form.Item label="Note" name="note">
              <Input />
            </Form.Item>
          </Form>
        </div>
      </Col>
    </div>
    <hr />
    <div className="p-16 md:flex">
      <Col span={8}>
        <h3 className="font-semibold">Tags</h3>
        <p>Tags can be used to categorize customers into groups.</p>
      </Col>
      <Col span={16}>
        <div className="bg-white rounded-xl px-4 py-2 shadow-lg">
          <Form
            layout="vertical"
            requiredMark={false}
            wrapperCol={{ span: 24 }}
          >
            <Form.Item label="Tags" name="tags">
              <Input />
            </Form.Item>
          </Form>
        </div>
      </Col> */}
    {/* </div> */}
    </div>
    </div>
  )
  }
export default AddCustomer;
