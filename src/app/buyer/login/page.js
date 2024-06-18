'use client'
import Link from 'next/link';
import Image from 'next/image'; // Import Image component from Next.js
import { FcGoogle } from 'react-icons/fc';
import { FaApple } from 'react-icons/fa6';
import { FaFacebookF } from 'react-icons/fa';
import { useState } from 'react';
import { useRouter } from 'next/navigation'; // Fix import statement

const Page = () => {
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const router = useRouter();

  const handleLogin = () => {
    if (password === '1234' && email === 'fatima@gmail.com') {
      router.push('../../admin');
      alert('Login successful!');
    } else {
      alert('Wrong password or username');
    }
  };

  return (
    <main className="h-full flex justify-center items-center bg-gradient-to-r from-indigo-600 via-indigo-400 to-cyan-400 md:w-[100vw] md:h-screen md:-mb-10">
      <div className="sm:p-5 xs:w-[100vw] md:h-[70vh] md:w-[414px] xs:h-[100%] sm:w-[100vw] rounded-lg p-[30px] sm:shadow-lg bg-white md:mt-6 sm:h-[90%] xs:rounded-none md:m-5 md:border-none md:rounded-xl">
        <div>
          <Link href="/buyer/home">
            {/* Provide width and height for the Image component */}
            {/* <Image
                src="https://logos-world.net/wp-content/uploads/2020/11/Shopify-Logo.png"
                alt="Shopify Logo"
                width={100}
                height={50}
                className="cursor-pointer"
              /> */}
          </Link>
        </div>
        <div>
          <h1 className="text-xl font-bold mt-[0.5rem] xs:text-base sm:text-[1rem]">
            Log in
          </h1>
          <h3 className="text-[#616161] mb-2 xs:text-sm sm:text-sm">
            Continue to Shopify
          </h3>
        </div>
        <div className="flex flex-col">
  <label htmlFor="email" className="text-[14px] xs:text-xs">
    Email
  </label>
  <input
    value={email}
    onChange={(e) => setEmail(e.target.value)}
    type="email"
    id="email" 
    placeholder="user email"
    className="border border-solid border-gray-500 rounded p-2 mb-3 xs:p-1"
  />
</div>
<div className="flex flex-col">
  <label htmlFor="password" className="text-[14px] xs:text-xs">
    Password
  </label>
  <input
    type="password"
    value={password}
    onChange={(e) => setPassword(e.target.value)}
    id="password" 
    placeholder="user password"
    className="border border-solid border-gray-500 rounded p-2 mb-2 xs:p-1"
  />
</div>


        <button onClick={handleLogin} className="border border-solid bg-[#303030] border-gray-500 w-[100%] rounded p-2 text-white font-semibold xs:p-1">
          Log in
        </button>

        <div>
          <h1 className="text-center mt-2">or</h1>
        </div>
        <div>
          <div className="flex justify-around mt-2 gap-2">
            <p className="border border-solid w-[80px] rounded-lg bg-[#f1f1f1]">
              <FaFacebookF color="blue" className="w-[25px] h-[25px] mx-auto my-1" />
            </p>
            <p className="border border-solid w-[80px] rounded-lg bg-[#f1f1f1]">
              <FcGoogle className="text-[28px] mx-auto my-1" />
            </p>
            <p className="border border-solid w-[80px] rounded-lg bg-[#f1f1f1]">
              <FaApple className="text-[28px] mx-auto my-1" />
            </p>
          </div>
          <h1 className="mt-2 text-semibold xs:text-xs sm:text-sm">
            New to Shopify?
            <Link href="/buyer/register">
              <span className="text-[#005db3] font-semibold cursor-pointer hover:font-semibold sm:text-sm">
                &nbsp; Get started --
              </span>
            </Link>
          </h1>
          <div>
            <span className="text-[#616161] text-sm border-b-2 border-transparent hover:border-gray-400 cursor-pointer">
              Help
            </span>
            <span className="ml-2 text-[#616161] text-sm border-b-2 border-transparent hover:border-gray-400 cursor-pointer">
              Privacy
            </span>
            <span className="ml-2 text-[#616161] text-sm border-b-2 border-transparent hover:border-gray-400 cursor-pointer">
              Terms
            </span>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Page;
