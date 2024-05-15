'use client'
import { Inter } from "next/font/google";
import Timeline from "@/components/buyer/Checkout/timeline";
import Footer from "@/components/buyer/home/Footer";
import Header from "@/components/buyer/home/Header";
import { usePathname } from "next/navigation";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children, includeHeader = false }) {
  const pathname = usePathname();
  const exclude = [
    "/buyer/Checkout/DeliveryAddress",
    "/buyer/Checkout/DeliveryOption",
    "/buyer/Checkout/PaymentOption",
    "/buyer/myAccount",
    "/buyer/myAccount/myOrders",
    "/buyer/login",
    "/buyer/register",
    "/buyer/login/account",

  ];

  // Function to check if the current pathname requires the timeline header
  const shouldIncludeTimeline = (path) => {
    return (
      path === "/buyer/Checkout/DeliveryOption" ||
      path === "/buyer/Checkout/DeliveryAddress" ||
      path === "/buyer/Checkout/PaymentOption"
    );
  };

  // Function to determine whether to render the footer
  const shouldRenderFooter = () => !exclude. includes(pathname);

  return (
    <div className="container-fluid flex flex-col justify-center items-center w-[100%] min-h-[100vh]">
      {exclude.includes(pathname) ? null : <Header />}
      {shouldIncludeTimeline(pathname) && <Timeline />}
      {children}
      {/* {includeHeader && <Header />} */}
      {shouldRenderFooter() && <Footer />}
    </div>
  );
}