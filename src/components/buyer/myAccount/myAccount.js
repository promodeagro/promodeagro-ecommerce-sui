import React from "react";
import Link from "next/link";
import { EditOutlined, MailOutlined, PhoneOutlined } from "@ant-design/icons";

const MyAccountPage = () => {
  return (
    <main>
      <div>
        <div className="bg-white p-4">
          <div className="flex gap-4 mb-2">
            <h1 className="font-semibold text-xl">Profile Details</h1>
            <EditOutlined />
          </div>
          <div className="text-base">
            <h1>Maimuna Gulafshan</h1>
            <h1>
              <MailOutlined /> maimunagulafshan1@gmail.com
            </h1>
            <h1>
              <PhoneOutlined /> +91 9876509855
            </h1>
          </div>
        </div>

        <div className="border border-gray-200 p-4 mt-6">
          <div className="flex gap-4 mb-2">
            <h1 className="font-semibold text-xl">My Orders</h1>
          </div>
          <div className="">
            <p className="font-semibold">
<<<<<<< HEAD:src/components/buyer/myAccount/myAccount.js
              You &lsquo; placed any order yet{" "}
=======
              You haven&apos;t placed any order yet{" "}
>>>>>>> b604c197c7fafda211a27d26509eab2d5fdd947d:src/components/buyer/myAccont/myAccount.js
              <Link href="/" passHref>
                <a className="text-blue-500 hover:underline ml-1">
                  Start Shopping!
                </a>
              </Link>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
};

export default MyAccountPage;
