// "use client";
// import "../globals.css";
// import {
//     HomeFilled,
//     ShoppingCartOutlined,
//   TagFilled,
//   UserOutlined,
//   BellOutlined,
//   BarChartOutlined ,
// } from "@ant-design/icons";
// import { Layout, Menu ,Button} from "antd";
// import React, { useState } from "react";
// import Link from "next/link";
// // import { Provider } from "react-redux";
// // import { store } from "@/redux/store/store";


// import { Input, Space } from "antd";
// const { Search } = Input;

// // import Image from "next/image";
// // import Account from "../../../public/assets/homeicons/Setting.svg";
// // import Vector2 from "../../../public/assets/homeicons/Vector2.svg";
// // import Bell from "../../../public/assets/homeicons/Bell.svg";

// // import Onboardemp from "@/components/employees/addemp/onboardemp/page";

// const { Header, Content, Footer, Sider } = Layout;
// function getItem(label, key, icon, children) {
//   return {
//     key,
//     icon,
//     children,
//     label,
//   };
// }


// export default function RootLayout({ children }) {
//   const [collapsed, setCollapsed] = useState(false);
//   const onSearch = (value) => console.log(value);

//   function getItem(label, key, icon, children) {
//     return {
//       key,
//       icon,
//       children,
//       label,
//     };
//   }

//   const items = [
//     getItem( <Link href={"/admin/home"}>home</Link>, "1", <HomeFilled/>),
//     getItem(<Link href={"/admin/orders"}>Orders</Link>, "2", <ShoppingCartOutlined />),
//     getItem(
//       <Link href={"/admin/products"}>products</Link>,
//       "3",
//       <TagFilled />
//       ),
//       getItem(
//       <Link href={"/admin/customers"}>customers</Link>,
//       "4",
//       <UserOutlined />
//     ),
//     getItem(
//         <Link href={"/admin/analytics"}>analytics</Link>,
//       "5",
//       <BarChartOutlined />
//     ),
//   ];

//   const siderStyle = {
//     textAlign: "left",
//     color: "#fff",
//     backgroundColor: "#fff",
//   };

//   return (
//     <html lang="en">
//       <body>
//         {/* <Provider store={store}> */}
//           <Header
//             style={{
//               position: "sticky",
//               top: 0,
//               zIndex: 1,
//               width: "100%",
//               display: "flex",
//               justifyContent: "space-between",
//               alignItems: "center",
//               alignContent: "center",
//               backgroundColor:"#1a1a1a",
//             }}
//           >
//             <div>
//               <h2 className="text-white uppercase">Synectiks</h2>
//             </div>

//             <div className="flex ">
//               <div className="flex bg-white border rounded-md">
//                 <Search
//                   placeholder="input search text"
//                   onSearch={onSearch}
//                   style={{
//                     width: 600,
//                     borderRadius: 9,
//                   }}
//                 />
//               </div>
//               {/* <div className="flex flex-row w-full gap-4 justify-evenly px-4"> */}
//                 {/* <Image src={Vector2} /> */}
//                 {/* <Image className="text-white" src={Bell} /> */}
//                 {/* <Image src={Account} /> */}
//               </div>
          
//             <div><BellOutlined className="text-white text-lg"/>
//             <button className="text-black">My Store</button>
//             </div>
//             {/* <div></div> */}
//           </Header>

//           <Layout style={{ minHeight: "100vh" }}>
//             <Sider
//               collapsible
//               collapsed={collapsed}
//               onCollapse={(value) => setCollapsed(value)}
//               style={{
//                 overflow: "auto",
//                 height: "100vh",
//                 position: "fixed",
//                 marginTop: "10vh",
//                 left: 0,
//                 top: 0,
//                 bottom: 0,
                
//               }}
//             >
//               <div />
//               <Menu
//                 theme="light"
//                 defaultSelectedKeys={["1"]}
//                 mode="inline"
//                 style={{ height: "100%" }}
//                 items={items}
//               >
//               </Menu>
//             </Sider>
//             <Layout className="site-layout flex flex-col">
//               <Content
//                 style={{
//                   paddingLeft: 10,
//                 }}
//               >
//                 <div
//                   className={`${collapsed ? "ml-[80px]" : "ml-[200px]"}`}

//                 >
//                   {children}

//                   <Footer
//                     style={{
//                       // textAlign: 'center',
//                       marginLeft: 200,
//                     }}
//                   ></Footer>
//                 </div>
//               </Content>
//             </Layout>
//           </Layout>
//         {/* </Provider> */}
//       </body>
//     </html>
//   );
// }
