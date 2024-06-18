import Link from "next/link";
import React from "react";
import Image from "next/image"; 

const page = () => {
  return (
    <main className="flex justify-center items-center md:h-[90vh] md:mt-4 md:mb-2 min-h-[98vh] bg-white sm:bg-gradient-to-r sm:from-indigo-900 sm:via-indigo-700 sm:to-cyan-400">
      <div className="xs:mt-0 sm:border sm:border-solid sm:border-gray-500 sm:mt-0 sm:rounded-none xs:w-[100%] xs:h-[100%] md:w-[450px] md:h-[103%] md:mt-7 rounded-lg p-[20px]  bg-white  mb-4">

        <div>
          <h1 className=" xs:text-base text-xl font-bold mt-[1rem]  sm:text-bold xs:text-bold">
            Create a shopify Account
          </h1>
          <h3 className="xs:text-sm text-[#616161] mb-2 sm:text-sm ">
            one Last step before starting your free trial.
          </h3>
        </div>
        <div>
          {/* <h1>Email</h1> */}
          <label htmlFor="userMail">Email</label>
          <input
            type="text"
            id="userMail"
            className="xs:p-1  border border-solid  border-black w-[100%] rounded p-2 font-semibold"
          />
          <div className="sm:flex justify-between mt-2">
            <div>
              {/* <p>First Name</p> */}
              <label htmlFor="firstName">First Name</label>
              <input
                type="text"
                id="firstName"
                className="   xs:p-1 sm:p-1 border border-solid  border-black w-[100%] rounded p-2 font-semibold "
              />
            </div>
            <div className="sm:ml-4 sm:mt-0 mt-2">
              {/* <p>last Name</p> */}
              <label htmlFor="lastName" className="sm:ml-0 pt-3">
                Last Name
                <input
                  type="text"
                  id="lastName"
                  className=" xs:p-1 sm:p-1 border border-solid  border-black w-[100%] rounded p-2 font-semibold "
                />
              </label>
            </div>
          </div>
          <p className=" sm:text-sm text-sm mt-1">
            Enter your first and last name as they appear on your
            government-issued ID.
          </p>
          <div className="mt-3">
            {/* <p className='mt-3'>Password</p> */}
            <label htmlFor="password">Password</label>
            <input
              type="text"
              id="password"
              className="xs:p-1 sm:p-1 border border-solid  border-black w-[100%] rounded p-2 font-semibold"
            />
          </div>
          <div className="mt-2">
            {/* <p className='mt-3'>Confirm new Password</p> */}
            <label htmlFor="confirm">Confirm new Password</label>
            <input
              type="text"
              id="confirm"
              className=" xs:p-1 sm:p-1 border border-solid  border-black w-[100%] rounded p-2 font-semibold"
            />
          </div>
          <div className="mt-5">
          <Link href="/">
            <button className="xs:p-1 sm:p-1  border border-solid bg-[#303030] border-gray-500 w-[100%] rounded p-2 text-white font-semibold">
              Create shopify account
            </button>
            </Link>
          </div>
          <p className=" xs:text-sm sm:text-sm mt-4 text-center">
            Already have a Shopify account?
            <Link href="/buyer/login">
              <span className="text-[#005bd3] hover:font-bold">Log in</span>
            </Link>
          </p>
          <div>
            <h1 className=" xs:text-sm sm:text-sm mt-2 text-sm ">
              By proceeding, you agree to the
              <span className="text-[#005db3] font-semibold cursor-pointer">
                {" "}
                Terms and Conditions{" "}
                <span className="text-black text-sm cursor-default">
                  and
                </span>{" "}
                Privacy Policy
              </span>
            </h1>
            <div className="mt-2">
              <span className=" text-[#616161] text-sm cursor-pointer border-b-2 border-transparent hover:border-gray-400">
                Help{" "}
              </span>
              <span className="ml-2 text-[#616161] text-sm cursor-pointer border-b-2 border-transparent hover:border-gray-400">
                Privacy
              </span>
              <span className="ml-2 text-[#616161] text-sm cursor-pointer border-b-2 border-transparent hover:border-gray-400">
                Terms
              </span>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default page;
