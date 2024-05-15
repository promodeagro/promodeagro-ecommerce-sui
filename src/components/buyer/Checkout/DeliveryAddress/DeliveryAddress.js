import Link from 'next/link';
import { CheckOutlined, EnvironmentOutlined } from '@ant-design/icons';

const DeliveryAddress = () => {
    return (
        <div className='h-screen bg-slate-50 w-screen'>
            <div className=' w-6/12 h-80 ml-56 p-4'>
                <h1 className="text-2xl p-2"><b>Select your address</b></h1>
                <div className='bg-white shadow-lg flex rounded-lg h-60 w-11/12 p-4 mt-[1%]'>
                    {/* Container to hold both links */}
                    <div className='flex w-full gap-6'>
                        {/* Add New Address link */}
                        <Link href="/" className='flex-1 border-dashed border-2 border-red-500 rounded-md text-center'>
                            <EnvironmentOutlined style={{ fontSize: '20px', color: 'red', marginRight: '4px' , marginTop: '40px'}} />
                            <div className='text-red-600 text-sm'><b>+ Add New Address</b></div>
                        </Link>
                        {/* Home link */}
                        <Link href='/' className='flex-1 bg-neutral-900 rounded-md text-white'>
                            <div className='flex'>
                                <div className='text-left px-3 py-1 h-[30%]'>Home</div>
                                <div className='h-[100%] w-[20%] ml-[60%]'></div>
                                <CheckOutlined style={{ fontSize: '20px', height: '20px', width: '14px', marginRight: '8px' , marginTop: "6px" }} />
                            </div>
                            
                            <div className='h-[1.5%] w-[15%] bg-yellow-600 rounded-md ml-[6%]'></div>
                            <div className='text-left p-3  h-[60%] w-[50%] text-xs'>
                                <p className='text-left'>
                                    Shaistha Samreen 54652 1255 Siddiq Nagar, HITEC City Hyderabad, 500081 Ph: 8639453160
                                </p>
                                <button className='mt-4 h-[25%] w-[70%] bg-neutral-600 rounded-full'>DEFAULT</button>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DeliveryAddress;
