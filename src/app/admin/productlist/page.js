 'use client'
// import ProductList from '@/components/admin/print/print'
// import React from 'react'

// const Page = () => {
//   return (
//     <div>
//         <ProductList/>
//     </div>
//   )
// }

// export default Page
import React from 'react';
import dynamic from 'next/dynamic';

const ProductList = dynamic(
  () => import('@/components/admin/print/print'),
  { ssr: false }
);

const Page = () => {
  return (
    <div>
      <ProductList />
    </div>
  );
};

export default Page;