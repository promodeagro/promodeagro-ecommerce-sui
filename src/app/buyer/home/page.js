import Footer from '@/components/buyer/home/Footer';
import Header from '@/components/buyer/home/Header';
import MyBasket from '@/components/buyer/home/MyBasket';
import React from 'react';
import RootLayout from '../layout';

const Page = () => {
  return (
    <RootLayout includeHeader={false}>
      <Header /> 
      <MyBasket />
      <Footer /> 
    </RootLayout>
  );
};

export default Page;
