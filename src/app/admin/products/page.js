'use client'
// import React from 'react'
// import Products from '@/components/admin/products/products'
// const App = () => {
//   return (
//     <div><Products /></div>
//   )
// }

// export default App
import React from 'react';
import dynamic from 'next/dynamic';

const Products = dynamic(
  () => import('@/components/admin/products/products'),
  { ssr: false }
);

const App = () => {
  return (
    <div>
      <Products />
    </div>
  );
};

export default App;
