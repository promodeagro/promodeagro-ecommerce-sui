// CustomerDetails.js
'use client'
import { useEffect, useState } from 'react';
import axios from "@/Api/axios";
import { useSearchParams } from 'next/navigation'
import { List } from 'antd';

const CustomerDetails = () => {
  const searchParams = useSearchParams();
  const data = searchParams.get('data'); // Accessing the id parameter from the router's query object

  const [customer, setCustomer] = useState(null); // State to store customer details

  useEffect(() => {
    const fetchCustomerDetails = async (customerId) => {
      try {
        // Make an API call to fetch customer details based on the id parameter
        const response = await axios.get(`/getCustomerById/${customerId}`);
        setCustomer(response.data); 
        // Update the state with fetched customer details
      } catch (error) {
        console.error('Error fetching customer details:', error);
      }
    };

    if (data) {
      fetchCustomerDetails(data); // Fetch customer details when the id parameter is available
    }
  }, [data]); // Trigger the effect when the id parameter changes

  return (
    <div className="bg-white p-6 rounded-lg m-5">
      <h1 className="text-2xl font-bold mb-4">Customer Details</h1>
      {customer ? (
        <List
        className="border rounded-lg p-4 mb-4"
          itemLayout="vertical"
          dataSource={[customer]} // Wrap the customer object in an array
          renderItem={(item) => (
            <List.Item >
              <List.Item.Meta
                title="ID"
                description={item.id}
              />
              <List.Item.Meta
                title="Name"
                description={item.name}
              />
               <List.Item.Meta
                title="phone"
                description={item.phone}
              />
              <List.Item.Meta
                title="Customer Created At"
                description={item.createdAt}
              />
              <List.Item.Meta
                title="Customer Details Updated At"
                description={item.updatedAt}
              />
             
            </List.Item>
          )}
        />
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default CustomerDetails;
