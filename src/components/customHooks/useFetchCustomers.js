import { useState, useEffect } from 'react';

const useFetchCustomers = () => {
  const [customers, setcustomer] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await fetchcustomer(); // Assuming fetchProducts is your API call function
        setcustomer(result.data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchData();

  }, []);
  
  return { customers, loading, error };
};

export default useFetchCustomers;
