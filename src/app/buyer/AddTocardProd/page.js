'use client';
import { useRouter } from 'next/navigation'; // Corrected import path
import Card from '@/components/buyer/AddTocartProd/card';
import { useSelector } from 'react-redux';

const Comp = () => {
  const router = useRouter();

  function gotodelivery() {
    router.push("/buyer/Checkout/DeliveryAddress");
  }
  const items = useSelector((state) => state.cartDetails.cart);
  const subtotal = items.reduce((total, item) => total + parseFloat(item.price), 0);

  return (

    <div className='flex flex-col gap-3 justify-center '>
      {items.length > 0 && (
        <section className='bg-black med:flex justify-between items-center p-[2%] rounded-md sticky top-20 z-10'>
          <right className='xsmall:text-xs small:text-sm med:text-md lgr:text-lg'>
            <h1 className="text-white">Subtotal ({items.length} item): ₹{subtotal.toFixed(2)}</h1>
            <h3 className="text-lime-500 font-bold bg-gradient-to-r from-gray-900 to-stone-600 rounded-md">Savings: ₹{subtotal/2}</h3>
          </right>
          <left>
            <button onClick={gotodelivery} className='bg-[rgba(204,0,0)] text-white lgr:h-9 lgr:w-40 lgr:text-md med:h-7 med:w-30 med:text-xsm med:p-2 small:text-xs xsmall:text-[8px] xsmall:p-1.5 rounded-md font-semibold'>
              Checkout
            </button>
          </left>
        </section>
      )}

      <section>
         <Card />
      </section>

    </div>
  );
};

export default Comp;
