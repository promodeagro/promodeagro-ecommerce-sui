import React from 'react'
import { Card, Button, Modal, Radio, Steps, Popconfirm , Alert, Space} from 'antd';


const OrderSummary = () => {
  return (
    <div>
    <Card
    title="Order Summary"
    bordered={false}
    style={{
      width: 300,
    }}
  >
     <Space direction="vertical" style={{ width: '100%' }}>
    <p>Total Amount Payable 345</p>
    <Alert
     message="Success Text"
     description="Success Description "
     type="success"
   />
    <Alert
     
     description="Select your address and delivery slot to know accurate delivery charges. You can save more by applying a voucher!"
     type="warning"
     showIcon
   
   />
   
    </Space>
  </Card>
  
  </div>
  )
}

export default OrderSummary