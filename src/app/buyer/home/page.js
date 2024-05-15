import Footer from '@/components/buyer/home/Footer';
import Header from '@/components/buyer/home/Header';
import MyBasket from '@/components/buyer/home/MyBasket';
import React from 'react';
import RootLayout from '../layout';

const Page = () => {
  return (
    <RootLayout includeHeader={false}>
      <Header /> {/* Include the Header component if needed */}
      <MyBasket />
      <Footer /> {/* Include the Footer component if needed */}
    </RootLayout>
  );
};

export default Page;
